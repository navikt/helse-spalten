import {
    CheckmarkCircleFillIcon,
    ExclamationmarkTriangleFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons'
import { defineField, defineType } from 'sanity'
import { Driftsstatus, gjeldendeKonsekvens, konsekvensTekster, validerStatuser } from './driftsstatusUtils'
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
            name: 'statuser',
            title: 'Statuser',
            type: 'array',
            of: [{ type: 'driftsstatus' }],
            description:
                'Den første statusen beskriver driftsmeldingen i sin helhet. I senere statuser fyller du kun ut det som har endret seg — speil viser den nyeste statusen øverst og resten som logg under «Tidligere statuser».',
            options: {
                sortable: false,
                disableActions: ['addBefore', 'duplicate'],
            },
            validation: (Rule) => [
                Rule.required().min(1).error('Driftsmeldingen må ha minst én status'),
                Rule.custom(validerStatuser),
            ],
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
            statuser: 'statuser',
        },
        prepare({ lost, statuser }: { lost?: string; statuser?: Driftsstatus[] }) {
            const konsekvens = gjeldendeKonsekvens(statuser)

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

            const konsekvensTekst = konsekvensTekster[konsekvens ?? ''] ?? 'Ingen konsekvens valgt'

            return {
                title: konsekvensTekst,
                subtitle: lost === 'true' ? 'Løst' : konsekvensTekst,
                media,
            }
        },
    },
})
