import { CustomValidatorResult, defineField, defineType, ValidationContext } from 'sanity'
import { TabsIcon } from '@navikt/aksel-icons'

export default defineType({
    name: 'kontekst',
    title: 'Kontekst',
    type: 'document',
    icon: TabsIcon,
    fields: [
        defineField({
            name: 'navn',
            title: 'Navn',
            type: 'string',
            validation: (Rule) => Rule.required().error('Navn kan ikke være tomt'),
        }),
        defineField({
            name: 'subdomene',
            title: 'Subdomene',
            type: 'reference',
            to: [{ type: 'subdomene' }],
            validation: (Rule) => Rule.required().error('Subdomene kan ikke være tom'),
        }),
        defineField({
            name: 'forkortelse',
            title: 'Forkortelse',
            type: 'string',
            hidden: ({ document }) => !document?.subdomene,
            validation: (Rule) => [
                Rule.required().error('Forkortelse kan ikke være tom'),
                Rule.regex(/^[A-ZÆØÅ]{2}$/).error('Forkortelsen må bestå av to store bokstaver'),
                Rule.custom((input, context) => erUnikForkortelse(input, context)),
            ],
        }),
    ],
    preview: {
        select: {
            tittel: 'navn',
            forkortelse: 'forkortelse',
            subdomene: 'subdomene.navn',
        },
        prepare(selection) {
            const { tittel, forkortelse, subdomene } = selection
            return {
                title: `${tittel} (${forkortelse})`,
                subtitle: `Subdomene: ${subdomene}`,
            }
        },
    },
})

const erUnikForkortelse = async (
    input: string | undefined,
    context: ValidationContext,
): Promise<CustomValidatorResult> => {
    if (!input) return true
    const { getClient, document } = context
    const client = getClient({ apiVersion: '2022-12-07' })
    const documentId = document?._id ? document._id.replace('drafts.', '') : undefined
    const subdomene = (document?.subdomene as Subdomene)?._ref
    const query = `count(*[_type=="kontekst" && subdomene._ref == $subdomene && forkortelse == $forkortelse && _id != $document_id]{_id})`

    const isUnique = await client
        .fetch(
            query,
            { forkortelse: input, subdomene: subdomene, document_id: documentId },
            { perspective: 'published' },
        )
        .then((count: number) => count == 0)

    return isUnique ? isUnique : 'Forkortelsen må være unik'
}

interface Subdomene {
    _ref: string
}
