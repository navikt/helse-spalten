import { createAuthStore, defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './deskStructure'

export default defineConfig({
    name: 'default',
    title: 'Speilblogg',

    projectId: 'z9kr8ddn',
    dataset: 'production',

    plugins: [structureTool({ structure: deskStructure }), visionTool()],

    schema: {
        types: schemaTypes,
    },
    auth: createAuthStore({
        projectId: 'z9kr8ddn',
        dataset: `production`,
        redirectOnSingle: true,
        providers: () => [
            {
                name: 'saml',
                title: 'NAV SSO',
                url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/f3270b37',
                logo: '/static/navlogo.svg',
            },
        ],
    }),
})
