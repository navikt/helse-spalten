import {defineField, defineType} from "sanity";
import {TabsIcon} from "@navikt/aksel-icons";

export default defineType({
    name: 'nyhet',
    title: 'Nyhet',
    type: 'document',
    icon: TabsIcon,
    fields: [
        defineField({
            name: 'tittel',
            title: 'Tittel',
            type: 'string'
        }),
        defineField({
            name: 'slides',
            title: 'Slides',
            type: 'array',
            of: [
                {
                    type: 'nyhetsslide'
                }
            ]
        })
    ],
})