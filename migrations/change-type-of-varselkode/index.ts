import { at, defineMigration, set } from 'sanity/migrate'

export default defineMigration({
    title: '"Change type of varselkode"',
    documentTypes: ['varsel'],

    migrate: {
        document(doc, context) {
            return [at('varselkode', set(String(doc.varselkode['current'])))]
        },
    },
})
