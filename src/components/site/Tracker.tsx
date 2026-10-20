'use client'
// Visitor tracker, in the root layout once. Renders nothing. A complete no-op (no listeners, no requests) unless
// NEXT_PUBLIC_TRACKER_URL was set at build time, and always under GPC or DNT. Backend: ~/projects/portfolio-tracker.
// GPC/DNT is checked again before every event: once it is on, tracking stops (listeners, timers, observer removed).
// Each event is one POST {url}/e: fetch keepalive, JSON as text/plain (a simple request: no CORS preflight),
// credentials omitted (no cookie ever rides along) and no Referer.
//
//   view       on load and on every client-side route change; ref + utm on the session's first view only
//   section    home only: a main section[id] that is 50% visible (of itself, or of the viewport when it is taller),
//              once per session per id, one IntersectionObserver
//   click      resume | email-copy | mailto | linkedin | github | project:<name> | outbound:<host>
//   heartbeat  every 30 s while the page is visible and active, at most 20 per page
//   leave      pagehide, visibilitychange to hidden, or a client-side route change. Re-armed when the tab comes back
//              (or the page returns from bfcache): a later leave repeats this page's cumulative ms, and the backend
//              keeps the max ms per path, so a repeat never double counts.
//   ms = engaged time on this page (visible, with input in the last 30 s); depth = max scroll depth % on this page.
//
// No cookies. sessionStorage: trk-sid (16 random chars, one tab session), trk-r (the ?r= ref code), trk-sec (sections
// sent). localStorage: trk-me = owner mode (?me=1 sets it, ?me=0 clears it; events then carry owner: true).
// ?r= and ?me= are removed from the URL. Scroll position comes from the shared driver: no layout reads while scrolling.
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { remeasure, subscribe } from '@/components/motion/scroll'
import { resume } from '@/content/resume'

const BASE = process.env.NEXT_PUBLIC_TRACKER_URL
const EP = BASE ? BASE.replace(/\/+$/, '') + '/e' : ''
const IDLE = 30000

type Store = () => Storage
const S: Store = () => sessionStorage
const L: Store = () => localStorage
const get = (s: Store, k: string) => { try { return s().getItem(k) } catch { return null } }
const put = (s: Store, k: string, v: string | null) => {
  try { if (v === null) s().removeItem(k); else s().setItem(k, v) } catch {}
}

let off: (() => void) | undefined      // set while tracking runs: removes every listener start() added
let sid = '', code = '', owner = false, first = false
let utm = { source: '', medium: '', campaign: '' }
let page = '', title = '', left = false  // the current page's path and title, and whether its leave went out
let acc = 0, mark = 0, active = 0, vis = true, beats = 0, timer = 0
let H = 1, deep = 0                     // page height (cached by the scroll driver's measure), max (scrollY + vh) / H
const seen = new Set<string>()
let io: IntersectionObserver | undefined

const blocked = () => {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean }
  return n.globalPrivacyControl === true || n.doNotTrack === '1'
}

function stop() {
  off?.()
  off = undefined
  clearInterval(timer)
  io?.disconnect()
  page = ''                               // a later start() begins a fresh page, without a leave for this one
}

function send(t: string, x: Record<string, unknown> = {}) {
  if (!off) return
  if (blocked()) return stop()
  const e: Record<string, unknown> = {
    v: 1, t, sid, path: page, title, lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone, vw: innerWidth, vh: innerHeight, dpr: devicePixelRatio,
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light', ts: Date.now(), ...x,
  }
  if (code) e.r = code
  if (owner) e.owner = true
  fetch(EP, {
    method: 'POST', body: JSON.stringify(e), keepalive: true, credentials: 'omit', referrerPolicy: 'no-referrer', mode: 'cors',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
  }).catch(() => {})
}

// Engaged time: the part of [mark, now] that is visible and within IDLE of the last input.
function tick(now = performance.now()) {
  if (vis) acc += Math.max(0, Math.min(now, active + IDLE) - mark)
  mark = now
}
function act() {
  const n = performance.now()
  tick(n)
  active = n
}
const stats = () => { tick(); return { ms: Math.round(acc), depth: Math.min(100, Math.round(deep * 100)) } }

function leave() {
  if (left || !page) return
  left = true
  send('leave', stats())
}

function beat() {
  if (!vis || performance.now() - active > IDLE) return
  send('heartbeat', stats())
  if (++beats >= 20) clearInterval(timer)
}

function target(el: Element) {
  if (el.closest('button.copy')) return 'email-copy'
  const a = el.closest('a[href]') as HTMLAnchorElement | null
  if (!a) return ''
  const u = new URL(a.href)
  if (u.protocol === 'mailto:') return 'mailto'
  if (!u.protocol.startsWith('http')) return ''
  const own = u.host === location.host
  if (own && u.pathname.endsWith('.pdf')) return 'resume'
  const card = a.closest('.pc')?.querySelector('.pc-name')?.textContent?.trim()
  if (card) return 'project:' + card
  if (/(^|\.)linkedin\.com$/.test(u.hostname)) return 'linkedin'
  const gh = new URL(resume.github)
  if (u.host === gh.host && u.pathname.startsWith(gh.pathname)) {
    const repo = u.pathname.slice(gh.pathname.length).split('/')[1]
    return repo ? 'project:' + repo : 'github'
  }
  const slug = own && u.pathname.match(/^\/projects\/([^/]+)/)
  if (slug) return 'project:' + slug[1]
  return own ? '' : 'outbound:' + u.host
}

function click(e: MouseEvent) {
  if (e.type === 'auxclick' && e.button !== 1) return
  const t = e.target instanceof Element && target(e.target)
  if (t) send('click', { target: t })
}

function sections(home: boolean) {
  io?.disconnect()
  if (!home) return
  io ??= new IntersectionObserver(es => es.forEach(en => {
    const need = 0.5 * Math.min(en.boundingClientRect.height, en.rootBounds?.height ?? innerHeight)
    if (!en.isIntersecting || en.intersectionRect.height < need) return
    const id = en.target.id
    io!.unobserve(en.target)
    if (seen.has(id)) return
    seen.add(id)
    put(S, 'trk-sec', [...seen].join(','))
    send('section', { section: id })
  }), { threshold: Array.from({ length: 21 }, (_, i) => i / 20) })
  document.querySelectorAll('main section[id]').forEach(s => { if (!seen.has(s.id)) io!.observe(s) })
}

function visibility() {
  tick()
  vis = document.visibilityState === 'visible'
  if (!vis) return leave()
  active = performance.now()
  left = false
}
const restored = (e: PageTransitionEvent) => { if (e.persisted) visibility() }
const acts = ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart']

function start() {
  const q = new URLSearchParams(location.search)
  const me = q.get('me')
  if (me === '1') put(L, 'trk-me', '1')
  else if (me === '0') put(L, 'trk-me', null)
  owner = get(L, 'trk-me') === '1'
  const r = q.get('r')
  if (r && /^[\w.-]{1,64}$/.test(r)) { code = r; put(S, 'trk-r', r) }
  else code = get(S, 'trk-r') ?? ''
  sid = get(S, 'trk-sid') ?? ''
  if (!sid) {
    first = true
    sid = Array.from(crypto.getRandomValues(new Uint8Array(16)), b => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('')
    put(S, 'trk-sid', sid)
  }
  utm = { source: q.get('utm_source') ?? '', medium: q.get('utm_medium') ?? '', campaign: q.get('utm_campaign') ?? '' }
  ;(get(S, 'trk-sec') ?? '').split(',').filter(Boolean).forEach(id => seen.add(id))
  if (q.has('r') || q.has('me')) {
    q.delete('r')
    q.delete('me')
    const s = q.toString()
    // after this commit's effects, so Next's patched replaceState (installed in an app-router effect) picks it up
    setTimeout(() => history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + location.hash))
  }
  vis = document.visibilityState === 'visible'
  const o = { passive: true }, c = { capture: true, passive: true }
  acts.forEach(k => addEventListener(k, act, o))
  document.addEventListener('click', click, c)
  document.addEventListener('auxclick', click, c)
  document.addEventListener('visibilitychange', visibility)
  addEventListener('pagehide', leave)
  addEventListener('pageshow', restored)
  const unsub = subscribe((y, vh) => { deep = Math.max(deep, (y + vh) / H); act() }, () => { H = document.documentElement.scrollHeight })
  off = () => {
    acts.forEach(k => removeEventListener(k, act))
    document.removeEventListener('click', click, true)
    document.removeEventListener('auxclick', click, true)
    document.removeEventListener('visibilitychange', visibility)
    removeEventListener('pagehide', leave)
    removeEventListener('pageshow', restored)
    unsub()
  }
}

function view(path: string) {
  if (path === page) return
  leave()
  page = path
  title = document.title
  left = false
  acc = deep = beats = 0
  mark = active = performance.now()
  remeasure()                             // the new page's height, then one frame: its depth at rest
  clearInterval(timer)
  timer = window.setInterval(beat, 30000)
  send('view', first ? { ref: document.referrer, utm } : {})
  first = false
  sections(path === '/')
}

export default function Tracker() {
  const path = usePathname()
  useEffect(() => {
    if (!EP) return
    if (blocked()) return stop()
    if (!off) start()
    view(path)
  }, [path])
  return null
}
