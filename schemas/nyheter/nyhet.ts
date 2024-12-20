import { defineField, defineType } from 'sanity'
import { nyhetsslide } from './nyhetsslide'

export default defineType({
    name: 'nyhet',
    title: 'Nyhet: Oversikten',
    type: 'document',
    fields: [
        defineField({
            name: 'tittel',
            title: 'Tittel på nyhet',
            type: 'string',
            validation: (Rule) => Rule.required().min(2).max(200),
        }),
        defineField({
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'customPortableText',
            description:
                'Kort forklaring av hvilke endringer som er gjort, og hvordan disse påvirker saksbehandler',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'iProd',
            title: 'Publisert',
            description:
                'Når denne er på vil nyheten være tilgjengelig for saksbehandlerene i prod',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'dato',
            title: 'Lanseringsdato',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'lenke',
            title: 'Lenke til mer informasjon',
            type: 'object',
            fields: [
                defineField({
                    name: 'lenkeTekst',
                    title: 'Lenketekst',
                    type: 'string',
                }),
                defineField({
                    name: 'lenkeUrl',
                    title: 'Lenke',
                    type: 'url',
                }),
            ],
        }),
        defineField({
            name: 'modal',
            title: 'Se hvordan-modal',
            type: 'object',
            fields: [
                defineField({
                    name: 'antallSlides',
                    title: 'Antall modal slides',
                    type: 'number',
                    initialValue: 0,
                    validation: (Rule) => Rule.required().min(0).max(3),
                }),
                defineField({
                    name: 'tvungenModal',
                    title: 'Tvungen modal – dette tvinger modalen til å vises uten at brukeren klikker inn på endringsloggen',
                    type: 'boolean',
                    initialValue: false,
                    hidden: ({ parent }) =>
                        parent?.antallSlides === undefined || parent?.antallSlides <= 0,
                }),
                defineField({
                    name: 'modalOverskrift',
                    type: 'string',
                    title: 'Modaloverskrift',
                    hidden: ({ parent }) =>
                        parent?.antallSlides === undefined || parent?.antallSlides <= 0,
                }),
                nyhetsslide(1),
                nyhetsslide(2),
                nyhetsslide(3),
            ],
        }),
    ],
    orderings: [
        {
            name: 'releaseDateDesc',
            title: 'Lanseringsdato',
            by: [{ field: 'dato', direction: 'desc' }],
        },
    ],
})
