import { ConditionalPropertyCallbackContext } from 'sanity'

export const nyhetsslide = (num: number) => ({
    name: `modalSlide${num}`,
    title: `Modal Slide ${num}`,
    type: 'object',
    hidden: ({ parent }: ConditionalPropertyCallbackContext) =>
        parent?.antallSlides === undefined || parent?.antallSlides < num,
    fields: [
        {
            name: 'slideOverskrift',
            type: 'string',
            title: `Modaloverskrift ${num}`,
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
