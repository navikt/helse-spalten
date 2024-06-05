import { defineField, defineType, TextInput, TextInputProps } from 'sanity'
import VarselkodeInput from '../../components/Varselkode'

export default defineType({
    name: 'varsel',
    title: 'Varsel',
    type: 'document',
    fields: [
        defineField({
            name: 'iProduksjon',
            title: 'Tilgjengelig i prod',
            type: 'boolean',
            description:
                'Når denne er på vil varseldefinisjonen være tilgjengelig for saksbehandlerene i produksjonsmiljøet',
            initialValue: false,
        }),
        defineField({
            name: 'tittel',
            title: 'Tittel',
            type: 'string',
            validation: (Rule) => Rule.required().error('Tittel er påkrevd'),
        }),
        defineField({
            name: 'avviklet',
            title: 'Avviklet',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'tags',
            description: 'Tags vises ikke til saksbehandler',
            options: {
                allowCreate: true,
                reactSelectOptions: {
                    placeholder: 'Velg...',
                    noOptionsMessage: () => 'Ingen tags',
                },
            },
        }),
        defineField({
            name: 'subdomene',
            title: 'Subdomene',
            type: 'reference',
            to: [{ type: 'subdomene' }],
            validation: (Rule) => Rule.required().error('Subdomene må velges'),
        }),
        defineField({
            name: 'kontekst',
            title: 'Kontekst',
            type: 'reference',
            to: [{ type: 'kontekst' }],
            hidden: ({ document }) => !document?.subdomene,
            validation: (Rule) => Rule.required().error('Kontekst må velges'),
        }),
        defineField({
            name: 'varselkode',
            title: 'Varselkode',
            type: 'string',
            hidden: ({ document }) => !document?.subdomene || !document?.kontekst,
            components: { input: VarselkodeInput },
        }),
        defineField({
            name: 'forklaring',
            title: 'Hva betyr det?',
            description: 'Hva er grunnen til at varselet forekommer',
            type: 'string',
            components: {
                // Sanity har en bug som gjør at søk i text-typer ikke fungerer. Dette er en
                // workaround inntil buggen er fikset.
                // Dette gjør at string-typen rendres og kan brukes som en text-type
                input: (props: TextInputProps) => TextInput(props),
            },
            options: {
                search: {
                    weight: 10,
                },
            },
        }),
        defineField({
            name: 'handling',
            title: 'Hva gjør du?',
            description: 'Hva skal saksbehandler gjøre når dette varselet dukker opp',
            type: 'string',
            components: {
                // Sanity har en bug som gjør at søk i text-typer ikke fungerer. Dette er en
                // workaround inntil buggen er fikset.
                // Dette gjør at string-typen rendres og kan brukes som en text-type
                input: (props: TextInputProps) => TextInput(props),
            },
            options: {
                search: {
                    weight: 10,
                },
            },
        }),
    ],
    preview: {
        select: {
            tittel: 'tittel',
            varselkode: 'varselkode',
            avviklet: 'avviklet',
            iProd: 'iProduksjon',
        },
        prepare(selection) {
            const { tittel, varselkode, avviklet, iProd } = selection
            return {
                title: `${tittel}`,
                subtitle: `${varselkode} ${avviklet ? '- avviklet' : iProd ? '- i prod' : '- kun i dev'}`,
            }
        },
    },
})
