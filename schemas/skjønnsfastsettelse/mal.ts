import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'skjonnsfastsettelseMal',
    title: 'Mal',
    type: 'document',
    initialValue: (value) => ({
        arbeidsforholdMal: value.arbeidsforholdMal,
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
            name: 'arsak',
            title: 'Årsak',
            type: 'string',
            validation: (Rule) => Rule.required().error('Årsak kan ikke være tom'),
        }),
        defineField({
            name: 'begrunnelse',
            title: 'Begrunnelse',
            type: 'text',
            description:
                'Mulige Variabler: ${omregnetÅrsinntekt}, ${omregnetMånedsinntekt}, ${sammenligningsgrunnlag}',
            validation: (Rule) => Rule.required().error('Begrunnelse kan ikke være tom'),
        }),
        defineField({
            name: 'konklusjon',
            title: 'Konklusjon',
            type: 'string',
            description: 'Mulige Variabler: ${skjønnsfastsattÅrsinntekt}',
            validation: (Rule) => Rule.required().error('Konklusjon kan ikke være tom'),
        }),
        defineField({
            name: 'arbeidsforholdMal',
            title: 'ArbeidsforholdMal',
            type: 'array',
            options: {
                list: [
                    { title: 'En arbeidsgiver', value: 'EN_ARBEIDSGIVER' },
                    { title: 'Flere arbeidsgivere', value: 'FLERE_ARBEIDSGIVERE' },
                ],
            },
            readOnly: ({ parent }) => {
                return (
                    (parent?.arbeidsforholdMal?.length ?? 0) > 0 &&
                    (parent.arbeidsforholdMal.includes('EN_ARBEIDSGIVER') ||
                        parent.arbeidsforholdMal.includes('FLERE_ARBEIDSGIVERE'))
                )
            },
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required().error('arbeidsforholdMal kan ikke være tom'),
        }),
        defineField({
            name: 'lovhjemmel',
            title: 'Lovhjemmel',
            type: 'lovhjemmel',
            validation: (Rule) => Rule.required().error('lovhjemmel kan ikke være tom'),
        }),
    ],
})
