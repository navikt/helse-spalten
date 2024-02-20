import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'lovhjemmel',
    title: 'Lovhjemmel',
    type: 'document',
    initialValue: (value) => ({
        paragraf: value.paragraf,
        ledd: value.ledd,
        lovverk: value.lovverk,
        lovverkversjon: value.lovverkversjon,
    }),
    fields: [
        defineField({
            name: 'paragraf',
            title: 'Paragraf',
            type: 'string',
        }),
        defineField({
            name: 'ledd',
            title: 'Ledd',
            type: 'string',
        }),
        defineField({
            name: 'lovverk',
            title: 'Lovverk',
            type: 'string',
        }),
        defineField({
            name: 'lovverksversjon',
            title: 'Lovverksversjon',
            type: 'string',
        }),
    ],
})
