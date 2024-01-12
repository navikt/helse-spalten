import {StructureBuilder} from "sanity/structure";
import {InformationSquareIcon, NewspaperIcon} from "@navikt/aksel-icons";

export const deskStructure = (S: StructureBuilder) => {
    return S.list()
        .title('Innhold')
        .items([
            S.listItem()
                .title('Nyheter')
                .icon(NewspaperIcon)
                .child(
                    S
                        .documentTypeList('nyhet')
                        .title('Nyheter')
                ),
            S.listItem()
                .title('Driftsmeldinger')
                .icon(InformationSquareIcon)
                .child(
                    S
                        .documentTypeList('driftsmelding')
                        .title('Driftsmeldinger')
                )
        ])
}
