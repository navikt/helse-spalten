import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    api: {
        projectId: 'z9kr8ddn',
        dataset: 'production',
    },
    graphql: [
        {
            playground: true,
            tag: 'experiment',
            id: 'schema-experiment',
        },
    ],
})
