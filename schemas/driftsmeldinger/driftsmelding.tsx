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
            name: 'iProd',
            title: 'Publisert',
            type: 'boolean',
            description:
                'Når denne er på vil driftsmeldingen være synlig for saksbehandlerne i prod',
        }),
        defineField({
            name: 'solved',
            title: 'Fjerne fra utviklingsmiljø?',
            type: 'boolean',
            description:
                'Når denne er på vil driftsmeldingen fjernes fra utviklingsmiljøet for utviklerene',
        }),
        defineField({
            name: 'level',
            title: 'Nivå',
            type: 'string',
            options: {
                direction: 'horizontal',
                layout: 'radio',
                list: [
                    { title: 'Info', value: 'info' },
                    { title: 'Hendelse', value: 'warning' },
                    { title: 'Alvorlig hendelse', value: 'error' },
                    { title: 'Hendelse løst', value: 'success' },
                ],
            },
            validation: (Rule) => Rule.required().error('Level kan ikke være tom'),
        }),
        defineField({
            name: 'tittel',
            title: 'Tittel',
            type: 'string',
            description: 'Eksempel: Driftsforstyrrelse i Speil',
            validation: (Rule) => Rule.required().error('Tittel kan ikke være tom'),
        }),
        defineField({
            name: 'melding',
            title: 'Melding',
            type: 'text',
            description:
                'Mer utdypende om driftsmeldingen. Husk å skriv når det er forventet at problemet er løst.',
            validation: (Rule) => Rule.required().error('Melding kan ikke være tom'),
        }),
        defineField({
            name: 'opprettet',
            title: 'Driftsmelding opprettet',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required().error('Dato og tid kan ikke være tom'),
        }),
    ],
    preview: {
        select: {
            title: 'tittel',
            level: 'level',
        },
        prepare(selection) {
            const { level } = selection
            return {
                ...selection,
                subtitle: `Nivå: ${level}`,
                media:
                    level === 'grønn' ? (
                        <CheckmarkCircleFillIcon className={'text-green-300'} />
                    ) : level === 'gul' ? (
                        <ExclamationmarkTriangleFillIcon className={'text-orange-300'} />
                    ) : (
                        <XMarkOctagonFillIcon className={'text-red-300'} />
                    ),
            }
        },
    },
})
