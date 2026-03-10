import { defineField, defineType } from 'sanity'
import { CheckmarkCircleIcon, XMarkOctagonIcon } from '@navikt/aksel-icons'

export const muligVurdering = defineType({
    name: 'muligVurdering',
    title: 'Mulig vurdering',
    type: 'document',
    fields: [
        defineField({
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'string',
            validation: (Rule) => Rule.required().error('Beskrivelse kan ikke være tom'),
        }),
        defineField({
            name: 'kode',
            title: 'Kode',
            type: 'slug',
            options: {
                source: (_, context) => {
                    const parent = context.parent as { beskrivelse?: string }
                    return parent?.beskrivelse ?? ''
                },
                maxLength: 96,
            },
            validation: (Rule) => Rule.required().error('Kode kan ikke være tom'),
        }),
        defineField({
            name: 'utfall',
            title: 'Utfall',
            type: 'string',
            options: {
                list: [
                    { title: 'Innvilgelse', value: 'innvilgelse' },
                    { title: 'Avslag', value: 'avslag' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
        }),
    ],
    preview: {
        select: {
            beskrivelse: 'beskrivelse',
            utfall: 'utfall',
        },
        prepare({ beskrivelse, utfall }) {
            return {
                title: beskrivelse,
                media: () =>
                    utfall === 'innvilgelse' ? (
                        <CheckmarkCircleIcon className="stroke-icon-success" />
                    ) : utfall === 'avslag' ? (
                        <XMarkOctagonIcon className="stroke-icon-danger" />
                    ) : null,
            }
        },
    },
})
