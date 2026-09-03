import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { syncBrowserThemeColor } from './browserTheme'

const SITE_ORIGIN = 'https://dreta.dev'
const SITE_NAME = 'Lin Donglai'
const SITE_DESCRIPTION = 'Portfolio of Lin Donglai, a developer and accessibility advocate building inclusive technology through student platforms and research projects.'
const PERSON_ID = `${SITE_ORIGIN}/#person`
const WEBSITE_ID = `${SITE_ORIGIN}/#website`

type SeoProps = {
    title: string
    description: string
    image?: string
    imageAlt?: string
    ogType?: 'article' | 'profile' | 'website'
    path?: string
    noIndex?: boolean
    themeColor?: string
}

export function Seo({
    title,
    description,
    image,
    imageAlt,
    ogType = 'website',
    path,
    noIndex = false,
    themeColor = '#ffffff'
}: SeoProps) {
    const location = useLocation()
    const canonicalUrl = path ? new URL(path, SITE_ORIGIN).href : undefined
    const pageUrl = new URL(path ?? location.pathname, SITE_ORIGIN).href
    const imageUrl = image ? new URL(image, SITE_ORIGIN).href : undefined
    const robots = noIndex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': PERSON_ID,
                name: SITE_NAME,
                url: `${SITE_ORIGIN}/`,
                description: SITE_DESCRIPTION,
                jobTitle: 'Developer and Accessibility Advocate',
                sameAs: [
                    'https://linkedin.com/in/lin-donglai',
                    'https://instagram.com/imdreta'
                ]
            },
            {
                '@type': 'WebSite',
                '@id': WEBSITE_ID,
                url: `${SITE_ORIGIN}/`,
                name: `${SITE_NAME} Portfolio`,
                description: SITE_DESCRIPTION,
                inLanguage: 'en-US',
                creator: { '@id': PERSON_ID }
            },
            {
                '@type': path === '/' ? 'ProfilePage' : 'WebPage',
                '@id': `${pageUrl}#webpage`,
                url: pageUrl,
                name: title,
                description,
                inLanguage: 'en-US',
                isPartOf: { '@id': WEBSITE_ID },
                author: { '@id': PERSON_ID },
                ...(path === '/' ? { mainEntity: { '@id': PERSON_ID } } : {}),
                ...(imageUrl ? {
                    primaryImageOfPage: {
                        '@type': 'ImageObject',
                        url: imageUrl,
                        ...(imageAlt ? { caption: imageAlt } : {})
                    }
                } : {})
            }
        ]
    }
    const serializedStructuredData = JSON.stringify(structuredData).replaceAll('<', '\\u003c')

    useEffect(() => {
        syncBrowserThemeColor(themeColor)
    }, [ themeColor ])

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="robots" content={robots}/>
            <meta name="theme-color" content={themeColor}/>

            <meta property="og:type" content={ogType}/>
            <meta property="og:site_name" content={SITE_NAME}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:url" content={pageUrl}/>
            {ogType === 'profile' && <meta property="profile:first_name" content="Lin"/>}
            {ogType === 'profile' && <meta property="profile:last_name" content="Donglai"/>}
            {imageUrl && <meta property="og:image" content={imageUrl}/>}
            {imageUrl && imageAlt && <meta property="og:image:alt" content={imageAlt}/>}

            <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'}/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            {imageUrl && <meta name="twitter:image" content={imageUrl}/>}
            {imageUrl && imageAlt && <meta name="twitter:image:alt" content={imageAlt}/>}

            {canonicalUrl && (
                <link rel="canonical" href={canonicalUrl}/>
            )}

            {!noIndex && (
                <script
                    id="seo-structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
                />
            )}
        </>
    )
}
