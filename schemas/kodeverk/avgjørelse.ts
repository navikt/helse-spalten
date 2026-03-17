import { defineField, defineType } from 'sanity'
import { GavelIcon, ParagraphIcon } from '@navikt/aksel-icons'

export const avgjørelse = defineType({
    name: 'avgjorelse',
    title: 'Avgjørelse',
    type: 'document',
    icon: GavelIcon,
    fields: [
        {
            name: 'kode',
            title: 'Kode',
            type: 'reference',
            to: [{ type: 'avgjorelse.kode' }],
            validation: (Rule) => Rule.required(),
        },
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
            of: [{ type: 'avgjorelse.alternativ' }],
        },
    ],
})

export const avgjørelsealternativ = defineType({
    name: 'avgjorelse.alternativ',
    title: 'Alternativ',
    type: 'document',
    icon: ParagraphIcon,
    fields: [
        {
            name: 'kode',
            title: 'Kode',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
    ],
})

export const avgjørelseskode = defineType({
    name: 'avgjorelse.kode',
    title: 'Kode',
    type: 'document',
    icon: ParagraphIcon,
    fields: [
        defineField({
            name: 'kode',
            title: 'Kode',
            type: 'string',
            validation: (Rule) => Rule.required().error('Kode kan ikke være tom'),
        }),
    ],
})
