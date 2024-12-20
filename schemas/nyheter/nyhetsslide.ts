import { ConditionalPropertyCallbackContext, defineField } from 'sanity'

export const nyhetsslide = (num: number) =>
    defineField({
        name: `modalSlide${num}`,
        title: `Modal Slide ${num}`,
        type: 'object',
        hidden: ({ parent }: ConditionalPropertyCallbackContext) =>
            parent?.antallSlides === undefined || parent?.antallSlides < num,
        fields: [
            defineField({
                name: 'slideOverskrift',
                type: 'string',
                title: `Slide overskrift ${num}`,
            }),
            defineField({ name: 'slideBilde', type: 'image', title: `Slidebilde ${num}` }),
            defineField({
                name: 'altTekst',
                type: 'string',
                title: `Alternativ tekst for bilde ${num}`,
            }),
            defineField({
                name: 'slideBeskrivelse',
                type: 'customPortableText',
                title: `Slidebeskrivelse ${num}`,
            }),
        ],
    })
