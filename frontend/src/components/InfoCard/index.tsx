import { Text, VStack } from '@chakra-ui/react'

const InfoCard = ({
  label,
  content,
  isNumeric = false,
}: {
  label: string
  content: string
  isNumeric?: boolean
}) => {
  return (
    <VStack width="250px" alignItems="start">
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
