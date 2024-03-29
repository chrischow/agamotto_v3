import { Text, VStack } from '@chakra-ui/react'

const InfoCard = ({
  label,
  content,
  isNumeric = false,
  isMaxWidth = false,
}: {
  label: string
  content: string
  isNumeric?: boolean
  isMaxWidth?: boolean
}) => {
  return (
    <VStack width={isMaxWidth ? undefined : '250px'} alignItems="start">
      <Text
        textTransform="uppercase"
        letterSpacing="0.2rem"
        fontSize="medium"
        fontWeight="thin"
        fontFamily="brand"
      >
        {label}
      </Text>
      <Text mt={1} fontSize="large" fontFamily={isNumeric ? 'mono' : undefined}>
        {content}
      </Text>
    </VStack>
  )
}

export default InfoCard
