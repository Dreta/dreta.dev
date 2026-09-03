import { useEffect, useRef } from 'react'
import verificationBody from '../content/activities-verification.html?raw'
import { paths } from '../paths'
import { Seo } from '../Seo'

export default function ActivitiesVerificationPage() {
    const articleRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const heading = articleRef.current?.querySelector<HTMLHeadingElement>('h1')
        if (!heading) return

        heading.tabIndex = -1
        heading.focus({ preventScroll: true })
    }, [])

    return (
        <div className="verification-page">
            <Seo
                title="Activities Verification — Lin Donglai"
                description="Review public sources and verification guidance for the activities, projects, research, and awards reported in Lin Donglai’s college applications."
                path={paths.activitiesVerification}
                themeColor="#ffffff"
            />
            <article
                aria-label="Activities verification for Lin Donglai"
                className="verification-page__content"
                dangerouslySetInnerHTML={{ __html: verificationBody }}
                ref={articleRef}
            />
        </div>
    )
}
