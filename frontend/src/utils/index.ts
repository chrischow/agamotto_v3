export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const getStatColor = (value: number) => {
  switch (true) {
    case value > 0:
      return 'teal.500'
      break
    case value < 0:
      return 'red.400'
      break
    default:
      return undefined
  }
}
