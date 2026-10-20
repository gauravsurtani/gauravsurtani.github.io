// Self-check for camera.ts (no framework): node src/components/home/experience/camera.check.mjs
// Real row dates, made-up record geometry. Prints "camera ok" or throws.
import assert from 'node:assert/strict'
import { shot } from './camera.ts'

const S = [2025.667, 2026.167, 2025.417, 2024.333, 2023.917, 2023.5, 2021.917, 2018.75, 2018.333]
const E = [2026.8, 2026.8, 2025.75, 2025.417, 2024.25, 2024.167, 2023.667, 2021, 2018.833]
const now = 2026.8
const R = []
let y = 1000
for (let i = 0; i < 5; i++) { R.push([y, y + 500]); y += 504 }
const eb = [y + 20, y + 260]
for (let i = 0; i < 4; i++) R.push([y + 60 + i * 50, y + 110 + i * 50])
const plan = { S, E, now, nRole: 5, R, eb, vh: 900, desk: true }

assert.equal(shot(0, plan).on, false)
let prev = null
for (let r = R[0][0] - 400; r < R[8][1] + 400; r += 3) {
  const s = shot(r, plan)
  if (!s.on) continue
  assert.ok(s.view[0] >= 2018 - 1e-9 && s.view[1] <= now + 1e-9 && s.view[1] > s.view[0], `view in range at ${r}`)
  if (r < R[0][0] + 30) assert.ok(Math.abs(s.view[1] - now) < 1e-9, 'the zoom-in keeps today at the right edge')
  if (prev) s.f.forEach((f, i) => assert.ok(f >= prev.f[i] - 1e-12, `row ${i} is never unwritten going down`))
  prev = s
}
const mid = shot((R[0][0] + 30 + R[0][1] - 90) / 2, plan)
assert.equal(mid.cur, 0)
assert.ok(mid.f[0] > 0.4 && mid.f[0] < 0.6)
const end = shot(R[8][1] + 400, plan)
assert.deepEqual(end.view, [2018, now])
assert.equal(end.vd, 1)
assert.ok(end.f.every(f => f === 1))
console.log('camera ok')
