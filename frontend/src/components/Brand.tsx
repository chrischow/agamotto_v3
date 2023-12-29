import { forwardRef, Text, TextProps } from '@chakra-ui/react'

const Brand = forwardRef<TextProps, 'p'>((props, ref) => {
  return (
    <Text
      {...props}
      ref={ref}
      color="gray.700"
      fontFamily="brand"
      fontWeight="bold"
      letterSpacing="0.1rem"
    >
      agamotto
    </Text>
  )
})

export default Brand
