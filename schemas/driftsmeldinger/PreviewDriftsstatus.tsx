import { PreviewProps } from 'sanity'
import { Flex, Text } from '@sanity/ui'
export const PreviewDriftsstatus = (props: PreviewProps) => {
    return (
        <Flex align="center" padding={2}>
            <Text textOverflow="ellipsis">{props.title as string}</Text>
        </Flex>
    )
}
