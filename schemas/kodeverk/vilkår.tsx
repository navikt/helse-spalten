import { defineField, defineType } from 'sanity'
import { GavelIcon, ParagraphIcon } from '@navikt/aksel-icons'
import { CheckmarkCircleIcon, CircleSlashIcon, XMarkOctagonIcon } from '@navikt/aksel-icons'

export default defineType({
    name: 'vilkar',
    title: 'Vilkår',
    type: 'document',
    icon: GavelIcon,
    fields: [
        {
            name: 'kode',
            title: 'Vilkårskode',
            type: 'reference',
            to: [{ type: 'vilkar.kode' }],
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'alternativ',
            title: 'Alternativer',
            type: 'array',
            of: [{ type: 'vilkar.alternativ' }],
        },
    ],
})

export const vilkårskode = defineType({
    name: 'vilkar.kode',
    title: 'Kode',
    type: 'document',
    icon: ParagraphIcon,
    fields: [
        defineField({
            name: 'kode',
            title: 'Kode',
            type: 'string',
            validation: (Rule) => Rule.required().error('Kode kan ikke være tom'),
        }),
    ],
})

export const vilkårLovhenvisning = defineType({
    name: 'vilkar.lovhenvisning',
    title: 'Lovhenvisning',
    type: 'object',
    fields: [
        defineField({
            name: 'lovverk',
            title: 'Lovverk',
            type: 'string',
            validation: (Rule) => Rule.required().min(2),
        }),
        defineField({
            name: 'lovverksversjon',
            title: 'Lovverksversjon',
            type: 'string',
            validation: (Rule) => Rule.required().min(2),
        }),
        defineField({
            name: 'kapittel',
            title: 'Kapittel',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'paragraf',
            title: 'Paragraf',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'ledd',
            title: 'Ledd',
            type: 'string',
        }),
        defineField({
            name: 'setning',
            title: 'Setning',
            type: 'string',
        }),
        defineField({
            name: 'bokstav',
            title: 'Bokstav',
            type: 'string',
        }),
    ],
})

export const vilkårAlternativ = defineType({
    name: 'vilkar.alternativ',
    title: 'Alternativ',
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
            name: 'lovhenvisning',
            title: 'Lovhenvisning',
            type: 'vilkar.lovhenvisning',
            validation: (Rule) => Rule.required(),
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
