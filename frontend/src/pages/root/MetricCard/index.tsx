import { Text, VStack } from '@chakra-ui/react'

const MetricCard = ({
  label,
  stat,
  textColor,
}: {
  label: string
  stat: string
  textColor?: string
}) => {
  return (
    <VStack alignItems="start" p={6} boxShadow="lg" borderRadius={16}>
      <Text
        textTransform="uppercase"
        letterSpacing="0.2rem"
        fontSize="0.9rem"
        fontWeight="thin"
        fontFamily="brand"
      >
        {label}
      </Text>
      <Text mt={1} fontSize="x-large" fontFamily="mono" color={textColor}>
        {stat}
      </Text>
    </VStack>
  )
}

export default MetricCard
