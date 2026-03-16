import { defineField, defineType } from 'sanity'
import { ParagraphIcon } from '@navikt/aksel-icons'

export default defineType({
    name: 'avgjorelseskode',
    title: 'Avgjørelseskode',
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
