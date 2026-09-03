export function syncBrowserThemeColor(color: string) {
    if (typeof document === 'undefined') return

    const themeColorMeta = document.head.querySelectorAll<HTMLMetaElement>(
        'meta[name="theme-color"]'
    )

    if (themeColorMeta.length === 0) {
        const meta = document.createElement('meta')
        meta.name = 'theme-color'
        meta.content = color
        document.head.append(meta)
    } else {
        themeColorMeta.forEach((meta) => {
            meta.content = color
        })
    }

    document.documentElement.style.backgroundColor = color
    document.body.style.backgroundColor = color
}
