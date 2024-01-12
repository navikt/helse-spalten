import {CheckmarkCircleFillIcon, ExclamationmarkTriangleFillIcon, XMarkOctagonFillIcon} from "@navikt/aksel-icons";
import {defineField, defineType} from "sanity";
import '../../styles/globals.css'

export default defineType({
    name: 'driftsmelding',
    title: 'Driftsmelding',
    type: 'document',
    fields: [
        defineField({
            name: 'level',
            title: 'Nivå',
            type: 'string',
            options: {
                direction: 'horizontal',
                layout: 'radio',
                list: [
                    {title: 'Grønn', value: 'grønn'},
                    {title: 'Gul', value: 'gul'},
                    {title: 'Rød', value: 'rød'},
                ]
            }
        }),
        defineField({
            name: 'tittel',
            title: 'Tittel',
            type: 'string'
        }),
        defineField({
            name: 'eta',
            title: 'Forventet feilrettet innen',
            type: 'datetime',
            validation: Rule => Rule.min(new Date().toISOString()).error('Du må oppgi et fremtidig tidspunkt')
        }),
        defineField({
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'array',
            of: [
                {type: 'block'},
                {type: 'image'}
            ]
        }),
    ],
    preview: {
        select: {
            title: 'tittel',
            level: 'level',
        },
        prepare(selection) {
            const {level} = selection
            return {
                ...selection,
                subtitle: `Nivå: ${level}`,
                media: level === 'grønn' ? (
                    <CheckmarkCircleFillIcon className={'text-green-300'}/>
                ) : level === 'gul' ? (
                    <ExclamationmarkTriangleFillIcon className={'text-orange-300'}/>
                ) : (
                    <XMarkOctagonFillIcon className={'text-red-300'}/>
                )
            }
        },
    },
})