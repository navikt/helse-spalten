import { defineField, defineType } from 'sanity'
import { PreviewDriftsstatus } from './PreviewDriftsstatus'
import { DriftsstatusInput, HOVEDINNHOLD_FIELDSET } from './DriftsstatusInput'
import { formatterTidspunkt, konsekvensTekster, konsekvensValg } from './driftsstatusUtils'

export default defineType({
    name: 'driftsstatus',
    title: 'Status',
    type: 'object',
    fieldsets: [
        {
            name: HOVEDINNHOLD_FIELDSET,
            title: 'Konsekvens, årsak, tiltak og hva som kan jobbes med',
            description: 'Oppdater hvis noe har endret seg siden forrige status.',
            options: { collapsible: true, collapsed: true },
        },
    ],
    fields: [
        defineField({
            name: 'tidspunkt',
            title: 'Tidspunkt',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'konsekvens',
            title: 'Konsekvens',
            type: 'string',
            fieldset: HOVEDINNHOLD_FIELDSET,
            options: {
                layout: 'radio',
                list: konsekvensValg,
            },
            description:
                'Fyll ut hvis konsekvensen har endret seg. Siste utfylte konsekvens bestemmer tittel og farge på driftsmeldingen.',
        }),
        defineField({
            name: 'arsak',
            title: 'Årsak',
            type: 'string',
            fieldset: HOVEDINNHOLD_FIELDSET,
            description:
                'Hva skyldes feilen? Fyll ut kun hvis den har endret seg siden forrige status.',
        }),
        defineField({
            name: 'tiltak',
            title: 'Tiltak',
            type: 'string',
            fieldset: HOVEDINNHOLD_FIELDSET,
            description:
                'Hvilke tiltak blir gjort for å rette feilen? Fyll ut kun hvis de har endret seg siden forrige status.',
        }),
        defineField({
            name: 'cta',
            title: 'Hva kan jobbes med?',
            type: 'string',
            fieldset: HOVEDINNHOLD_FIELDSET,
            description:
                'Hva kan saksbehandler jobbe med mens det er nedetid? Fyll ut kun hvis det har endret seg siden forrige status.',
        }),
        defineField({
            name: 'oppdatering',
            title: 'Oppdatering',
            type: 'text',
            rows: 3,
            description:
                'Hva har endret seg siden forrige status? Dette er som regel det eneste du fyller ut.',
        }),
    ],
    components: {
        input: DriftsstatusInput,
        preview: PreviewDriftsstatus,
    },
    preview: {
        select: {
            tidspunkt: 'tidspunkt',
            konsekvens: 'konsekvens',
            oppdatering: 'oppdatering',
        },
        prepare({ tidspunkt, konsekvens, oppdatering }) {
            const deler = [konsekvensTekster[konsekvens], oppdatering].filter(Boolean)
            const detaljer = deler.length > 0 ? deler.join(': ') : 'Ingen endringer beskrevet'

            return {
                title: `${formatterTidspunkt(tidspunkt)} — ${detaljer}`,
            }
        },
    },
})
