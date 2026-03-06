import { defineCliConfig } from 'sanity/cli'
import { DATASET } from './env'

export default defineCliConfig({
    api: {
        projectId: 'z9kr8ddn',
        dataset: DATASET,
    },
    graphql: [
        {
            playground: true,
            tag: 'experiment',
            id: 'schema-experiment',
        },
    ],
})
