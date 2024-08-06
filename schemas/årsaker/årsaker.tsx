import {defineArrayMember, defineField, defineType, ObjectItemProps} from 'sanity'
import '../../styles/globals.css'
import {Card} from '@sanity/ui'

export default defineType({
    name: 'arsaker',
    title: 'Årsaker',
    type: 'document',
    // fields: [
    //     defineField({
    //         name: 'arsaker',
    //         title: 'Årsaker',
    //         type: 'array',
    //         of: [{
    //             type: 'object',
    //             fields: [
    //                 {
    //                     title: 'Årsak',
    //                     name: 'value',
    //                     type: 'string'
    //                 }
    //             ]
    //         }],
    //         validation: (Rule) => Rule.unique().error('Ikke legg inn samme årsak flere ganger') || Rule.required().error('Årsaker kan ikke være tom'),
    //     })
    //     ],
    fields: [
        defineField({
            name: "arsaker",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "arsak",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    components: {
                        item: (props: ObjectItemProps) => {
                            const { inputProps, ...restProps } = props;
                            const { renderPreview, ...restInputProps } = inputProps;

                            return (
                                <div>
                                    {restProps.renderDefault({
                                        ...restProps,
                                        inputProps: {
                                            ...restInputProps,
                                            renderPreview: (_) => (
                                                <Card className="arsak" autoFocus={true}>{props.children}</Card>
                                            ),
                                        },
                                        open: false,
                                    })}
                                </div>
                            );
                        },
                    },
                }),
            ],
        }),
    ],
})
