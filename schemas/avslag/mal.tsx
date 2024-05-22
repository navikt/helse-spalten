import { defineField, defineType } from 'sanity'
import '../../styles/globals.css'

export default defineType({
    name: 'avslag',
    title: 'Avslag',
    type: 'document',
    initialValue: () => ({
        iProd: false,
    }),
    fields: [
        defineField({
            name: 'iProd',
            title: 'Tilgjengelig i prod',
            type: 'boolean',
            description: 'Når denne er på vil malen være tilgjengelig for saksbehandlerene i prod',
        }),
        defineField({
            name: 'tittel',
            title: 'Tittel',
            type: 'string',
        }),
        defineField({
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
        defineField({
            name: 'gjelderFor',
            title: 'Gjelder for',
            type: 'array',
            options: {
                list: [
                    { title: 'Avslag', value: 'AVSLAG' },
                    { title: 'Delvis innvilgelse', value: 'DELVIS_INNVILGELSE' },
                ],
            },
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required().error('må velge minst en av typene'),
        }),
    ],
})
