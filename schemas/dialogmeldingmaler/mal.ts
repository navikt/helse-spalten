import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'dialogmeldingmal',
    title: 'Dialogmeldingmal',
    type: 'document',
    initialValue: () => ({
        iProd: false,
    }),
    fields: [
        defineField({
            name: 'iProd',
            title: 'Vis i prod?',
            type: 'boolean',
            description: 'Når denne er på vil malen være tilgjengelig for saksbehandlerne i prod',
        }),
        defineField({
            name: 'tittel',
            title: 'Tittel',
            type: 'string',
        }),
        defineField({
            name: 'tekst',
            title: 'Tekst',
            type: 'text',
        }),
    ],
})
