import {
    type TouchEvent as ReactTouchEvent,
    type WheelEvent as ReactWheelEvent,
    useCallback,
    useEffect,
    useRef
} from 'react'
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams
} from 'react-router'
import { syncBrowserThemeColor } from '../browserTheme'
import { ProjectSection } from '../components/ProjectSection'
import { useMobileLayout } from '../mobile'
import { paths } from '../paths'
import { PROJECTS } from '../projects'
import { Seo } from '../Seo'

type ProjectLocationState = {
    layoutIndex?: number
}

const SHORT_EXIT_BUFFER = 'clamp(5rem, 7vw, 8rem)'
const LONG_EXIT_BUFFER = 'clamp(12rem, 20vw, 22rem)'

export default function ProjectPage() {
    const { projectId } = useParams()
    const project = PROJECTS.find((candidate) => candidate.id === projectId)
    const location = useLocation()
    const navigate = useNavigate()
    const scrollerRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const touchStartPositionRef = useRef<number | null>(null)
    const exitingRef = useRef(false)
    const locationState = location.state as ProjectLocationState | null
    const mobileLayout = useMobileLayout()

    const exitProject = useCallback(() => {
        if (exitingRef.current) return
        exitingRef.current = true
        syncBrowserThemeColor('#ffffff')

        navigate(paths.home, {
            replace: true,
            state: {
                closingProjectId: project?.id,
                layoutIndex: locationState?.layoutIndex
            }
        })
    }, [ locationState?.layoutIndex, navigate, project?.id ])

    useEffect(() => {
        headingRef.current?.focus({ preventScroll: true })

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return
            event.preventDefault()
            exitProject()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [ exitProject ])

    useEffect(() => {
        const scroller = scrollerRef.current
        if (!scroller) return

        const sections = Array.from(
            scroller.querySelectorAll<HTMLElement>('[data-reveal-section="true"]')
        )
        const revealSection = (section: HTMLElement) => {
            section.dataset.revealVisible = 'true'
        }

        if (!('IntersectionObserver' in window)) {
            sections.forEach(revealSection)
            return
        }

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting || entry.intersectionRatio < 0.35) continue
                revealSection(entry.target as HTMLElement)
                observer.unobserve(entry.target)
            }
        }, {
            root: scroller,
            threshold: [ 0.35 ]
        })

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [ projectId ])

    if (!project) return <Navigate replace to={paths.home}/>

    const finalSection = project.sections[project.sections.length - 1]
    const exitBuffer = finalSection?.type === 'small-text'
        ? SHORT_EXIT_BUFFER
        : LONG_EXIT_BUFFER
    const titleSection = project.sections.find((section) => section.type === 'title')
    const projectTitleId = titleSection
        ? `${titleSection.id}-heading`
        : undefined

    const handleScroll = () => {
        const scroller = scrollerRef.current
        if (!scroller || exitingRef.current) return

        const scrollPosition = mobileLayout ? scroller.scrollTop : scroller.scrollLeft
        const maximumScroll = mobileLayout
            ? scroller.scrollHeight - scroller.clientHeight
            : scroller.scrollWidth - scroller.clientWidth
        if (
            scrollPosition < 0 ||
            (maximumScroll > 0 && scrollPosition >= maximumScroll - 1)
        ) {
            exitProject()
        }
    }

    const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
        const scroller = scrollerRef.current
        if (!scroller || exitingRef.current) return

        const scrollPosition = mobileLayout ? scroller.scrollTop : scroller.scrollLeft
        const maximumScroll = mobileLayout
            ? scroller.scrollHeight - scroller.clientHeight
            : scroller.scrollWidth - scroller.clientWidth
        const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
            ? event.deltaY
            : event.deltaX

        if (
            (scrollPosition <= 0 && delta < 0) ||
            (scrollPosition >= maximumScroll - 1 && delta > 0)
        ) {
            event.preventDefault()
            exitProject()
            return
        }

        if (!mobileLayout && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault()
            scroller.scrollLeft += event.deltaY
        } else if (mobileLayout && Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
            event.preventDefault()
            scroller.scrollTop += event.deltaX
        }
    }

    const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
        const scroller = scrollerRef.current
        const atStart = scroller && (
            mobileLayout ? scroller.scrollTop <= 0 : scroller.scrollLeft <= 0
        )
        touchStartPositionRef.current = atStart
            ? mobileLayout
                ? event.touches[0]?.clientY ?? null
                : event.touches[0]?.clientX ?? null
            : null
    }

    const handleTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
        const startPosition = touchStartPositionRef.current
        const currentPosition = mobileLayout
            ? event.touches[0]?.clientY
            : event.touches[0]?.clientX

        if (
            startPosition === null ||
            currentPosition === undefined ||
            currentPosition - startPosition < 48
        ) return
        touchStartPositionRef.current = null
        exitProject()
    }

    return (
        <article
            className={`project-page project-theme--${project.id}`}
            data-mobile={mobileLayout}>
            <Seo
                title={`${project.seo.title} — Lin Donglai`}
                description={project.seo.description}
                image={project.seo.image}
                imageAlt={`Cover image for ${project.label}`}
                ogType="article"
                path={project.path}
                themeColor={project.color}
            />
            <button className="sr-only" onClick={exitProject} type="button">
                Back to selected projects
            </button>
            <p className="sr-only" id="project-page-instructions">
                Scroll or use the arrow keys to move through the project sections.
                Press Escape to return to the selected projects.
            </p>
            <div
                aria-describedby="project-page-instructions"
                aria-label={projectTitleId ? undefined : `${project.label} project page`}
                aria-labelledby={projectTitleId}
                className="project-page__scroller"
                onScroll={handleScroll}
                onTouchMove={handleTouchMove}
                onTouchStart={handleTouchStart}
                onWheel={handleWheel}
                ref={scrollerRef}
                role="region"
                tabIndex={0}
            >
                <div
                    className="project-page__track"
                    style={mobileLayout
                        ? { width: '100%' }
                        : {
                            width: `calc(${project.sections.length * 100}vw + ${exitBuffer})`
                        }}
                >
                    {project.sections.map((section, index) => (
                        <ProjectSection
                            key={section.id}
                            section={section}
                            titleRef={index === 0 && section.type === 'title'
                                ? headingRef
                                : undefined}
                        />
                    ))}
                    <div
                        aria-hidden="true"
                        className="project-page__panel project-page__panel--exit"
                        style={{ flexBasis: exitBuffer }}
                    />
                </div>
            </div>
        </article>
    )
}
