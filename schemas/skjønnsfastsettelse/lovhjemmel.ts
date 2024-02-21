import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'lovhjemmel',
    title: 'Lovhjemmel',
    type: 'document',
    options: { columns: 4 },
    initialValue: (value, context) => ({
        paragraf: value.paragraf,
        ledd: context.schema.get('ledd'),
        lovverk: value.lovverk,
        lovverkversjon: value.lovverkversjon,
    }),
    fields: [
        defineField({
            name: 'paragraf',
            title: 'Paragraf',
            type: 'string',
            readOnly: ({ parent }) => {
                return parent?.lovhjemmel?.paragraf !== ''
            },
        }),
        defineField({
            name: 'ledd',
            title: 'Ledd',
            type: 'string',
            readOnly: ({ parent }) => {
                return parent?.lovhjemmel?.ledd !== ''
            },
        }),
        defineField({
            name: 'lovverk',
            title: 'Lovverk',
            type: 'string',
            readOnly: ({ parent }) => {
                return parent?.lovhjemmel?.lovverk !== ''
            },
        }),
        defineField({
            name: 'lovverksversjon',
            title: 'Lovverksversjon',
            type: 'string',
            readOnly: ({ parent }) => {
                return parent?.lovhjemmel?.lovverksversjon !== ''
            },
        }),
    ],
})
