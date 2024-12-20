import { ConditionalPropertyCallbackContext, defineField } from 'sanity'

export const nyhetsslide = (num: number) =>
    defineField({
        name: `modalSlide${num}`,
        title: `Modal Slide ${num}`,
        type: 'object',
        hidden: ({ parent }: ConditionalPropertyCallbackContext) =>
            parent?.antallSlides === undefined || parent?.antallSlides < num,
        fields: [
            {
                name: 'slideOverskrift',
                type: 'string',
                title: `Slide overskrift ${num}`,
            },
            { name: 'slideBilde', type: 'image', title: `Slidebilde ${num}` },
            {
                name: 'altTekst',
                type: 'string',
                title: `Alternativ tekst for bilde ${num}`,
            },
            {
                name: 'slideBeskrivelse',
                type: 'blockContent',
                title: `Slidebeskrivelse ${num}`,
            },
        ],
    })
