import { StructureBuilder } from 'sanity/structure'
import { InformationSquareIcon, NewspaperIcon } from '@navikt/aksel-icons'

export const deskStructure = (S: StructureBuilder) => {
    return S.list()
        .title('Innhold')
        .items([
            S.listItem()
                .title('Nyheter')
                .icon(NewspaperIcon)
                .child(S.documentTypeList('nyhet').title('Nyheter')),
            S.listItem()
                .title('Driftsmeldinger')
                .icon(InformationSquareIcon)
                .child(S.documentTypeList('driftsmelding').title('Driftsmeldinger')),
            S.listItem()
                .title('Varsler')
                .child(
                    S.list()
                        .title('Varsler')
                        .items([
                            S.listItem().title('Subdomener').child(S.documentTypeList('subdomene')),
                            S.listItem().title('Kontekster').child(S.documentTypeList('kontekst')),
                            S.listItem().title('Varsler').child(S.documentTypeList('varsel')),
                        ]),
                ),
            S.listItem()
                .title('Skjønnsfastsettelse')
                .icon(InformationSquareIcon)
                .child(
                    S.list()
                        .title('Maler')
                        .items([
                            S.listItem()
                                .title('25 % avvik')
                                .child(
                                    S.list()
                                        .title(
                                            'Antall arbeidsgivere (inntil vi kommer på noe smartere)',
                                        )
                                        .items([
                                            S.listItem()
                                                .title('En arbeidsgiver')
                                                .child(
                                                    S.document()
                                                        .schemaType('skjonnsfastsettelseMal')
                                                        .documentId('25ProsentEnArb')
                                                        .initialValueTemplate(
                                                            'skjonnsfastsettelse-template',
                                                            {
                                                                lovhjemmel: { ledd: '2' },
                                                                arbeidsforholdMal: [
                                                                    'EN_ARBEIDSGIVER',
                                                                ],
                                                            },
                                                        ),
                                                ),
                                            S.listItem()
                                                .title('Flere arbeidsgivere')
                                                .child(
                                                    S.document()
                                                        .schemaType('skjonnsfastsettelseMal')
                                                        .documentId('25ProsentFlereArb')
                                                        .initialValueTemplate(
                                                            'skjonnsfastsettelse-template',
                                                            {
                                                                lovhjemmel: { ledd: '2' },
                                                                arbeidsforholdMal: [
                                                                    'FLERE_ARBEIDSGIVERE',
                                                                ],
                                                            },
                                                        ),
                                                ),
                                        ]),
                                ),
                            S.listItem()
                                .title('Uriktig rapportering')
                                .child(
                                    S.list()
                                        .title('Noe med tredje ledd')
                                        .items([
                                            S.listItem()
                                                .title('hallo tredje ledd')
                                                .child(
                                                    S.document()
                                                        .schemaType('skjonnsfastsettelseMal')
                                                        .documentId('uriktigRapporteringBegge')
                                                        .initialValueTemplate(
                                                            'skjonnsfastsettelse-template',
                                                            {
                                                                lovhjemmel: { ledd: '3' },
                                                                arbeidsforholdMal: [
                                                                    'EN_ARBEIDSGIVER',
                                                                    'FLERE_ARBEIDSGIVERE',
                                                                ],
                                                            },
                                                        ),
                                                ),
                                        ]),
                                ),
                        ]),
                ),
        ])
}
