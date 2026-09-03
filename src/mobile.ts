import { useEffect, useState } from 'react'

const MOBILE_USER_AGENT = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i

export function isMobileUserAgent() {
    if (typeof navigator === 'undefined') return false

    return MOBILE_USER_AGENT.test(navigator.userAgent) || (
        /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1
    )
}

export function useMobileLayout() {
    const [ mobileLayout, setMobileLayout ] = useState(() =>
        isMobileUserAgent() || (
            typeof window !== 'undefined' &&
            window.matchMedia('(max-width: 767px)').matches
        )
    )

    useEffect(() => {
        const narrowViewport = window.matchMedia('(max-width: 767px)')
        const updateLayout = () => {
            setMobileLayout(isMobileUserAgent() || narrowViewport.matches)
        }

        updateLayout()
        narrowViewport.addEventListener('change', updateLayout)

        return () => narrowViewport.removeEventListener('change', updateLayout)
    }, [])

    return mobileLayout
}
