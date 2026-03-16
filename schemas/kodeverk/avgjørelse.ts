import { defineField, defineType } from 'sanity'
import { GavelIcon } from '@navikt/aksel-icons'

export default defineType({
    name: 'avgjorelse',
    title: 'Avgjørelse',
    type: 'document',
    icon: GavelIcon,
    fields: [
        {
            name: 'kode',
            title: 'Kode',
            type: 'reference',
            to: [{ type: 'avgjorelseskode' }],
            validation: (Rule) => Rule.required(),
        },
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Inngangsvilkår', value: 'inngangsvilkar' },
                    { title: 'Avslag', value: 'avslag' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
        }),
        {
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'alternativer',
            title: 'Alternativer',
            type: 'array',
            of: [{ type: 'muligVurdering' }],
        },
    ],
})
