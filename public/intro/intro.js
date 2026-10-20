/* e2 "Transcript to verdict".
   His resume scrolls past as a record. Amber marks sweep across the lines that prove a claim, the marked quotes lift out
   and stack at the center, the stack collapses into one amber line under his name and title, then the record splits
   along that line like a curtain while the name flies onto the hero's own name. Every word on screen is from resume.md. */
(function () {
  'use strict';
  var d = document.documentElement;
  if (!d.classList.contains('gi')) return;

  var DLAI = 'DeepLearning.AI · Sep 2025 – Present', BEX = 'Bexorg · May 2024 – May 2025',
    TAS = 'Tassel · Jun 2025 – Sep 2025', NASA = 'NASA Ames Research Center · Dec 2023 – Mar 2024';
  /* [label, resume sentence, phrase in it that is evidence] */
  var REC = [
    ['Summary', 'AI engineer with eight years in full-stack, data and ML engineering, building LLM applications.', 'building LLM applications'],
    [DLAI, 'Built and maintain the recruiter sourcing and review tool: migrated it from Railway to AWS with zero-downtime deploys, added bulk actions for 1,000 candidates, and cut LLM scoring costs.', 'cut LLM scoring costs'],
    [DLAI, 'Built the AI technical interviewer used in live hiring, with evidence-based grading that ties every skill score to a verified transcript quote, so hiring managers can decide from the report alone.', 'ties every skill score to a verified transcript quote'],
    ['Accenture · 2018 – 2020', 'Software Engineer'],
    [TAS, 'Built a multi-agent transliteration chain on OpenAI that converts each student’s name into its native-language script, so an ElevenLabs native voice pronounces it correctly in ceremony announcements.', 'multi-agent transliteration chain'],
    [BEX, 'Built a real-time data visualization platform on Neo4j and BigQuery with role-based access for 40+ users, cutting retrieval time 45%.', 'real-time data visualization platform'],
    ['Skills · AI', 'LLM applications and agents (Gemini, Claude, OpenAI), LLM evaluation, retrieval and vector search, MCP servers, speech (STT, TTS, real-time voice), LangChain', 'LLM evaluation'],
    ['Blog2Podcast · Mar 2026 – Present', 'Built and run a pipeline that turns engineering blogs from 15 companies into daily AI-narrated podcasts.', 'daily AI-narrated podcasts'],
    ['Summary', 'Currently the founding and sole engineer on DeepLearning.AI’s three AI recruiting products.', 'founding and sole engineer'],
    [NASA, 'Automated data validation across 1,000+ flight paths, reducing manual verification from 4 hours to 15 minutes, and containerized the legacy analysis system.', 'Automated data validation'],
    [NASA, 'Analyzed flight-path adherence to air traffic control procedures with GeoPandas and Pyproj, identifying navigation patterns that informed aviation fuel-cost optimization.', 'Analyzed flight-path adherence'],
    ['Ascendion · 2021 – 2023', 'Software Engineer → Senior Software Engineer'],
    [BEX, 'Built a natural-language analytics tool that turns plain-English questions into Plotly and D3 dashboards, cutting analysis time 75%; a key sales differentiator that helped convert pilots to contracts.', 'natural-language analytics tool'],
    [DLAI, 'Built a job-data pipeline tracking careers pages at 1,400+ companies, with 99,000+ jobs collected and 78,000+ live, to power role recommendations.', 'to power role recommendations'],
    [DLAI, 'Designed and built the Valence Career Agent, which helps candidates find their next role: it learns their goal, background and job constraints, runs a technical assessment, and returns a growth report with a positioning statement, answer coaching and a three-part growth plan.', 'Designed and built the Valence Career Agent'],
    [TAS, 'Moved heavy Azure pipelines from always-on to on-demand scaling, cutting costs 40% and processing 8x faster.', 'on-demand scaling'],
    [BEX, 'Built an ML quality-control system for time-series data with real-time anomaly detection, reducing data issues 70%.', 'real-time anomaly detection'],
    [DLAI, 'Exposed the sourcing tool as a scoped API for internal tools, and published dlai-mcp-server on npm for searching DeepLearning.AI courses from Claude Code, Codex and Cursor.', 'published dlai-mcp-server on npm'],
    [TAS, 'Built a video pipeline that segments graduation ceremony recordings by student and delivers personalized clips to 2M+ students, an $8M+ revenue opportunity.', 'segments graduation ceremony recordings'],
    ['Enthralltech · 2018', 'Frontend Developer'],
    [BEX, 'Resolved critical pipeline bottlenecks, improving throughput 10x and enabling new enterprise customers.', 'Resolved critical pipeline bottlenecks'],
    ['San Jose State University', 'MS, Artificial Intelligence']
  ];
  /* which evidence is picked first, and the order the picked quotes stack in (top to bottom) */
  var PRI = ['ties every skill score to a verified transcript quote', 'building LLM applications', 'LLM evaluation', 'founding and sole engineer',
    'multi-agent transliteration chain', 'Analyzed flight-path adherence', 'natural-language analytics tool', 'real-time anomaly detection', 'Designed and built the Valence Career Agent',
    'cut LLM scoring costs', 'published dlai-mcp-server on npm', 'real-time data visualization platform', 'Automated data validation', 'daily AI-narrated podcasts',
    'segments graduation ceremony recordings', 'on-demand scaling', 'Resolved critical pipeline bottlenecks', 'to power role recommendations'];

  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(t, a, dur) { return cl((t - a) / dur); }
  function lerp(a, b, k) { return a + (b - a) * k; }
  function io3(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function io4(x) { return x < .5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2; }
  function o3(x) { return 1 - Math.pow(1 - x, 3); }
  function o4(x) { return 1 - Math.pow(1 - x, 4); }
  function o5(x) { return 1 - Math.pow(1 - x, 5); }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function qsa(el, s) { return Array.prototype.slice.call(el.querySelectorAll(s)); }
  function rect(el) { return el.getBoundingClientRect(); }

  var root = document.createElement('div');
  root.id = 'gi-intro'; root.setAttribute('aria-hidden', 'true');
  root.innerHTML = '<div class="gi-half"><div class="gi-rec"></div><i class="gi-edge"></i></div><div class="gi-half"><div class="gi-rec"></div><i class="gi-edge"></i></div>' +
    '<svg class="gi-th" xmlns="http://www.w3.org/2000/svg"></svg><div class="gi-st"></div><div class="gi-v"></div><i class="gi-u"></i><div class="gi-t"></div>';
  document.body.appendChild(root);
  d.classList.add('gi-up');
  var halves = qsa(root, '.gi-half'), recs = qsa(root, '.gi-rec'), edges = qsa(root, '.gi-edge'), svg = root.querySelector('.gi-th'),
    stack = root.querySelector('.gi-st'), nameEl = root.querySelector('.gi-v'), titleEl = root.querySelector('.gi-t'), uEl = root.querySelector('.gi-u');

  var lastA = -1, lastDim = '', S0 = null, REV = 3, raf = 0, rev = null, ended = false, built = false, W, H, small, cols = [], picks = [], nameW = [], titleW = [], U = null, Ys = 0,
    role = document.querySelector('#h-name + p'), loc = [];

  /* reduced motion turned on while the intro is up: it goes now and the hero is left as a reduced-motion load draws it.
     Before hydration nobody else is listening yet (src/components/motion/reduce.ts), so drop the motion classes here too;
     after it, Entrance's own onReduce lands the card. */
  var rm = matchMedia('(prefers-reduced-motion: reduce)');
  function onRm(e) { if (e.matches) { d.classList.remove('mo', 'intro', 'brief'); end(); } }
  if (rm.addEventListener) rm.addEventListener('change', onRm);

  /* any input skips to a fast reveal. Passive and never cancelled: the wheel, touch or key that skips also scrolls the page */
  var EV = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
  EV.forEach(function (n) { addEventListener(n, skip, {passive: true, capture: true}); });
  addEventListener('resize', onResize);
  function unlisten() { EV.forEach(function (n) { removeEventListener(n, skip, {passive: true, capture: true}); }); removeEventListener('resize', onResize); }

  /* a width change breaks the layout, so it skips; a height-only change (a phone's address bar) does not */
  function onResize() { if (W && innerWidth !== W) skip(); }
  function now() { return performance.now() / 1000; }
  function skip() {
    if (rev || ended) return;
    if (S0 === null) { S0 = now(); REV = 0; return go(); }
    startReveal(true, now() - S0);
  }

  var cs = getComputedStyle(d), fSerif = cs.getPropertyValue('--f-serif').trim() || 'Georgia,serif', fSans = cs.getPropertyValue('--f-sans').trim() || 'system-ui,sans-serif';
  var fontsReady = document.fonts && document.fonts.load ? Promise.all([document.fonts.load('400 18px ' + fSerif), document.fonts.load('600 64px ' + fSans),
    document.fonts.load('400 16px ' + fSans), document.fonts.load('500 11px ' + fSans)]) : Promise.resolve();
  Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 1400); })]).then(begin, begin);

  function begin() {
    if (S0 !== null || ended) return;
    S0 = now();
    REV = Math.max(2.8, 3.2 - S0); /* the reveal starts about 3.2 s after navigation */
    go();
  }
  function go() { try { build(); } catch (e) { built = false; } if (REV === 0) startReveal(true, 0); raf = requestAnimationFrame(frame); }

  function entry(e) {
    var s = esc(e[1]);
    if (e[2]) { var i = e[1].indexOf(e[2]); s = esc(e[1].slice(0, i)) + '<span class="gi-p" data-p="' + esc(e[2]) + '">' + esc(e[2]) + '</span>' + esc(e[1].slice(i + e[2].length)); }
    return '<p class="gi-e"><span class="gi-l">' + esc(e[0]) + '</span>' + s + '</p>';
  }

  function build() {
    W = innerWidth; H = innerHeight; small = W < 640;
    var RF = small ? 15 : W < 1100 ? 17 : 18, SF = small ? 16.5 : 25, N = small ? 4 : 5, CW = small ? W - 48 : 420, GAP = small ? 28 : 44,
      SPD = [21, 27, 17, 31, 24, 19, 29];
    root.style.setProperty('--rf', RF + 'px'); root.style.setProperty('--sf', SF + 'px');
    Ys = Math.round(H * (small ? .5 : .52));

    /* columns of the record, centered, edge columns cut by the viewport */
    var K = Math.ceil((W / 2 + CW / 2) / (CW + GAP)), html = '';
    for (var k = -K; k <= K; k++) {
      var x = Math.round(W / 2 - CW / 2 + k * (CW + GAP));
      if (x + CW < 0 || x > W) continue;
      var off = ((k % REC.length) + REC.length) * 7 % REC.length, body = '';
      for (var j = 0; j < REC.length; j++) body += entry(REC[(off + j) % REC.length]);
      cols.push({x: x, full: x >= 4 && x + CW <= W - 4, v: SPD[(k + 14) % SPD.length], base: -((Math.abs(k) * 157 + (k < 0 ? 83 : 0)) % 260) - 24});
      html += '<div class="gi-col" style="width:' + CW + 'px">' + body + '</div>';
    }
    recs.forEach(function (r) { r.innerHTML = html; });
    var colEls = recs.map(function (r) { return qsa(r, '.gi-col'); });
    cols.forEach(function (c, i) { c.els = [colEls[0][i], colEls[1][i]]; c.els.forEach(function (el) { el.style.transform = 'translate3d(' + c.x + 'px,0,0)'; }); });

    /* the verdict: name and title copy the hero's own tokens so each word can fly onto its twin */
    var hn = qsa(document, '#h-name .tk'), hr = qsa(document, '#h-name + p .tk'), rt = [];
    for (var a = 0; a < hr.length; a++) { rt.push(hr[a]); if (/evaluation/.test(hr[a].textContent)) break; }
    if (!hn.length || !/evaluation/.test(rt.length ? rt[rt.length - 1].textContent : '')) { hn = []; rt = []; }
    loc = rt.length ? hr.slice(rt.length) : []; /* "· San Francisco Bay Area": the rest of the role line, which does not fly */
    var nTxt = hn.length ? hn.map(function (e) { return e.textContent; }) : ['Gaurav ', 'Surtani'],
      tTxt = rt.length ? rt.map(function (e) { return e.textContent; }) : ['AI ', 'Engineer', ', ', 'LLM ', 'applications ', 'and ', 'evaluation'];
    function words(list) {
      return list.map(function (s, i) { var sp = /\s$/.test(s) && i < list.length - 1 ? ' ' : ''; return '<span class="gi-w"><span>' + esc(s.trim()) + '</span></span>' + sp; }).join('');
    }
    var h1cs = hn.length ? getComputedStyle(hn[0].parentNode) : null, ls = h1cs ? parseFloat(h1cs.letterSpacing) / parseFloat(h1cs.fontSize) || -.015 : -.015;
    nameEl.style.cssText = 'font-family:' + fSans + ';font-weight:' + (h1cs ? h1cs.fontWeight : 600) + ';letter-spacing:' + ls + 'em;font-size:100px';
    nameEl.innerHTML = words(nTxt);
    var nw = qsa(nameEl, '.gi-w > span').map(function (e) { return rect(e).width; });
    var lineW = nw.reduce(function (s, v) { return s + v; }, 0) + 25;
    var NF = Math.min(96, (small ? .86 : .6) * W * 100 / lineW, H * .13);
    nameEl.style.fontSize = NF + 'px';
    var TF = small ? 15.5 : Math.max(16, Math.min(21, NF * .21));
    titleEl.style.cssText = 'font-family:' + fSans + ';font-size:' + TF + 'px;max-width:' + (small ? W - 56 : W) + 'px';
    titleEl.innerHTML = words(tTxt);

    /* evidence line (U) sits on the seam, the name above it, the title below */
    var UH = small ? 2.5 : Math.max(2.5, Math.round(NF * .036 * 2) / 2);
    var ni = qsa(nameEl, '.gi-w > span').map(rect), nb = Math.max.apply(null, ni.map(function (r) { return r.bottom; }));
    nameEl.style.top = (Ys - UH / 2 - (nb - NF * .1)) + 'px';
    titleEl.style.top = (Ys + UH / 2 + Math.max(18, NF * .3)) + 'px';
    ni = qsa(nameEl, '.gi-w > span').map(rect);
    var uL = Math.min.apply(null, ni.map(function (r) { return r.left; })), uR = Math.max.apply(null, ni.map(function (r) { return r.right; }));
    U = {l: uL, t: Ys - UH / 2, w: uR - uL, h: UH};
    uEl.style.cssText = 'left:' + U.l + 'px;top:' + U.t + 'px;width:' + U.w + 'px;height:' + U.h + 'px';
    function meas(el, f, tw) {
      return qsa(el, '.gi-w').map(function (w, i) {
        var b = rect(w), r = rect(w.firstChild);
        return {el: w, bx: b.left, by: b.top, ix: r.left - b.left, iy: r.top - b.top, f: f, tw: tw[i] || null, j: i};
      });
    }
    nameW = meas(nameEl, NF, hn); titleW = meas(titleEl, TF, rt);
    var tb = Math.max.apply(null, titleW.map(function (w) { return w.by + w.el.offsetHeight; }));

    /* pick the marked phrases that are on screen, spread out, and clear of the verdict */
    var cands = [], tS = 1, zoneT = Math.min(nameW[0].by, Ys - N * SF * .85) - 16, zoneB = Math.max(tb, Ys + N * SF * .85) + 16;
    cols.forEach(function (c, ci) {
      if (!c.full) return;
      var sps = [qsa(c.els[0], '.gi-p'), qsa(c.els[1], '.gi-p')];
      sps[0].forEach(function (sp, si) {
        var r = rect(sp), y = c.base - c.v * tS + r.top, ph = sp.getAttribute('data-p');
        if (r.width > CW + 1 || y < H * .09 || y + r.height > H * .91) return;
        var cx = r.left + r.width / 2, inZone = !small && y + r.height > zoneT && y < zoneB && Math.abs(cx - W / 2) < CW / 2 + 8;
        if (inZone) return;
        cands.push({c: c, sp: [sp, sps[1][si]], ph: ph, pri: PRI.indexOf(ph), ox: r.left, oy: r.top, w: r.width, h: r.height, cx: cx, cy: y + r.height / 2});
      });
    });
    cands.sort(function (a, b) { return a.pri - b.pri || a.cy - b.cy; });
    var minD = small ? H * .1 : H * .16;
    cands.forEach(function (c) {
      if (picks.length >= N || picks.some(function (p) { return p.ph === c.ph || Math.hypot(p.cx - c.cx, p.cy - c.cy) < minD; })) return;
      picks.push(c);
    });
    picks.sort(function (a, b) { return a.cy - b.cy; }); /* top source to top slot, so the flights do not cross */

    /* the quote clones, laid out in their stack slots */
    var n = picks.length, G = SF * 1.62;
    picks.forEach(function (p, i) {
      var q = document.createElement('span');
      q.className = 'gi-q';
      q.innerHTML = '<i class="gi-qm l">“</i><span class="gi-qt">' + esc(p.ph) + '</span><i class="gi-qm r">”</i>';
      stack.appendChild(q);
      var qt = q.children[1], bw = q.offsetWidth, bh = q.offsetHeight;
      p.q = q; p.sl = Math.round(W / 2 - bw / 2); p.st = Math.round(Ys - (n - 1) / 2 * G + i * G - bh / 2);
      q.style.left = p.sl + 'px'; q.style.top = p.st + 'px';
      var r = rect(qt);
      p.ix = r.left - p.sl; p.iy = r.top - p.st; p.iw = r.width; p.ih = r.height; p.sf = SF; p.rf = RF;
      p.bar = {x: p.ix - .15 * SF, y: p.iy + .18 * SF, w: p.iw + .3 * SF, h: p.ih - .14 * SF};
      p.side = p.cx < W / 2 ? 0 : 1;
      p.hl = .2 + .15 * i; p.dep = .98 + .08 * i; p.col = 2.02 + .035 * i;
      p.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      p.path.setAttribute('stroke-width', small ? 1 : 1.25); p.dot.setAttribute('r', small ? 2 : 2.5);
      svg.appendChild(p.path); svg.appendChild(p.dot);
    });
    halves[0].style.clipPath = 'inset(0 0 ' + (H - Ys) + 'px 0)'; halves[1].style.clipPath = 'inset(' + Ys + 'px 0 0 0)';
    halves[0].style.transformOrigin = halves[1].style.transformOrigin = '50% ' + Ys + 'px';
    edges[0].style.top = (Ys - 2) + 'px'; edges[1].style.top = Ys + 'px';
    built = true;
  }

  function srcRect(p, t) { var y = p.c.base - p.c.v * t; return {l: p.ox, t: y + p.oy, w: p.w, h: p.h}; }
  /* a quote's transform at time t: the flight from its source, then the collapse of its bar onto the evidence line */
  function quoteState(p, t) {
    var f = seg(t, p.dep, .56), e = io3(f), s, tx, ty, sx, sy, rot = 0;
    if (!p.from) return null;
    var s0 = p.rf / p.sf, tx0 = p.from.l - p.sl - s0 * p.ix, ty0 = p.from.t - p.st - s0 * p.iy;
    s = lerp(s0, 1, e); tx = lerp(tx0, 0, e); ty = lerp(ty0, 0, e);
    var dx = -ty0, dy = tx0, dl = Math.hypot(dx, dy) || 1, arc = Math.sin(Math.PI * e) * Math.min(90, dl * .12) * (p.side ? -1 : 1);
    tx += dx / dl * arc; ty += dy / dl * arc; rot = Math.sin(Math.PI * e) * (p.side ? 2.5 : -2.5);
    sx = sy = s;
    var c = io4(seg(t, p.col + .07, .3)), cf = o3(seg(t, p.col + .05, .16));
    if (cf > 0) {
      var b = p.bar, csx = U.w / b.w, csy = U.h / b.h;
      sx = lerp(1, csx, c); sy = lerp(1, csy, cf); tx = lerp(0, U.l - p.sl - csx * b.x, c); ty = lerp(0, U.t - p.st - csy * b.y, c) + (1 - c) * (1 - csy) * b.y * cf;
    }
    return {tx: tx, ty: ty, sx: sx, sy: sy, rot: rot, f: f, c: c};
  }

  function frame() {
    raf = 0;
    if (ended) return;
    var t = now() - S0;
    if (!rev && t >= REV) startReveal(false, t);
    var k = rev ? cl((t - rev.t) / rev.dur) : 0;
    if (built) draw(t, k);
    if (rev) reveal(t, k);
    if (k >= 1) return end();
    raf = requestAnimationFrame(frame);
  }

  function draw(t, k) {
    var recA = o3(seg(t, 0, .45)), dim = lerp(54, 22, io3(seg(t, .9, .8))).toFixed(1);
    if (recA !== lastA || dim !== lastDim) { lastA = recA; lastDim = dim; recs.forEach(function (r) { r.style.opacity = recA; r.style.setProperty('--dim', dim); }); }
    cols.forEach(function (c) {
      var tr = 'translate3d(' + c.x + 'px,' + (c.base - c.v * t + (1 - recA) * 14).toFixed(2) + 'px,0)';
      c.els[0].style.transform = c.els[1].style.transform = tr;
    });
    var thA = rev ? 1 - seg(k, 0, .2) : 1, dpath = [];
    picks.forEach(function (p) {
      var h = o3(seg(t, p.hl, .3));
      if (h !== p.h) { p.h = h; p.sp.forEach(function (s) { s.style.setProperty('--h', h.toFixed(3)); }); }
      if (!p.from && t >= p.dep && !(rev && rev.fast && !rev.formed)) {
        p.from = srcRect(p, t);
        p.sp.forEach(function (s) { s.classList.add('gone'); });
        p.q.style.visibility = 'visible';
      }
      var st = quoteState(p, t);
      if (!st) { p.path.style.opacity = p.dot.style.opacity = 0; return; }
      var landed = st.c >= 1;
      p.q.style.transform = 'translate(' + st.tx.toFixed(2) + 'px,' + st.ty.toFixed(2) + 'px) rotate(' + (st.rot * (1 - st.c)).toFixed(2) + 'deg) scale(' + st.sx.toFixed(4) + ',' + st.sy.toFixed(4) + ')';
      p.q.style.setProperty('--qm', (st.f * (1 - seg(t, p.col, .1))).toFixed(3));
      p.q.style.setProperty('--ta', (1 - seg(t, p.col, .12)).toFixed(3));
      p.q.style.setProperty('--qa', seg(t, p.col + .07, .25).toFixed(3));
      if (landed && p.q.style.visibility !== 'hidden') { p.q.style.visibility = 'hidden'; uEl.style.opacity = 1; }
      if (rev && rev.fast && !rev.formed) p.q.style.opacity = 1 - seg(k, 0, .4);
      /* citation thread: from the hole in the record to the quote's near end, later to the end of the evidence line */
      var s = srcRect(p, t), b = p.bar, endX = p.side ? b.x + b.w : b.x;
      var px = p.sl + st.tx + st.sx * endX, py = p.st + st.ty + st.sy * (b.y + b.h / 2);
      var ox = s.l + s.w < px ? s.l + s.w : s.l > px ? s.l : s.l + s.w / 2, oy = s.t + s.h * .62, mx = (ox + px) / 2;
      p.path.setAttribute('d', 'M' + ox.toFixed(1) + ' ' + oy.toFixed(1) + 'C' + mx.toFixed(1) + ' ' + oy.toFixed(1) + ' ' + mx.toFixed(1) + ' ' + py.toFixed(1) + ' ' + px.toFixed(1) + ' ' + py.toFixed(1));
      p.dot.setAttribute('cx', ox.toFixed(1)); p.dot.setAttribute('cy', oy.toFixed(1));
      var a = seg(t, p.dep, .15) * lerp(.85, small ? 0 : .28, seg(t, p.col + .3, .3)) * thA;
      p.path.style.opacity = a; p.dot.style.opacity = a;
    });
    /* the evidence line glows up just before the record splits along it */
    if (!rev && U) { var gl = io3(seg(t, REV - .4, .4)); uEl.style.boxShadow = gl ? '0 0 ' + (gl * 16).toFixed(1) + 'px ' + (gl * 1.5).toFixed(1) + 'px var(--accent)' : ''; }
    /* the verdict streams in above the evidence line */
    if (!rev || !rev.formed) {
      nameW.forEach(function (w) {
        var e = o3(seg(t, 2.08 + w.j * .07, .34));
        w.el.style.opacity = e; w.el.style.filter = e < 1 ? 'blur(' + ((1 - e) * 8).toFixed(2) + 'px)' : '';
        w.el.style.transform = 'translateY(' + ((1 - e) * w.f * .14).toFixed(2) + 'px)';
      });
      titleW.forEach(function (w) {
        var e = o3(seg(t, 2.22 + w.j * .025, .3));
        w.el.style.opacity = e; w.el.style.transform = 'translateY(' + ((1 - e) * 8).toFixed(2) + 'px)';
      });
    }
  }

  function startReveal(fast, t) {
    if (rev) return;
    var formed = built && t >= 2.4 && nameW.every(function (w) { return w.tw; }) && titleW.every(function (w) { return w.tw; });
    rev = {t: t, fast: fast, formed: formed, dur: fast ? .38 : .74, sy: scrollY};
    unlisten(); root.classList.add('gi-out');
    /* the hero under the record is already drawn; Entrance (src/components/home) runs the card's sweep as the hand-off,
       or lands it at once after a skip */
    window.__giOut = fast ? 2 : 1;
    dispatchEvent(new CustomEvent('gi-out', {detail: fast}));
    if (formed) {
      d.classList.add('gi-sh');
      picks.forEach(function (p) { p.q.style.opacity = 0; });
      uEl.style.opacity = 1;
      /* each name word flies onto its twin in the h1 (one line, so the name moves as one unit) */
      nameW.forEach(function (w) {
        var r = rect(w.tw), s = parseFloat(getComputedStyle(w.tw).fontSize) / w.f;
        w.s = s; w.tx = r.left - w.bx - s * w.ix; w.ty = r.top - w.by - s * w.iy;
        w.el.style.opacity = 1; w.el.style.filter = '';
      });
      /* the title moves as one block onto the role line's first word. If the role wraps inside the title's words
         (phones), the block cannot land word for word, so it fades out as the evidence line stretches (gone before the split
         uncovers the card under it) and the real role fades in once the name is above it */
      titleW.forEach(function (w) { w.el.style.opacity = 1; w.el.style.transform = ''; });
      var r0 = rect(titleW[0].el.firstChild), tb = rect(titleEl), t0 = titleW[0].tw, rr = rect(t0), tops = titleW.map(function (w) { return Math.round(rect(w.tw).top); });
      rev.tt = {tx: rr.left - r0.left, ty: rr.top - r0.top, s: parseFloat(getComputedStyle(t0).fontSize) / titleW[0].f,
        cf: Math.max.apply(null, tops) - Math.min.apply(null, tops) > 2};
      titleEl.style.transformOrigin = (r0.left - tb.left).toFixed(1) + 'px ' + (r0.top - tb.top).toFixed(1) + 'px';
    }
  }

  function reveal(t, k) {
    var fast = rev.fast, D = rev.dur;
    /* the evidence line stretches across the screen, then the record splits along it */
    var ux = o5(seg(k, 0, fast ? .3 : .2)), m = o4(seg(k, fast ? .05 : .13, fast ? .95 : .82));
    if (built && U) {
      uEl.style.opacity = rev.formed ? 1 - seg(k, .14, .06) : 0;
      /* a transform, not left/width: no layout shift (CLS) */
      uEl.style.transform = 'translateX(' + lerp(0, -4 - U.l, ux).toFixed(2) + 'px) scaleX(' + lerp(1, (W + 8) / U.w, ux).toFixed(4) + ')';
    }
    var gap = H * .06;
    halves[0].style.transform = 'translate3d(0,' + (-m * (Ys + gap)).toFixed(2) + 'px,0) scale(' + (1 + m * .05).toFixed(4) + ')';
    halves[1].style.transform = 'translate3d(0,' + (m * (H - Ys + gap)).toFixed(2) + 'px,0) scale(' + (1 + m * .05).toFixed(4) + ')';
    var ea = (fast && !rev.formed ? seg(k, 0, .1) : seg(k, .12, .05)) * (1 - seg(k, .35, .5));
    edges.forEach(function (e) { e.style.opacity = ea; });
    if (rev.formed) {
      /* x and size move together, so words on one line keep their spacing. dy: the page may scroll under the flight
         (the input that skipped scrolls it), so the words land where the hero is now */
      var ex = io3(seg(k, 0, .62)), ey = io3(seg(k, .03, .6)), dy = rev.sy - scrollY, tt = rev.tt;
      nameW.forEach(function (w) {
        w.el.style.transform = 'translate(' + (w.tx * ex).toFixed(2) + 'px,' + ((w.ty + dy) * ey).toFixed(2) + 'px) scale(' + lerp(1, w.s, ex).toFixed(4) + ')';
      });
      titleEl.style.transform = 'translate(' + (tt.tx * ex).toFixed(2) + 'px,' + ((tt.ty + dy) * ey).toFixed(2) + 'px) scale(' + lerp(1, tt.s, ex).toFixed(4) + ')';
      if (k >= .64 && d.classList.contains('gi-sh')) d.classList.remove('gi-sh');
      var fade = 1 - seg(k, .64, .14);
      nameEl.style.opacity = fade;
      if (tt.cf) {
        titleEl.style.opacity = 1 - seg(k, .02, .1);
        if (role) role.style.setProperty('opacity', seg(k, .55, .25).toFixed(3), 'important'); /* once the name is above it */
      } else {
        titleEl.style.opacity = fade;
        /* the title lands word for word; the rest of the role line fades in beside it as the real line shows */
        loc.forEach(function (e) { e.style.opacity = seg(k, .64, .25).toFixed(3); });
      }
    } else {
      nameEl.style.opacity = titleEl.style.opacity = 1 - seg(k, 0, .35);
    }
  }

  function end() {
    if (ended) return;
    ended = true;
    if (raf) cancelAnimationFrame(raf);
    raf = 0; unlisten();
    d.classList.remove('gi-sh');
    if (role) role.style.removeProperty('opacity');
    loc.forEach(function (e) { e.style.removeProperty('opacity'); });
    if (rm.removeEventListener) rm.removeEventListener('change', onRm);
    if (root.parentNode) root.parentNode.removeChild(root);
    d.classList.remove('gi', 'gi-up');
  }
})();
