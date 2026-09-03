import type { Config } from '@react-router/dev/config'
import { PROJECT_PATHS } from './src/projectRoutes.js'

export default {
    appDirectory: 'src',
    ssr: false,
    prerender({ getStaticPaths }) {
        return [
            ...getStaticPaths(),
            ...PROJECT_PATHS
        ]
    }
} satisfies Config
