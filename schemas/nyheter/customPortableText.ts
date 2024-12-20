import { defineArrayMember, defineType } from 'sanity'

/**
 * This is the schema definition for the rich text fields used
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: "someName",
 *    title: "Some title",
 *    type: "customPortableText"
 *  }
 */
export default defineType({
    name: 'customPortableText',
    title: 'Custom Portable Text',
    type: 'array',
    of: [
        defineArrayMember({
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading', value: 'h2' },
                { title: 'Quote', value: 'blockQuote' },
            ],
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
            ],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                    { title: 'Underline', value: 'underline' },
                ],
            },
        }),
    ],
})
