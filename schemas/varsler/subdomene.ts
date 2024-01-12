import { CustomValidatorResult, defineField, defineType, ValidationContext } from 'sanity'
import { TabsIcon } from '@navikt/aksel-icons'

export default defineType({
    name: 'subdomene',
    title: 'Subdomene',
    type: 'document',
    icon: TabsIcon,
    fields: [
        defineField({
            name: 'navn',
            title: 'Navn',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'forkortelse',
            title: 'Forkortelse',
            type: 'string',
            validation: (Rule) => [
                Rule.regex(/^[A-ZÆØÅ]{2}$/).error('Forkortelsen må bestå av to store bokstaver'),
                Rule.custom((input, context) => erUnikForkortelse(input, context)),
            ],
        }),
        defineField({
            name: 'forklaring',
            title: 'Utvidet forklaring',
            type: 'text',
        }),
    ],
    preview: {
        select: {
            tittel: 'navn',
            forkortelse: 'forkortelse',
        },
        prepare(selection) {
            const { tittel, forkortelse } = selection
            return {
                title: `${tittel} (${forkortelse})`,
            }
        },
    },
})

const erUnikForkortelse = async (
    input: string | undefined,
    context: ValidationContext,
): Promise<CustomValidatorResult> => {
    const { getClient, document } = context
    const client = getClient({ apiVersion: '2022-12-07' })
    const documentId = document?._id ? document._id.replace('drafts.', '') : undefined
    const query = `count(*[_type=="subdomene" && forkortelse == $forkortelse && _id != $document_id]{_id})`

    const isUnique = await client
        .fetch(query, { forkortelse: input, document_id: documentId }, { perspective: 'published' })
        .then((count: number) => count == 0)

    return isUnique ? isUnique : 'Forkortelsen må være unik'
}
