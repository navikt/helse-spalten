import { defineType } from 'sanity'
import { GavelIcon } from '@navikt/aksel-icons'

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
            to: [{ type: 'vilkarskode' }],
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'beskrivelse',
            title: 'Beskrivelse',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'muligeVurderinger',
            title: 'Mulige vurderinger',
            type: 'array',
            of: [{ type: 'muligVurdering' }],
        },
    ],
})
