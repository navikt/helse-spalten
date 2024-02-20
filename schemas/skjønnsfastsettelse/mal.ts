import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'skjonnsfastsettelseMal',
    title: 'Mal',
    type: 'document',
    initialValue: (value) => ({
        arbeidsforholdMal: value.arbeidsforholdMal,
    }),
    fields: [
        defineField({
            name: 'begrunnelse',
            title: 'Begrunnelse',
            type: 'text',
            validation: (Rule) => Rule.required().error('Begrunnelse kan ikke være tom'),
        }),
        defineField({
            name: 'konklusjon',
            title: 'Konklusjon',
            type: 'string',
            validation: (Rule) => Rule.required().error('Konklusjon kan ikke være tom'),
        }),
        defineField({
            name: 'arbeidsforholdMal',
            title: 'ArbeidsforholdMal',
            type: 'array',
            readOnly: true,
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'lovhjemmel',
            title: 'Lovhjemmel',
            type: 'lovhjemmel',
            readOnly: true,
        }),
    ],
})
