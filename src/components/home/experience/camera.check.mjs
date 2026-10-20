// Self-check for camera.ts (no framework): node src/components/home/experience/camera.check.mjs
// Real row dates, made-up record geometry. Prints "camera ok" or throws.
import assert from 'node:assert/strict'
import { range, shot } from './camera.ts'

// DLAI, Blog2Podcast, Tassel, Bexorg, NASA, SJSU, Ascendion, LIBS, Accenture, Enthralltech
const S = [2025.667, 2026.167, 2025.417, 2024.333, 2023.917, 2023.5, 2021.917, 2021, 2018.75, 2018.333]
const E = [2026.8, 2026.8, 2025.75, 2025.417, 2024.25, 2024.167, 2023.667, 2021.917, 2021, 2018.833]
const now = 2026.8
const R = []
let y = 1000
for (let i = 0; i < S.length; i++) { const h = 400 + (i % 3) * 300; R.push([y, y + h]); y += h + 4 }
const n = R.length
for (const desk of [true, false]) {
const plan = { S, E, now, R, vh: 900, desk }

assert.equal(shot(0, plan).on, false)
let prev = null
for (let r = R[0][0] - 400; r < R[n - 1][1] + 400; r += 3) {
  const s = shot(r, plan)
  if (!s.on) continue
  assert.ok(s.view[0] >= 2018 - 1e-9 && s.view[1] <= now + 1e-9 && s.view[1] > s.view[0], `view in range at ${r}`)
  if (r < R[0][0] + 30) assert.ok(Math.abs(s.view[1] - now) < 1e-9, 'the zoom-in keeps today at the right edge')
  if (prev) s.f.forEach((f, i) => assert.ok(f >= prev.f[i] - 1e-12, `row ${i} is never unwritten going down`))
  if (s.cur >= 0) assert.ok(r >= R[s.cur][0] - 400 && r <= R[s.cur][1] + 400, `row ${s.cur} is filmed near its record at ${r}`)
  // the row indicator rides with the camera: never backwards going down, and the lit row is the filmed row
  if (prev) assert.ok(s.pos >= prev.pos - 1e-12, `the indicator never moves up going down (${r})`)
  if (s.cur >= 0) assert.equal(Math.round(s.pos), s.cur, `the indicator is on the filmed row at ${r}`)
  // smooth: 30px of scroll (a third of a wheel notch) moves the view by under 30% of its width between roles and
  // under 60% in the pull-back (2018 - now is about 10x the last role's view). The old 120px pans broke both.
  const z = shot(r + 30, plan), w = s.view[1] - s.view[0]
  const d = Math.max(Math.abs(z.view[0] - s.view[0]), Math.abs(z.view[1] - z.view[0] - w)) / w
  assert.ok(d < (s.vd > 0 || z.vd > 0 ? 0.6 : 0.3), `the view moves ${d.toFixed(2)} of its width in 30px at ${r}`)
  prev = s
}
// mid-record films its row and writes its bar (the last record: a third of the way in, the pull-back takes its end)
for (let i = 0; i < n; i++) {
  const mid = shot(R[i][0] + (R[i][1] - R[i][0]) * (i < n - 1 ? 0.5 : 0.25), plan)
  assert.equal(mid.cur, i, `mid-record ${i} films row ${i}`)
  assert.ok(mid.f[i] > 0 && mid.f[i] < 1, `row ${i} is being written mid-record`)
}
// the pull-back starts once every bar is written, no later than 20% (desktop) / 32% (phones) of a screen before the end
let e1 = R[n - 1][0]
while (shot(e1, plan).cur !== -1) e1++
assert.ok(shot(e1, plan).f.every(f => f === 1), 'every bar is written when the pull-back starts')
assert.ok(e1 <= Math.max(R[n - 1][0] + 160, R[n - 1][1] - 900 * (desk ? 0.2 : 0.32)), `the pull-back starts at ${e1}`)
// desktop: done 40% of a screen after the last record (the runway holds the card); phones: by the time the strip leaves
const end = shot(R[n - 1][1] + (desk ? 360 : 0), plan)
// desktop: the pull-back is not done 35% of a screen after the last record (it takes 60% of a screen, not 30%)
if (desk) assert.ok(shot(R[n - 1][1] + 315, plan).vd < 1, 'the desktop pull-back runs over 60% of a screen')
assert.deepEqual(end.view, [2018, now])
assert.equal(end.vd, 1)
assert.ok(end.f.every(f => f === 1))
}
// the card header: the full view is the resting "2018 – now"; a role's view reads months, today as "now"
assert.equal(range(2018, now, now), '2018 – now')
assert.equal(range(2025.24, 2025.92, now), 'Mar – Dec 2025')
assert.equal(range(2023.75, 2024.25, now), 'Oct 2023 – Mar 2024')
assert.equal(range(2025.32, now, now), 'Apr 2025 – now')
assert.equal(range(2021, now - 0.01, now), '2021 – now')
assert.equal(range(2018, 2021.5, now), '2018 – 2021')
console.log('camera ok')
