import { createAuthStore, defineConfig, DocumentActionsContext } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './deskStructure'
import { theme } from 'https://themer.sanity.build/api/hues?preset=pixel-art&default=9b4b75;600;lightest:fff0fe;darkest:291929&primary=darkest:352230&transparent=9d537a;600;darkest:2e1f29'
import { tags } from 'sanity-plugin-tags'

export default defineConfig({
    name: 'default',
    title: 'Spalten',
    theme,

    projectId: 'z9kr8ddn',
    dataset: 'production',

    plugins: [structureTool({ structure: deskStructure }), visionTool(), tags({})],

    schema: {
        types: schemaTypes,
        templates: (prev) => [
            ...prev,
            {
                id: 'skjonnsfastsettelse-template',
                title: 'Skjønnsfastsettelse template',
                schemaType: 'skjonnsfastsettelseMal',
                value: (params: any) => ({
                    lovhjemmel: {
                        paragraf: params?.lovhjemmel?.paragraf ?? '8-30',
                        ledd: params.lovhjemmel?.ledd,
                        lovverk: params?.lovhjemmel?.lovverk ?? 'folketrygdloven',
                        lovverksversjon: params?.lovhjemmel?.lovverksversjon ?? '2019-01-01',
                    },
                    arbeidsforholdMal: params.arbeidsforholdMal,
                }),
            },
        ],
    },
    document: {
        actions: (prev: any, context: DocumentActionsContext) => {
            return context.schemaType === 'skjonnsfastsettelseMal'
                ? prev.filter(
                      (obj: any) => obj.action === 'publish' || obj.action === 'discardChanges',
                  )
                : prev
        },
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
