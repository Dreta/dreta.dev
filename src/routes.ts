import {
    index,
    layout,
    route,
    type RouteConfig
} from '@react-router/dev/routes'

export default [
    layout('./routes/RootLayout.tsx', [
        index('./routes/HomePage.tsx'),
        route('activities-verification', './routes/ActivitiesVerificationPage.tsx'),
        route('projects/:projectId', './routes/ProjectPage.tsx'),
        route('*', './routes/NotFoundPage.tsx')
    ])
] satisfies RouteConfig
