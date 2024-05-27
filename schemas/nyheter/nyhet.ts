import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'nyhet',
    title: 'Nyhet',
    type: 'document',
    fields: [
        defineField({
            name: 'tittel',
            title: 'Tittel',
            type: 'string',
        }),
        defineField({
            name: 'slides',
            title: 'Slides',
            type: 'array',
            of: [
                {
                    type: 'nyhetsslide',
                },
            ],
        }),
    ],
})
