import { defineField, defineType } from 'sanity'
import { PreviewStatusoppdatering } from './PreviewStatusoppdatering'

export default defineType({
    name: 'statusoppdatering',
    title: 'Statusoppdatering',
    type: 'object',
    fields: [
        defineField({
            name: 'tidspunkt',
            title: 'Tidspunkt',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
            options: {
                dateFormat: 'DD.MM.YYYY,',
                timeFormat: 'HH:mm',
            },
        }),
        defineField({
            name: 'melding',
            title: 'Melding',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
    ],
    components: {
        preview: PreviewStatusoppdatering,
    },
    preview: {
        select: {
            tidspunkt: 'tidspunkt',
            melding: 'melding',
        },
        prepare({ tidspunkt, melding }) {
            return {
                title: `${new Date(tidspunkt).toLocaleString('nb-NO', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })} — ${melding}`,
            }
        },
    },
})
