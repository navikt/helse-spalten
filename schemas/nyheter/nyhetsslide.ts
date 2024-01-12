import {defineField, defineType} from "sanity";

export default defineType({
    name: 'nyhetsslide',
    title: 'Nyhetsslide',
    type: 'document',
    fields: [
        defineField({
            name: 'innhold',
            title: 'Innhold',
            type: 'array',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image'
                }
            ]
        }),
    ],
})