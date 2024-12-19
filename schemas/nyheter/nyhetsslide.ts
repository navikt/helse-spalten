import { ConditionalPropertyCallbackContext } from 'sanity'

export const nyhetsslide = (num: number) => ({
    name: `modalSlide${num}`,
    title: `Modal Slide ${num}`,
    type: 'object',
    hidden: ({ parent }: ConditionalPropertyCallbackContext) =>
        parent?.antallSlides === undefined || parent?.antallSlides < num,
    fields: [
        {
            name: 'slideHeader',
            type: 'string',
            title: `Modaloverskrift ${num}`,
        },
        { name: 'slideImage', type: 'image', title: `Slidebilde ${num}` },
        {
            name: 'altText',
            type: 'string',
            title: `Alternativ tekst for bilde ${num}`,
        },
        {
            name: 'slideDescription',
            type: 'blockContent',
            title: `Slidebeskrivelse ${num}`,
        },
    ],
})
