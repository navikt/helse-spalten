import { at, defineMigration, set } from 'sanity/migrate'

interface VarselDocument {
    _id: string
    _type: 'varsel'
    varselkode?: { current: string } | string
}

export default defineMigration({
    title: '"Change type of varselkode"',
    documentTypes: ['varsel'],

    migrate: {
        document(doc, context) {
            const varsel = doc as VarselDocument
            if (
                varsel.varselkode &&
                typeof varsel.varselkode === 'object' &&
                'current' in varsel.varselkode
            ) {
                return [at('varselkode', set(String(varsel.varselkode.current)))]
            }
            return []
        },
    },
})
