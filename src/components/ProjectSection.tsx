import type { CSSProperties, RefObject } from 'react'
import type {
    ProjectImage,
    ProjectSection as ProjectSectionData
} from '../projects'

type ProjectSectionProps = {
    section: ProjectSectionData
    titleRef?: RefObject<HTMLHeadingElement | null>
}

type ProjectMediaProps = {
    className?: string
    image: ProjectImage
    revealIndex?: number
}

const revealStyle = (revealIndex: number): CSSProperties => ({
    animationDelay: `${revealIndex * 90}ms`
})

function ProjectMedia({
    className = '',
    image,
    revealIndex = 0
}: ProjectMediaProps) {
    const mediaClassName = `project-section__media project-section__reveal ${className}`.trim()
    const position = image.position ?? 'center center'

    if (image.kind === 'project-cover') {
        return (
            <div
                aria-label={image.alt}
                className={`${mediaClassName} project-section__media--cover`}
                role="img"
                style={{
                    ...revealStyle(revealIndex),
                    backgroundPosition: position
                }}
            />
        )
    }

    return (
        <img
            alt={image.alt}
            className={mediaClassName}
            src={image.src}
            style={{
                ...revealStyle(revealIndex),
                objectPosition: position
            }}
        />
    )
}

function ProjectCopy({
    body,
    heading,
    headingId,
    revealIndex = 0
}: {
    body: readonly string[]
    heading?: string
    headingId?: string
    revealIndex?: number
}) {
    return (
        <div
            className="project-section__copy project-section__reveal"
            style={revealStyle(revealIndex)}
        >
            {heading && (
                <h2 className="project-section__heading" id={headingId}>
                    {heading}
                </h2>
            )}
            {body.map((paragraph, index) => (
                <p className="project-section__paragraph" key={index}>
                    {paragraph}
                </p>
            ))}
        </div>
    )
}

function ProjectImageGrid({
    images,
    revealIndex = 0
}: {
    images: readonly ProjectImage[]
    revealIndex?: number
}) {
    return (
        <div className="project-section__image-grid">
            {images.map((image, index) => (
                <ProjectMedia
                    image={image}
                    key={index}
                    revealIndex={revealIndex + index}
                />
            ))}
        </div>
    )
}

function ProjectPhoneImageGrid({
    images,
    revealIndex = 0
}: {
    images: readonly ProjectImage[]
    revealIndex?: number
}) {
    return (
        <div className="project-section__phone-image-grid">
            {images.map((image, index) => (
                <ProjectMedia
                    className="project-section__phone-media"
                    image={image}
                    key={index}
                    revealIndex={revealIndex + index}
                />
            ))}
        </div>
    )
}

export function ProjectSection({ section, titleRef }: ProjectSectionProps) {
    const headingId = `${section.id}-heading`

    switch (section.type) {
        case 'title':
            return (
                <section
                    aria-labelledby={headingId}
                    className="project-page__panel project-page__panel--intro"
                    data-reveal-section="true"
                >
                    {section.breadcrumb && (
                        <nav
                            aria-label="Breadcrumb"
                            className="project-section__breadcrumb project-section__reveal"
                            style={revealStyle(0)}
                        >
                            <ol>
                                {section.breadcrumb.map((item, index) => (
                                    <li key={`${item.label}-${index}`}>
                                        {item.href
                                            ? <a href={item.href}>{item.label}</a>
                                            : <span>{item.label}</span>}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    )}
                    {section.eyebrow && (
                        <p
                            className="project-page__eyebrow project-section__reveal"
                            style={revealStyle(section.breadcrumb ? 1 : 0)}
                        >
                            {section.eyebrow}
                        </p>
                    )}
                    <h1
                        className="project-page__title project-section__reveal"
                        id={headingId}
                        ref={titleRef}
                        style={revealStyle(
                            (section.breadcrumb ? 1 : 0) + (section.eyebrow ? 1 : 0)
                        )}
                        tabIndex={-1}
                    >
                        {section.title}
                    </h1>
                </section>
            )

        case 'text-image':
            return (
                <section
                    aria-label={section.heading ? undefined : 'Project overview with image'}
                    aria-labelledby={section.heading ? headingId : undefined}
                    className="project-page__panel project-page__panel--text-image"
                    data-image-position={section.imagePosition ?? 'right'}
                    data-reveal-section="true"
                >
                    <ProjectCopy
                        body={section.body}
                        heading={section.heading}
                        headingId={headingId}
                        revealIndex={section.imagePosition === 'left' ? 1 : 0}
                    />
                    <ProjectMedia
                        image={section.image}
                        revealIndex={section.imagePosition === 'left' ? 0 : 1}
                    />
                </section>
            )

        case 'text':
            return (
                <section
                    aria-label={section.heading ? undefined : 'Project text'}
                    aria-labelledby={section.heading ? headingId : undefined}
                    className="project-page__panel project-page__panel--text"
                    data-alignment={section.alignment ?? 'left'}
                    data-reveal-section="true"
                >
                    <ProjectCopy
                        body={section.body}
                        heading={section.heading}
                        headingId={headingId}
                    />
                </section>
            )

        case 'image':
            return (
                <section
                    aria-label="Project image"
                    className="project-page__panel project-page__panel--image"
                    data-reveal-section="true"
                >
                    <ProjectMedia image={section.image}/>
                </section>
            )

        case 'image-grid':
            return (
                <section
                    aria-label="Project image gallery"
                    className="project-page__panel project-page__panel--image-grid"
                    data-reveal-section="true"
                >
                    <ProjectImageGrid images={section.images}/>
                </section>
            )

        case 'text-image-grid':
            return (
                <section
                    aria-label={section.heading ? undefined : 'Project details with image gallery'}
                    aria-labelledby={section.heading ? headingId : undefined}
                    className="project-page__panel project-page__panel--text-image-grid"
                    data-reveal-section="true"
                >
                    <ProjectCopy
                        body={section.body}
                        heading={section.heading}
                        headingId={headingId}
                    />
                    <ProjectImageGrid images={section.images} revealIndex={1}/>
                </section>
            )

        case 'phone-image-grid':
            return (
                <section
                    aria-label="Mobile interface gallery"
                    className="project-page__panel project-page__panel--phone-image-grid"
                    data-reveal-section="true"
                >
                    <ProjectPhoneImageGrid images={section.images}/>
                </section>
            )

        case 'text-phone-image-grid':
            return (
                <section
                    aria-label={section.heading ? undefined : 'Project details with mobile interface gallery'}
                    aria-labelledby={section.heading ? headingId : undefined}
                    className="project-page__panel project-page__panel--text-phone-image-grid"
                    data-reveal-section="true"
                >
                    <ProjectCopy
                        body={section.body}
                        heading={section.heading}
                        headingId={headingId}
                    />
                    <ProjectPhoneImageGrid images={section.images} revealIndex={1}/>
                </section>
            )

        case 'statistics-grid':
            return (
                <section
                    aria-label="Project statistics"
                    className="project-page__panel project-page__panel--statistics-grid"
                    data-reveal-section="true"
                >
                    <dl className="project-section__statistics-grid">
                        {section.items.map((item, index) => (
                            <div
                                className="project-section__statistic-item project-section__reveal"
                                key={`${item.value}-${item.description}`}
                                style={revealStyle(index)}
                            >
                                <dt className="project-section__statistic-value">
                                    {item.value}
                                </dt>
                                <dd className="project-section__statistic-description">
                                    {item.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )

        case 'small-text':
            return (
                <section
                    aria-label="Additional project information"
                    className="project-page__panel project-page__panel--small-text"
                    data-reveal-section="true"
                >
                    <p
                        className="project-section__small-text project-section__reveal"
                        id={`${section.id}-description`}
                        style={revealStyle(0)}
                    >
                        {section.text}
                    </p>
                    {section.button && (
                        <a
                            aria-describedby={`${section.id}-description`}
                            className="home-header__button home-header__button--pill project-section__small-text-action project-section__reveal"
                            href={section.button.href}
                            style={revealStyle(1)}
                        >
                            {section.button.label}
                        </a>
                    )}
                </section>
            )
    }
}
