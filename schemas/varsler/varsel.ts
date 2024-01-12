import { defineField, defineType, SanityClient } from 'sanity'
import { TabsIcon } from '@navikt/aksel-icons'

export default defineType({
    name: 'varsel',
    title: 'Varsel',
    type: 'document',
    icon: TabsIcon,
    fields: [
        defineField({
            name: 'tittel',
            title: 'Tittel',
            type: 'string',
            validation: (Rule) => Rule.required().error('Tittel er påkrevd'),
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
            type: 'slug',
            readOnly: false,
            hidden: ({ document }) => !document?.subdomene && !document?.kontekst,
            options: {
                source: (doc) =>
                    `${(doc.subdomene as Subdomene)._ref}_${(doc.kontekst as Kontekst)._ref}`,
                slugify: async (source, schemaType, context) => {
                    const [subdomene, kontekst] = source.split('_')
                    console.log(source)
                    const { getClient } = context
                    const client = getClient({ apiVersion: '2022-12-07' })
                    return await getVarselkode(client, subdomene, kontekst)
                },
            },
        }),
        defineField({
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'text',
        }),
        defineField({
            name: 'forklaring',
            title: 'Forklaring',
            type: 'text',
        }),
    ],
})

const getVarselkoder = async (
    client: SanityClient,
    subdomene: string,
    kontekst: string,
): Promise<Varselkode[]> => {
    const query = `*[_type=="varsel" && subdomene._ref == $subdomene && kontekst._ref == $kontekst]{'varselkode': varselkode.current, 'kontekst': kontekst->forkortelse, 'subdomene': subdomene->forkortelse}`
    return client
        .fetch(query, { subdomene: subdomene, kontekst: kontekst }, { perspective: 'published' })
        .then((it: Varsel[]) =>
            it.map((it) => ({
                subdomene: it.subdomene,
                kontekst: it.kontekst,
                nummer: Number(it.varselkode.split('_')[2]),
            })),
        )
}

const getVarselkode = async (
    client: SanityClient,
    subdomene: string,
    kontekst: string,
): Promise<string> => {
    const varselkoder = await getVarselkoder(client, subdomene, kontekst)
    if (varselkoder.length > 0)
        return `${varselkoder[0].subdomene}_${varselkoder[0].kontekst}_${
            Math.max(...varselkoder.map((it) => it.nummer)) + 1
        }`

    const getSubdomeneQuery = `*[_type=='subdomene' && _id==$subdomene]{forkortelse}[0]`
    const getKontekstQuery = `*[_type=='kontekst' && _id==$kontekst]{forkortelse}[0]`

    const subdomeneForkortelse = await client
        .fetch(getSubdomeneQuery, { subdomene: subdomene })
        .then((it) => it.forkortelse as string)
    const kontekstForkortelse = await client
        .fetch(getKontekstQuery, { kontekst: kontekst })
        .then((it) => it.forkortelse as string)

    return `${subdomeneForkortelse}_${kontekstForkortelse}_1`
}

interface Varselkode {
    subdomene: string
    kontekst: string
    nummer: number
}

interface Varsel {
    varselkode: string
    kontekst: string
    subdomene: string
}

interface Subdomene {
    _ref: string
}

interface Kontekst {
    _ref: string
}
