import {
    type CSSProperties,
    type MouseEvent as ReactMouseEvent,
    type PointerEvent as ReactPointerEvent,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { syncBrowserThemeColor } from '../browserTheme'
import { useMobileLayout } from '../mobile'
import { PROJECTS, type ProjectId } from '../projects'

const FRAME_DURATION_MS = 4_000
const PAGE_MORPH_DURATION_MS = 1_000
const PAGE_MORPH_EASING = 'cubic-bezier(0.87, 0, 0.13, 1)'
const BLOCK_REVEAL_DURATION_MS = 760
const BLOCK_STAGGER_MS = 48
const BLOCK_ENTER_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
const BLOCK_EXIT_EASING = 'cubic-bezier(0.76, 0, 0.24, 1)'
const ARTBOARD_WIDTH = 1_933
const ARTBOARD_HEIGHT = 1_212

type Corner = readonly [ xRadius: number, yRadius: number ]
type Corners = readonly [
    topLeft: Corner,
    topRight: Corner,
    bottomRight: Corner,
    bottomLeft: Corner
]

type BlockGeometry = {
    left: string
    top: string
    width: string
    height: string
    borderRadius: string
}

type ResponsiveBlockGeometry = {
    desktop: BlockGeometry
    mobile: BlockGeometry
}

type Layout = Record<ProjectId, ResponsiveBlockGeometry>

const ZERO_CORNER: Corner = [ 0, 0 ]

const percent = (value: number, total: number) =>
    `${(value / total) * 100}%`

const allCorners = (xRadius: number, yRadius: number): Corners => [
    [ xRadius, yRadius ],
    [ xRadius, yRadius ],
    [ xRadius, yRadius ],
    [ xRadius, yRadius ]
]

const selectedCorners = (
    topLeft: Corner = ZERO_CORNER,
    topRight: Corner = ZERO_CORNER,
    bottomRight: Corner = ZERO_CORNER,
    bottomLeft: Corner = ZERO_CORNER
): Corners => [ topLeft, topRight, bottomRight, bottomLeft ]

const geometry = (
    x: number,
    y: number,
    width: number,
    height: number,
    corners: Corners,
    artboardWidth: number,
    artboardHeight: number
): BlockGeometry => {
    const horizontalRadii = corners
        .map(([ xRadius ]) => percent(xRadius, width))
        .join(' ')
    const verticalRadii = corners
        .map(([ , yRadius ]) => percent(yRadius, height))
        .join(' ')

    return {
        left: percent(x, artboardWidth),
        top: percent(y, artboardHeight),
        width: `calc(${percent(width, artboardWidth)} + 1px)`,
        height: `calc(${percent(height, artboardHeight)} + 1px)`,
        borderRadius: `${horizontalRadii} / ${verticalRadii}`
    }
}

const rotateCorner = ([ xRadius, yRadius ]: Corner): Corner =>
    [ yRadius, xRadius ]

const block = (
    x: number,
    y: number,
    width: number,
    height: number,
    corners: Corners = allCorners(0, 0)
): ResponsiveBlockGeometry => {
    const [ topLeft, topRight, bottomRight, bottomLeft ] = corners
    const rotatedCorners: Corners = [
        rotateCorner(bottomLeft),
        rotateCorner(topLeft),
        rotateCorner(topRight),
        rotateCorner(bottomRight)
    ]

    return {
        desktop: geometry(
            x,
            y,
            width,
            height,
            corners,
            ARTBOARD_WIDTH,
            ARTBOARD_HEIGHT
        ),
        mobile: geometry(
            ARTBOARD_HEIGHT - y - height,
            x,
            height,
            width,
            rotatedCorners,
            ARTBOARD_HEIGHT,
            ARTBOARD_WIDTH
        )
    }
}

const sharpBars: Layout = {
    helium: block(0, 0, 178, 606),
    webartistry: block(179, 0, 303, 902),
    whale: block(787, 295, 178, 606),
    himcm: block(966, 0, 483, 1_212),
    orinav: block(483, 295, 303, 917),
    a11ylab: block(1_450, 93, 307, 1_003),
    pioneer: block(1_758, 497, 179, 715)
}

const roundedGrid: Layout = {
    helium: block(0, 0, 358, 606, allCorners(136, 136)),
    webartistry: block(359, 0, 604, 606, allCorners(136, 136)),
    whale: block(0, 606, 605, 606, allCorners(136, 136)),
    himcm: block(606, 606, 357, 606, allCorners(136, 136)),
    orinav: block(
        965,
        0,
        968,
        1_212,
        selectedCorners([ 136, 136 ], [ 136, 136 ], [ 152, 152 ], [ 136, 136 ])
    ),
    a11ylab: block(
        1_327,
        606,
        606,
        606,
        selectedCorners([ 136, 136 ], [ 136, 136 ], [ 152, 152 ], [ 136, 136 ])
    ),
    pioneer: block(1_630, 908, 303, 304, allCorners(152, 152))
}

const geometricGrid: Layout = {
    helium: block(
        0,
        0,
        358,
        606,
        selectedCorners(ZERO_CORNER, ZERO_CORNER, ZERO_CORNER, [ 358, 358 ])
    ),
    webartistry: block(359, 0, 604, 606, allCorners(302, 303)),
    whale: block(
        0,
        606,
        605,
        606,
        selectedCorners(ZERO_CORNER, [ 303, 303 ], [ 303, 303 ])
    ),
    himcm: block(
        606,
        606,
        357,
        606,
        selectedCorners(ZERO_CORNER, ZERO_CORNER, ZERO_CORNER, [ 357, 357 ])
    ),
    orinav: block(
        965,
        0,
        968,
        1_212,
        selectedCorners(ZERO_CORNER, [ 606, 606 ])
    ),
    a11ylab: block(
        1_327,
        606,
        606,
        606,
        selectedCorners([ 303, 303 ])
    ),
    pioneer: block(
        1_630,
        908,
        303,
        304,
        selectedCorners([ 152, 152 ])
    )
}

const circles: Layout = {
    helium: block(0, 203, 358, 358, allCorners(179, 179)),
    webartistry: block(359, 58, 604, 605, allCorners(302, 303)),
    whale: block(0, 549, 605, 605, allCorners(303, 303)),
    himcm: block(606, 650, 357, 357, allCorners(179, 179)),
    orinav: block(724, 0, 1_208, 1_212, allCorners(606, 606)),
    a11ylab: block(1_327, 606, 605, 606, allCorners(303, 303)),
    pioneer: block(1_630, 908, 303, 304, allCorners(152, 152))
}

const verticalPills: Layout = {
    helium: block(0, 0, 178, 606, allCorners(89, 89)),
    webartistry: block(179, 0, 303, 902, allCorners(152, 152)),
    whale: block(483, 295, 303, 917, allCorners(152, 152)),
    himcm: block(787, 604, 178, 606, allCorners(89, 89)),
    orinav: block(1_453, 0, 481, 1_212, allCorners(241, 241)),
    a11ylab: block(966, 495, 178, 303, allCorners(89, 89)),
    pioneer: block(1_145, 94, 307, 1_001, allCorners(154, 154))
}

const sharpGrid: Layout = {
    helium: block(0, 0, 358, 606),
    webartistry: block(359, 0, 604, 606),
    whale: block(0, 606, 605, 606),
    himcm: block(606, 606, 357, 606),
    orinav: block(965, 0, 967, 1_212),
    a11ylab: block(1_327, 606, 605, 606),
    pioneer: block(1_630, 908, 303, 304)
}

// The repeated entries correspond to the repeated frames in the supplied sequence.
const LAYOUTS: readonly Layout[] = [
    sharpBars,
    sharpBars,
    roundedGrid,
    geometricGrid,
    circles,
    verticalPills,
    geometricGrid,
    sharpGrid
]

const DEFAULT_LAYOUT_INDEX = LAYOUTS.indexOf(geometricGrid)

type HomeLocationState = {
    closingProjectId?: ProjectId
    layoutIndex?: number
}

type CornerRadii = {
    bottomLeft: string
    bottomRight: string
    topLeft: string
    topRight: string
}

type OpeningProject = {
    coverOpacity: number
    id: ProjectId
    path: string
    radii: CornerRadii
    rect: {
        height: number
        left: number
        top: number
        width: number
    }
}

const resolveRadiusLength = (value: string, dimension: number) => {
    const numericValue = Number.parseFloat(value)
    if (!Number.isFinite(numericValue)) return 0

    return value.endsWith('%')
        ? dimension * numericValue / 100
        : numericValue
}

const resolveCornerRadius = (
    value: string,
    width: number,
    height: number
) => {
    const [ horizontalRadius, verticalRadius = horizontalRadius ] = value.split(/\s+/)
    const xRadius = resolveRadiusLength(horizontalRadius ?? '0', width)
    const yRadius = resolveRadiusLength(verticalRadius ?? '0', height)

    return `${xRadius}px ${yRadius}px`
}

const readCornerRadii = (element: HTMLElement): CornerRadii => {
    const style = window.getComputedStyle(element)
    const rect = element.getBoundingClientRect()

    return {
        topLeft: resolveCornerRadius(
            style.borderTopLeftRadius,
            rect.width,
            rect.height
        ),
        topRight: resolveCornerRadius(
            style.borderTopRightRadius,
            rect.width,
            rect.height
        ),
        bottomRight: resolveCornerRadius(
            style.borderBottomRightRadius,
            rect.width,
            rect.height
        ),
        bottomLeft: resolveCornerRadius(
            style.borderBottomLeftRadius,
            rect.width,
            rect.height
        )
    }
}

function useReducedMotion() {
    const [ reducedMotion, setReducedMotion ] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const updatePreference = () => setReducedMotion(mediaQuery.matches)

        updatePreference()
        mediaQuery.addEventListener('change', updatePreference)

        return () => mediaQuery.removeEventListener('change', updatePreference)
    }, [])

    return reducedMotion
}

export function ProjectBlocks() {
    const location = useLocation()
    const navigate = useNavigate()
    const locationState = location.state as HomeLocationState | null
    const restoredLayoutIndex = locationState?.layoutIndex
    const [ layoutIndex, setLayoutIndex ] = useState(() =>
        Number.isInteger(restoredLayoutIndex) &&
        restoredLayoutIndex !== undefined &&
        restoredLayoutIndex >= 0 &&
        restoredLayoutIndex < LAYOUTS.length
            ? restoredLayoutIndex
            : DEFAULT_LAYOUT_INDEX
    )
    const [ activeProjectLabel, setActiveProjectLabel ] = useState<string | null>(null)
    const [ interactionPaused, setInteractionPaused ] = useState(false)
    const [ openingProject, setOpeningProject ] = useState<OpeningProject | null>(null)
    const [ closingProjectId, setClosingProjectId ] = useState<ProjectId | null>(() =>
        PROJECTS.some((project) => project.id === locationState?.closingProjectId)
            ? locationState?.closingProjectId ?? null
            : null
    )
    const blockRefs = useRef<Partial<Record<ProjectId, HTMLAnchorElement | null>>>({})
    const entranceHasRunRef = useRef(false)
    const entranceAnimationsFinishedRef = useRef<Promise<void>>(Promise.resolve())
    const exitAnimationsFinishedRef = useRef<Promise<void>>(Promise.resolve())
    const overlayCoverRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const mobileLayout = useMobileLayout()

    const animateBlocks = (
        direction: 'enter' | 'exit',
        excludedProjectId?: ProjectId
    ) => {
        const blocks: {
            element: HTMLAnchorElement
            rect: DOMRect
        }[] = []

        for (const project of PROJECTS) {
            if (project.id === excludedProjectId) continue
            const element = blockRefs.current[project.id]
            if (!element) continue
            blocks.push({ element, rect: element.getBoundingClientRect() })
        }

        blocks.sort((first, second) =>
            first.rect.left - second.rect.left || first.rect.top - second.rect.top
        )
        if (direction === 'enter') blocks.reverse()

        return blocks.map(({ element }, index) => {
            const collapsedFrame = {
                transform: 'scale(0.001)'
            }
            const visibleFrame = {
                transform: 'scale(1)'
            }

            return element.animate(
                direction === 'enter'
                    ? [ collapsedFrame, visibleFrame ]
                    : [ visibleFrame, collapsedFrame ],
                {
                    delay: index * BLOCK_STAGGER_MS,
                    duration: BLOCK_REVEAL_DURATION_MS,
                    easing: direction === 'enter'
                        ? BLOCK_ENTER_EASING
                        : BLOCK_EXIT_EASING,
                    fill: 'both'
                }
            )
        })
    }

    const animationsFinished = (animations: Animation[]) =>
        Promise.all(animations.map((animation) =>
            animation.finished.catch(() => undefined)
        )).then(() => undefined)

    useEffect(() => {
        if (reducedMotion) {
            setLayoutIndex(DEFAULT_LAYOUT_INDEX)
            return
        }

        if (openingProject || closingProjectId || interactionPaused) return

        const intervalId = window.setInterval(() => {
            setLayoutIndex((currentIndex) => (currentIndex + 1) % LAYOUTS.length)
        }, FRAME_DURATION_MS)

        return () => window.clearInterval(intervalId)
    }, [ closingProjectId, interactionPaused, openingProject, reducedMotion ])

    useLayoutEffect(() => {
        if (entranceHasRunRef.current || openingProject) return
        entranceHasRunRef.current = true
        if (reducedMotion) return

        const animations = animateBlocks('enter', closingProjectId ?? undefined)
        entranceAnimationsFinishedRef.current = animationsFinished(animations)
        void entranceAnimationsFinishedRef.current.then(() =>
            animations.forEach((animation) => animation.cancel())
        )
    }, [ closingProjectId, openingProject, reducedMotion ])

    useLayoutEffect(() => {
        if (!openingProject || reducedMotion) return

        const animations = animateBlocks('exit', openingProject.id)
        exitAnimationsFinishedRef.current = animationsFinished(animations)
        return () => animations.forEach((animation) => animation.cancel())
    }, [ openingProject, reducedMotion ])

    useLayoutEffect(() => {
        const overlay = overlayRef.current
        if (!overlay) return

        if (openingProject) {
            if (reducedMotion) {
                navigate(openingProject.path, {
                    state: { fromHome: true, layoutIndex }
                })
                return
            }

            const morphAnimation = overlay.animate([
                {
                    borderBottomLeftRadius: openingProject.radii.bottomLeft,
                    borderBottomRightRadius: openingProject.radii.bottomRight,
                    borderTopLeftRadius: openingProject.radii.topLeft,
                    borderTopRightRadius: openingProject.radii.topRight,
                    height: `${openingProject.rect.height}px`,
                    left: `${openingProject.rect.left}px`,
                    top: `${openingProject.rect.top}px`,
                    width: `${openingProject.rect.width}px`
                },
                {
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px',
                    height: `${window.innerHeight}px`,
                    left: '0px',
                    top: '0px',
                    width: `${window.innerWidth}px`
                }
            ], {
                duration: PAGE_MORPH_DURATION_MS,
                easing: PAGE_MORPH_EASING,
                fill: 'forwards'
            })

            const coverAnimation = overlayCoverRef.current?.animate([
                { opacity: openingProject.coverOpacity },
                { opacity: 0 }
            ], {
                duration: PAGE_MORPH_DURATION_MS * 0.55,
                easing: 'ease-out',
                fill: 'forwards'
            })

            void Promise.all([
                morphAnimation.finished,
                exitAnimationsFinishedRef.current
            ])
                .then(() => {
                    navigate(openingProject.path, {
                        state: { fromHome: true, layoutIndex }
                    })
                })
                .catch(() => undefined)

            return () => {
                morphAnimation.cancel()
                coverAnimation?.cancel()
            }
        }

        if (!closingProjectId) return
        const target = blockRefs.current[closingProjectId]
        if (!target || reducedMotion) {
            setClosingProjectId(null)
            if (target) {
                window.requestAnimationFrame(() => target.focus({ preventScroll: true }))
            }
            return
        }

        const targetRect = target.getBoundingClientRect()
        const targetRadii = readCornerRadii(target)
        const morphAnimation = overlay.animate([
            {
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                height: `${window.innerHeight}px`,
                left: '0px',
                top: '0px',
                width: `${window.innerWidth}px`
            },
            {
                borderBottomLeftRadius: targetRadii.bottomLeft,
                borderBottomRightRadius: targetRadii.bottomRight,
                borderTopLeftRadius: targetRadii.topLeft,
                borderTopRightRadius: targetRadii.topRight,
                height: `${targetRect.height}px`,
                left: `${targetRect.left}px`,
                top: `${targetRect.top}px`,
                width: `${targetRect.width}px`
            }
        ], {
            duration: PAGE_MORPH_DURATION_MS,
            easing: PAGE_MORPH_EASING,
            fill: 'forwards'
        })

        void Promise.all([
            morphAnimation.finished,
            entranceAnimationsFinishedRef.current
        ])
            .then(() => {
                setClosingProjectId(null)
                window.requestAnimationFrame(() => target.focus({ preventScroll: true }))
            })
            .catch(() => undefined)
        return () => morphAnimation.cancel()
    }, [ closingProjectId, layoutIndex, navigate, openingProject, reducedMotion ])

    const layout = LAYOUTS[layoutIndex]

    const positionTooltip = (event: ReactPointerEvent<HTMLAnchorElement>) => {
        const tooltip = tooltipRef.current
        if (!tooltip) return

        const gap = 14
        const pagePadding = 12
        const left = Math.min(
            event.clientX + gap,
            window.innerWidth - tooltip.offsetWidth - pagePadding
        )
        const top = Math.min(
            event.clientY + gap,
            window.innerHeight - tooltip.offsetHeight - pagePadding
        )

        tooltip.style.transform = `translate3d(${Math.max(pagePadding, left)}px, ${Math.max(pagePadding, top)}px, 0)`
    }

    const showTooltip = (
        event: ReactPointerEvent<HTMLAnchorElement>,
        label: string
    ) => {
        setActiveProjectLabel(label)
        positionTooltip(event)
        window.requestAnimationFrame(() => positionTooltip(event))
    }

    const openProject = (
        event: ReactMouseEvent<HTMLAnchorElement>,
        project: (typeof PROJECTS)[number]
    ) => {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) return

        event.preventDefault()
        syncBrowserThemeColor(project.color)
        setActiveProjectLabel(null)
        const target = event.currentTarget
        const rect = target.getBoundingClientRect()
        const coverOpacity = Number.parseFloat(
            window.getComputedStyle(target, '::before').opacity
        )

        setOpeningProject({
            coverOpacity: Number.isFinite(coverOpacity) ? coverOpacity : 0,
            id: project.id,
            path: project.path,
            radii: readCornerRadii(target),
            rect: {
                height: rect.height,
                left: rect.left,
                top: rect.top,
                width: rect.width
            }
        })
    }

    const transitionProjectId = openingProject?.id ?? closingProjectId
    const transitionStyle: CSSProperties | undefined = openingProject
        ? {
            borderBottomLeftRadius: openingProject.radii.bottomLeft,
            borderBottomRightRadius: openingProject.radii.bottomRight,
            borderTopLeftRadius: openingProject.radii.topLeft,
            borderTopRightRadius: openingProject.radii.topRight,
            height: openingProject.rect.height,
            left: openingProject.rect.left,
            top: openingProject.rect.top,
            width: openingProject.rect.width
        }
        : closingProjectId
            ? {
                borderRadius: 0,
                height: '100vh',
                left: 0,
                top: 0,
                width: '100vw'
            }
            : undefined
    const transitionCoverStyle: CSSProperties | undefined = openingProject
        ? {
            borderBottomLeftRadius: openingProject.radii.bottomLeft,
            borderBottomRightRadius: openingProject.radii.bottomRight,
            borderTopLeftRadius: openingProject.radii.topLeft,
            borderTopRightRadius: openingProject.radii.topRight,
            height: openingProject.rect.height,
            left: openingProject.rect.left,
            opacity: openingProject.coverOpacity,
            top: openingProject.rect.top,
            width: openingProject.rect.width
        }
        : undefined

    return (
        <nav
            aria-label="Selected projects"
            className="project-blocks"
            data-mobile={mobileLayout}
            data-transitioning={openingProject !== null || closingProjectId !== null}
            inert={openingProject !== null || closingProjectId !== null}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setInteractionPaused(false)
                }
            }}
            onFocus={() => setInteractionPaused(true)}
        >
            <ul className="project-block-list">
                {PROJECTS.map((project) => (
                    <li className="project-block-list__item" key={project.id}>
                        <Link
                            className={`project-block project-theme--${project.id}`}
                            data-closing={closingProjectId === project.id}
                            data-opening={openingProject?.id === project.id}
                            onPointerEnter={mobileLayout
                                ? undefined
                                : (event) => showTooltip(event, project.label)}
                            onPointerLeave={mobileLayout
                                ? undefined
                                : () => setActiveProjectLabel(null)}
                            onPointerMove={mobileLayout ? undefined : positionTooltip}
                            onClick={(event) => openProject(event, project)}
                            ref={(element) => {
                                blockRefs.current[project.id] = element
                            }}
                            style={layout[project.id][mobileLayout ? 'mobile' : 'desktop'] satisfies CSSProperties}
                            to={project.path}
                        >
                            <span className="sr-only">{project.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div
                aria-hidden="true"
                className="project-tooltip"
                data-visible={activeProjectLabel !== null}
                ref={tooltipRef}
            >
                {activeProjectLabel}
            </div>
            {transitionProjectId && (
                <>
                    <div
                        aria-hidden="true"
                        className={`project-transition-overlay project-theme--${transitionProjectId}`}
                        ref={overlayRef}
                        style={transitionStyle}
                    />
                    {openingProject && (
                        <div
                            aria-hidden="true"
                            className={`project-transition-cover project-theme--${transitionProjectId}`}
                            ref={overlayCoverRef}
                            style={transitionCoverStyle}
                        />
                    )}
                </>
            )}
        </nav>
    )
}
