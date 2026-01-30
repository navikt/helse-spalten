import { StructureBuilder } from 'sanity/structure'
import {
    ExclamationmarkTriangleIcon,
    InformationSquareIcon,
    NewspaperIcon,
} from '@navikt/aksel-icons'

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
                .child(
                    S.list()
                        .title('Meldinger')
                        .items([
                            S.listItem()
                                .title('Driftsmeldinger')
                                .child(
                                    S.documentTypeList('driftsmelding').title('Driftsmeldinger'),
                                ),
                            S.listItem()
                                .title('Informasjonsmeldinger')
                                .child(
                                    S.documentTypeList('informasjonsmelding').title(
                                        'Informasjonsmeldinger',
                                    ),
                                ),
                        ]),
                ),
            S.listItem()
                .title('Varsler')
                .icon(ExclamationmarkTriangleIcon)
                .child(
                    S.list()
                        .title('Varsler')
                        .items([
                            S.listItem().title('Subdomener').child(S.documentTypeList('subdomene')),
                            S.listItem().title('Kontekster').child(S.documentTypeList('kontekst')),
                            S.listItem()
                                .title('Varsler')
                                .child(
                                    S.list()
                                        .title('Varsler')
                                        .items([
                                            S.listItem()
                                                .title('Aktive varsler')
                                                .child(
                                                    S.documentTypeList('varsel')
                                                        .filter('avviklet == false')
                                                        .showIcons(false),
                                                ),
                                            S.listItem()
                                                .title('Avviklede varsler')
                                                .child(
                                                    S.documentTypeList('varsel')
                                                        .filter('avviklet == true')
                                                        .showIcons(false),
                                                ),
                                        ]),
                                ),
                        ]),
                ),
            S.listItem()
                .title('Vedtaksmaler')
                .child(
                    S.list()
                        .title('Vedtaksmaler')
                        .items([
                            S.listItem()
                                .title('Skjønnsfastsettelse')
                                .child(
                                    S.list()
                                        .title('Maler')
                                        .items([
                                            S.listItem()
                                                .title('§ 8-30 2. Avviksvurdering')
                                                .child(
                                                    S.list()
                                                        .title('Antall arbeidsgivere')
                                                        .items([
                                                            S.listItem()
                                                                .title('En arbeidsgiver')
                                                                .child(
                                                                    S.document()
                                                                        .schemaType(
                                                                            'skjonnsfastsettelseMal',
                                                                        )
                                                                        .documentId(
                                                                            '25ProsentEnArb',
                                                                        )
                                                                        .initialValueTemplate(
                                                                            'skjonnsfastsettelse-template',
                                                                            {
                                                                                lovhjemmel: {
                                                                                    ledd: '2',
                                                                                },
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
                                                                        .schemaType(
                                                                            'skjonnsfastsettelseMal',
                                                                        )
                                                                        .documentId(
                                                                            '25ProsentFlereArb',
                                                                        )
                                                                        .initialValueTemplate(
                                                                            'skjonnsfastsettelse-template',
                                                                            {
                                                                                lovhjemmel: {
                                                                                    ledd: '2',
                                                                                },
                                                                                arbeidsforholdMal: [
                                                                                    'FLERE_ARBEIDSGIVERE',
                                                                                ],
                                                                            },
                                                                        ),
                                                                ),
                                                        ]),
                                                ),
                                            S.listItem()
                                                .title('§ 8-30 3. Uriktig rapportering')
                                                .child(
                                                    S.list()
                                                        .title('Antall arbeidsgivere')
                                                        .items([
                                                            S.listItem()
                                                                .title('En arbeidsgiver')
                                                                .child(
                                                                    S.document()
                                                                        .schemaType(
                                                                            'skjonnsfastsettelseMal',
                                                                        )
                                                                        .documentId(
                                                                            'uriktigRapporteringEnArb',
                                                                        )
                                                                        .initialValueTemplate(
                                                                            'skjonnsfastsettelse-template',
                                                                            {
                                                                                lovhjemmel: {
                                                                                    ledd: '3',
                                                                                },
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
                                                                        .schemaType(
                                                                            'skjonnsfastsettelseMal',
                                                                        )
                                                                        .documentId(
                                                                            'uriktigRapporteringFlereArb',
                                                                        )
                                                                        .initialValueTemplate(
                                                                            'skjonnsfastsettelse-template',
                                                                            {
                                                                                lovhjemmel: {
                                                                                    ledd: '3',
                                                                                },
                                                                                arbeidsforholdMal: [
                                                                                    'FLERE_ARBEIDSGIVERE',
                                                                                ],
                                                                            },
                                                                        ),
                                                                ),
                                                        ]),
                                                ),
                                        ]),
                                ),

                            S.listItem().title('Avslag').child(S.documentTypeList('avslag')),
                        ]),
                ),
            S.listItem()
                .title('Årsaker')
                .child(
                    S.list()
                        .title('Årsaker')
                        .items([
                            S.listItem()
                                .title('Annullering')
                                .child(
                                    S.document()
                                        .schemaType('arsaker')
                                        .documentId('annulleringsarsaker')
                                        .title('Annulleringårsaker'),
                                ),
                            S.listItem()
                                .title('På vent')
                                .child(
                                    S.document()
                                        .schemaType('arsaker')
                                        .documentId('paventarsaker')
                                        .title('På vent årsaker'),
                                ),
                        ]),
                ),
        ])
}
