import {
    useEffect,
    useRef
} from 'react'
import { isMobileUserAgent } from '../mobile'

const TRAIL_LIFETIME_MS = 560
const MAX_TRAIL_POINTS = 90
const DOT_RADIUS = 5
const LINK_DOT_RADIUS = 12
const LINK_DOT_OPACITY = 0.35
const DOT_RESIZE_DURATION_MS = 180
const TRAIL_RGB = '126, 207, 220'

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3

type TrailPoint = {
    x: number
    y: number
    createdAt: number
}

export function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

        if (
            !canvas ||
            isMobileUserAgent() ||
            !precisePointer.matches ||
            reducedMotion.matches
        ) return

        const context = canvas.getContext('2d')
        if (!context) return

        let animationFrameId = 0
        let points: TrailPoint[] = []
        let cursorX = 0
        let cursorY = 0
        let cursorVisible = false
        let cursorRadius = DOT_RADIUS
        let radiusAnimationFrom = DOT_RADIUS
        let radiusAnimationTo = DOT_RADIUS
        let radiusAnimationStartedAt = 0
        let cursorOpacity = 1
        let opacityAnimationFrom = 1
        let opacityAnimationTo = 1
        let linkHovered = false

        const resizeCanvas = () => {
            const pixelRatio = Math.min(window.devicePixelRatio, 2)

            canvas.width = Math.round(window.innerWidth * pixelRatio)
            canvas.height = Math.round(window.innerHeight * pixelRatio)
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        }

        const handlePointerMove = (event: PointerEvent) => {
            cursorX = event.clientX
            cursorY = event.clientY

            const target = event.target
            const nextLinkHovered = target instanceof Element && Boolean(
                target.closest('a[href]')
            )

            if (nextLinkHovered !== linkHovered) {
                linkHovered = nextLinkHovered
                radiusAnimationFrom = cursorRadius
                radiusAnimationTo = linkHovered ? LINK_DOT_RADIUS : DOT_RADIUS
                opacityAnimationFrom = cursorOpacity
                opacityAnimationTo = linkHovered ? LINK_DOT_OPACITY : 1
                radiusAnimationStartedAt = performance.now()
            }

            if (!cursorVisible) {
                points = []
                cursorVisible = true
            }

            points.push({
                x: cursorX,
                y: cursorY,
                createdAt: performance.now()
            })

            if (points.length > MAX_TRAIL_POINTS) {
                points = points.slice(-MAX_TRAIL_POINTS)
            }
        }

        const handlePointerOut = (event: PointerEvent) => {
            if (event.relatedTarget) return
            cursorVisible = false
            points = []
        }

        const draw = (currentTime: number) => {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight)

            if (cursorRadius !== radiusAnimationTo) {
                const progress = Math.min(
                    1,
                    (currentTime - radiusAnimationStartedAt) / DOT_RESIZE_DURATION_MS
                )
                cursorRadius = radiusAnimationFrom
                    + (radiusAnimationTo - radiusAnimationFrom) * easeOutCubic(progress)
                cursorOpacity = opacityAnimationFrom
                    + (opacityAnimationTo - opacityAnimationFrom) * easeOutCubic(progress)

                if (progress === 1) {
                    cursorRadius = radiusAnimationTo
                    cursorOpacity = opacityAnimationTo
                }
            }

            points = points.filter(
                (point) => currentTime - point.createdAt < TRAIL_LIFETIME_MS
            )

            context.lineCap = 'round'
            context.lineJoin = 'round'
            context.lineWidth = 2

            for (let index = 1; index < points.length; index += 1) {
                const previousPoint = points[index - 1]
                const point = points[index]
                const opacity = Math.max(
                    0,
                    1 - (currentTime - point.createdAt) / TRAIL_LIFETIME_MS
                )

                context.beginPath()
                context.moveTo(previousPoint.x, previousPoint.y)
                context.lineTo(point.x, point.y)
                context.strokeStyle = `rgba(${TRAIL_RGB}, ${opacity})`
                context.stroke()
            }

            if (cursorVisible) {
                context.beginPath()
                context.arc(cursorX, cursorY, cursorRadius, 0, Math.PI * 2)
                context.fillStyle = `rgba(${TRAIL_RGB}, ${cursorOpacity})`
                context.fill()
            }

            animationFrameId = window.requestAnimationFrame(draw)
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('pointerout', handlePointerOut)
        animationFrameId = window.requestAnimationFrame(draw)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerout', handlePointerOut)
        }
    }, [])

    return <canvas aria-hidden="true" className="cursor-trail" ref={canvasRef}/>
}
