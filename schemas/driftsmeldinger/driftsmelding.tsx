import {
    CheckmarkCircleFillIcon,
    ExclamationmarkTriangleFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons'
import { defineField, defineType } from 'sanity'
import '../../styles/globals.css'

export default defineType({
    name: 'driftsmelding',
    title: 'Driftsmelding',
    type: 'document',
    fields: [
        defineField({
            name: 'lost',
            title: 'Er problemet løst?',
            type: 'string',
            options: {
                list: [
                    { title: 'Nei', value: 'false' },
                    { title: 'Ja', value: 'true' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            description: 'Velg om driftsmeldingen skal settes til løst (grønn)',
            initialValue: 'false',
        }),

        defineField({
            name: 'konsekvens',
            title: 'Konsekvens',
            type: 'string',
            options: {
                layout: 'radio',
                list: [
                    { title: 'Treghet i speil', value: 'treghet' },
                    { title: 'Delvis mulig å saksbehandle i speil', value: 'delvisMulig' },
                    { title: 'Ikke mulig å saksbehandle i speil', value: 'ikkeMulig' },
                ],
            },
            description: 'Hvilken konsekvens har feilen?',
            validation: (Rule) => Rule.required().error('Konsekvens kan ikke være tom'),
        }),
        defineField({
            name: 'arsak',
            title: 'Årsak',
            type: 'string',
            description: 'Hva skyldes feilen?',
            validation: (Rule) => Rule.required().error('Årsak kan ikke være tom'),
        }),
        defineField({
            name: 'tiltak',
            title: 'Tiltak',
            type: 'string',
            description: 'Hvilke tiltak blir gjort for å rette feilen?',
            validation: (Rule) => Rule.required().error('Tiltak kan ikke være tom'),
        }),
        defineField({
            name: 'oppdatering',
            title: 'Oppdatering',
            type: 'string',
            description: 'Oppdatering med status på problemet',
        }),
        defineField({
            name: 'cta',
            title: 'Hva kan jobbes med?',
            type: 'string',
            description: 'Hva kan saksbehandler jobbe med mens det er nedetid?',
        }),
        defineField({
            name: 'iDev',
            title: 'Vis i dev?',
            type: 'string',
            options: {
                list: [
                    { title: 'Nei', value: 'false' },
                    { title: 'Ja', value: 'true' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            description: 'Velg om driftsmeldingen skal være synlig i dev',
            initialValue: 'false',
        }),
        defineField({
            name: 'iProd',
            title: 'Vis i prod?',
            type: 'string',
            options: {
                list: [
                    { title: 'Nei', value: 'false' },
                    { title: 'Ja', value: 'true' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            description: 'Velg om driftsmeldingen skal være synlig for saksbehandlere i prod',
            initialValue: 'true',
        }),
    ],
    preview: {
        select: {
            lost: 'lost',
            konsekvens: 'konsekvens',
        },
        prepare({ lost, konsekvens }) {
            const konsekvensTekster: Record<string, string> = {
                treghet: 'Treghet i speil',
                delvisMulig: 'Delvis mulig å saksbehandle i speil',
                ikkeMulig: 'Ikke mulig å saksbehandle i speil',
            }

            let media
            if (lost === 'true') {
                media = <CheckmarkCircleFillIcon />
            } else if (konsekvens === 'ikkeMulig') {
                media = <XMarkOctagonFillIcon />
            } else if (konsekvens === 'delvisMulig') {
                media = <ExclamationmarkTriangleFillIcon />
            } else if (konsekvens === 'treghet') {
                media = <ExclamationmarkTriangleFillIcon />
            }

            return {
                title: konsekvensTekster[konsekvens] ?? 'Ingen konsekvens valgt',
                subtitle: lost === 'true' ? 'Løst' : konsekvensTekster[konsekvens],
                media,
            }
        },
    },
})
