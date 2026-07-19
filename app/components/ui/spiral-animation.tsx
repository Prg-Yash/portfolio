'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// ── Vector helpers ────────────────────────────────────────────────────────────
class Vec2 {
    constructor(public x: number, public y: number) {}
}
class Vec3 {
    constructor(public x: number, public y: number, public z: number) {}
}

// ── Math helpers ──────────────────────────────────────────────────────────────
function ease(p: number, g: number): number {
    return p < 0.5 ? 0.5 * Math.pow(2 * p, g) : 1 - 0.5 * Math.pow(2 * (1 - p), g)
}
function easeOutElastic(x: number): number {
    if (x <= 0) return 0
    if (x >= 1) return 1
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * ((2 * Math.PI) / 4.5)) + 1
}
function lerp(a: number, b: number, t: number): number { return a * (1 - t) + b * t }
function clamp(v: number, lo: number, hi: number): number { return Math.min(Math.max(v, lo), hi) }
function remap(v: number, a: number, b: number, c: number, d: number): number {
    return c + (d - c) * ((v - a) / (b - a))
}

// ── Star ─────────────────────────────────────────────────────────────────────
class Star {
    angle: number; distance: number; dx: number; dy: number
    spiralLoc: number; z: number; sw: number
    rotDir: number; expRate: number; finalScale: number

    constructor(cameraZ: number, travelDist: number) {
        this.angle = Math.random() * Math.PI * 2
        this.distance = 30 * Math.random() + 15
        this.rotDir = Math.random() > 0.5 ? 1 : -1
        this.expRate = 1.2 + Math.random() * 0.8
        this.finalScale = 0.7 + Math.random() * 0.6
        this.dx = this.distance * Math.cos(this.angle)
        this.dy = this.distance * Math.sin(this.angle)
        this.spiralLoc = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3
        this.z = lerp(
            lerp(0.5 * cameraZ, travelDist + cameraZ, Math.random()),
            travelDist / 2,
            0.3 * this.spiralLoc
        )
        this.sw = Math.pow(Math.random(), 2.0)
    }
}

// ── Engine ────────────────────────────────────────────────────────────────────
class SpiralEngine {
    private ctx: CanvasRenderingContext2D
    private w: number; private h: number
    private stars: Star[] = []
    private time = 0
    private ticker: gsap.Ticker | null = null

    // Tunable constants – reduced star count for 60fps
    private readonly N_STARS     = 1500
    private readonly TRAIL_LEN   = 60
    private readonly CAMERA_Z    = -400
    private readonly TRAVEL_DIST = 3400
    private readonly DOT_Y_OFF   = 28
    private readonly VIEW_ZOOM   = 100
    private readonly CHANGE_T    = 0.32
    private readonly CYCLE_DUR   = 15   // seconds for one full cycle

    constructor(ctx: CanvasRenderingContext2D, w: number, h: number) {
        this.ctx = ctx
        this.w = w
        this.h = h
        this.buildStars()
        this.start()
    }

    private buildStars() {
        // Seeded random for consistent star layout
        const orig = Math.random
        let seed = 1234
        Math.random = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
        this.stars = Array.from({ length: this.N_STARS }, () => new Star(this.CAMERA_Z, this.TRAVEL_DIST))
        Math.random = orig
    }

    private spiralPath(p: number): Vec2 {
        p = clamp(1.2 * p, 0, 1)
        p = ease(p, 1.8)
        const turns = 6
        const theta = 2 * Math.PI * turns * Math.sqrt(p)
        const r = 170 * Math.sqrt(p)
        return new Vec2(r * Math.cos(theta), r * Math.sin(theta) + this.DOT_Y_OFF)
    }

    private rotate(v1: Vec2, v2: Vec2, p: number, ccw: boolean): Vec2 {
        const mx = (v1.x + v2.x) / 2, my = (v1.y + v2.y) / 2
        const dx = v1.x - mx, dy = v1.y - my
        const ang = Math.atan2(dy, dx)
        const r = Math.sqrt(dx * dx + dy * dy)
        const o = ccw ? -1 : 1
        const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p)
        return new Vec2(
            mx + r * (1 + bounce) * Math.cos(ang + o * Math.PI * easeOutElastic(p)),
            my + r * (1 + bounce) * Math.sin(ang + o * Math.PI * easeOutElastic(p))
        )
    }

    private project(pos: Vec3, sizeFactor: number, camZ: number) {
        if (pos.z <= camZ) return
        const depth = pos.z - camZ
        const x = this.VIEW_ZOOM * pos.x / depth
        const y = this.VIEW_ZOOM * pos.y / depth
        const r = Math.max(0.3, 200 * sizeFactor / depth)
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, 0, Math.PI * 2)
        this.ctx.fill()
    }

    private computeCamZ(t: number): number {
        const t2 = clamp(remap(t, this.CHANGE_T, 1, 0, 1), 0, 1)
        return this.CAMERA_Z + ease(Math.pow(t2, 1.2), 1.8) * this.TRAVEL_DIST
    }

    private drawTrail(t1: number) {
        const ctx = this.ctx
        for (let i = 0; i < this.TRAIL_LEN; i++) {
            const f = remap(i, 0, this.TRAIL_LEN, 1.1, 0.1)
            const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f
            ctx.fillStyle = '#ffd890'
            const pathTime = t1 - 0.00015 * i
            const pos = this.spiralPath(pathTime)
            const off = new Vec2(pos.x + 5, pos.y + 5)
            const rot = this.rotate(pos, off, Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5, i % 2 === 0)
            ctx.beginPath()
            ctx.arc(rot.x, rot.y, sw / 2, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    private drawStar(star: Star, t1: number, camZ: number) {
        const sp = this.spiralPath(star.spiralLoc)
        const q = t1 - star.spiralLoc
        if (q <= 0) return

        const dp = clamp(4 * q, 0, 1)
        let sx: number, sy: number

        if (dp < 0.3) {
            const f = dp / 0.3
            sx = lerp(sp.x, sp.x + star.dx * 0.3, f)
            sy = lerp(sp.y, sp.y + star.dy * 0.3, f)
        } else if (dp < 0.7) {
            const f = (dp - 0.3) / 0.4
            const curve = Math.sin(f * Math.PI) * star.rotDir * 1.5
            const bx = sp.x + star.dx * 0.3; const by = sp.y + star.dy * 0.3
            const tx = sp.x + star.dx * 0.7; const ty = sp.y + star.dy * 0.7
            sx = lerp(bx, tx, f) + (-star.dy * 0.4 * curve) * f
            sy = lerp(by, ty, f) + (star.dx * 0.4 * curve) * f
        } else {
            const f = (dp - 0.7) / 0.3
            const bx = sp.x + star.dx * 0.7; const by = sp.y + star.dy * 0.7
            const tDist = star.distance * star.expRate * 1.5
            const ang = star.angle + 1.2 * star.rotDir * f * Math.PI
            sx = lerp(bx, sp.x + tDist * Math.cos(ang), f)
            sy = lerp(by, sp.y + tDist * Math.sin(ang), f)
        }

        const vx = (star.z - this.CAMERA_Z) * sx / this.VIEW_ZOOM
        const vy = (star.z - this.CAMERA_Z) * sy / this.VIEW_ZOOM
        const sm = dp < 0.6 ? 1 + dp * 0.2 : lerp(1.2, star.finalScale, (dp - 0.6) / 0.4)
        this.project(new Vec3(vx, vy, star.z), 8.5 * star.sw * sm, camZ)
    }

    private frame(timestamp: number) {
        // Advance time (cycle repeats every CYCLE_DUR seconds)
        this.time = (timestamp / 1000 / this.CYCLE_DUR) % 1

        const ctx = this.ctx
        ctx.clearRect(0, 0, this.w, this.h)
        ctx.save()
        ctx.translate(this.w / 2, this.h / 2)

        const t1 = clamp(remap(this.time, 0, this.CHANGE_T + 0.25, 0, 1), 0, 1)
        const t2 = clamp(remap(this.time, this.CHANGE_T, 1, 0, 1), 0, 1)
        const camZ = this.computeCamZ(this.time)

        ctx.rotate(-Math.PI * ease(t2, 2.7))
        this.drawTrail(t1)

        ctx.fillStyle = '#ffd890'
        for (const star of this.stars) this.drawStar(star, t1, camZ)

        // Center dot after change event
        if (this.time > this.CHANGE_T) {
            const dy = this.CAMERA_Z * this.DOT_Y_OFF / this.VIEW_ZOOM
            this.project(new Vec3(0, dy, this.TRAVEL_DIST), 2.5, camZ)
        }

        ctx.restore()
    }

    start() {
        // Use GSAP ticker – syncs to rAF, avoids extra overhead
        const cb = (time: number) => this.frame(time)
        gsap.ticker.add(cb)
        this.ticker = { add: gsap.ticker.add, remove: gsap.ticker.remove } as any
        this._removeCallback = () => gsap.ticker.remove(cb)
    }

    private _removeCallback: (() => void) | null = null

    destroy() {
        this._removeCallback?.()
    }
}

// ── React Component ───────────────────────────────────────────────────────────
export function SpiralAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const resize = () => {
            const w = window.innerWidth
            const h = window.innerHeight
            const dpr = Math.min(window.devicePixelRatio || 1, 2) // cap DPR at 2 for perf

            canvas.width  = w * dpr
            canvas.height = h * dpr
            canvas.style.width  = `${w}px`
            canvas.style.height = `${h}px`
        }

        resize()

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        ctx.scale(dpr, dpr)

        const engine = new SpiralEngine(ctx, window.innerWidth, window.innerHeight)

        window.addEventListener('resize', resize)
        return () => {
            engine.destroy()
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ display: 'block', width: '100vw', height: '100vh' }}
        />
    )
}
