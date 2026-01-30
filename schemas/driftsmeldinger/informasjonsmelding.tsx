import { defineField, defineType } from 'sanity'
import '../../styles/globals.css'

export default defineType({
    name: 'informasjonsmelding',
    title: 'Informasjonsmelding',
    type: 'document',
    fields: [
        defineField({
            name: 'tittel',
            title: 'Tittel',
            type: 'string',
            description: 'Hva skal det informeres om?',
            validation: (Rule) => Rule.required().error('Tittel kan ikke være tom'),
        }),
        defineField({
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'text',
            description: 'Utdypende beskrivelse',
            validation: (Rule) => Rule.required().error('Beskrivelse kan ikke være tom'),
        }),
        defineField({
            name: 'iDev',
            title: 'Vis i dev?',
            type: 'string',
            options: {
                list: [
                    { title: 'Nei', value: 'false' },
                    { title: 'Ja', value: 'true' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            description: 'Velg om informasjonsmelding skal være synlig i dev',
            initialValue: 'false',
        }),
        defineField({
            name: 'iProd',
            title: 'Vis i prod?',
            type: 'string',
            options: {
                list: [
                    { title: 'Nei', value: 'false' },
                    { title: 'Ja', value: 'true' },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            description: 'Velg om informasjonsmelding skal være synlig for saksbehandlere i prod',
            initialValue: 'true',
        }),
    ],
    preview: {
        select: {
            title: 'tittel',
        },
    },
})
