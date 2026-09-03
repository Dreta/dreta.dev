export const PROJECT_IDS = [
    'orinav',
    'a11ylab',
    'webartistry',
    'whale',
    'helium',
    'himcm',
    'pioneer'
] as const

export type ProjectId = (typeof PROJECT_IDS)[number]

export const PROJECT_PATHS = PROJECT_IDS.map((projectId) =>
    `/projects/${projectId}`
)
