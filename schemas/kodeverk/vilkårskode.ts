import { defineField, defineType } from 'sanity'
import { ParagraphIcon } from '@navikt/aksel-icons'

export default defineType({
    name: 'vilkarskode',
    title: 'Vilkårskode',
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
