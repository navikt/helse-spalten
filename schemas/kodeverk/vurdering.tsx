import { defineField, defineType } from 'sanity'
import { CheckmarkCircleIcon, CircleSlashIcon, XMarkOctagonIcon } from '@navikt/aksel-icons'

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
                    { title: 'Oppfylt', value: 'oppfylt' },
                    { title: 'Ikke oppfylt', value: 'ikke-oppfylt' },
                    { title: 'Unntak', value: 'unntak' },
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
                subtitle:
                    'Utfall: ' +
                    (utfall === 'oppfylt'
                        ? 'Oppfylt'
                        : utfall === 'ikke-oppfylt'
                          ? 'Ikke oppfylt'
                          : 'Unntak'),
                media: () =>
                    utfall === 'oppfylt' ? (
                        <CheckmarkCircleIcon className="stroke-icon-success" />
                    ) : utfall === 'ikke-oppfylt' ? (
                        <XMarkOctagonIcon className="stroke-icon-danger" />
                    ) : (
                        <CircleSlashIcon />
                    ),
            }
        },
    },
})
