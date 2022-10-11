const Card = {
  variants: {
    'flat-border': ({ colorMode }) => ({
      borderColor: colorMode === 'light' ? 'gray.200' : 'gray.600',
      borderWidth: 1,
      borderRadius: 8,
      p: 4,
      py: 6,
    }),
  },
}

module.exports = {
  components: {
    Card,
  },
}
