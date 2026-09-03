import { Outlet, useLocation } from 'react-router'
import { CursorTrail } from '../components/CursorTrail'
import { useMobileLayout } from '../mobile'
import { paths } from '../paths'
import { PROJECTS } from '../projects'

export default function RootLayout() {
    const mobileLayout = useMobileLayout()
    const location = useLocation()
    const project = PROJECTS.find((candidate) => candidate.path === location.pathname)
    const pageName = location.pathname === paths.home
        ? 'Lin Donglai home'
        : location.pathname === paths.activitiesVerification
            ? 'Activities verification'
            : project?.label ?? 'Page not found'

    return (
        <div className="site-shell" data-mobile={mobileLayout}>
            <a className="sr-only" href="#main-content">
                Skip to main content
            </a>
            <main id="main-content" tabIndex={-1}>
                <Outlet/>
            </main>
            <div aria-atomic="true" aria-live="polite" className="sr-only">
                {pageName} page loaded
            </div>
            <CursorTrail/>
        </div>
    )
}
