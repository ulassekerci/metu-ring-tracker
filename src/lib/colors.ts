export const getColorName = (hex: string) => {
  return colorDict.find((color) => color.hex === hex)?.color || 'unknown'
}

export const getBetterColor = (hex: string) => {
  return colorDict.find((color) => color.hex === hex)?.better || hex
}

export const getFileName = (hex: string) => {
  return colorDict.find((color) => color.hex === hex)?.file || 'ring-gray.png'
}

const colorDict = [
  { color: 'red', hex: '#ff0000', better: '#ff4d4d', file: 'ring-red.png' },
  { color: 'yellow', hex: '#ffff57', better: '#ffcc00', file: 'ring-yellow.png' },
  { color: 'purple', hex: '#9600CD', better: '#b366ff', file: 'ring-purple.png' },
  { color: 'brown', hex: '#A64D00', better: '#d97706', file: 'ring-brown.png' },
  { color: 'gray', hex: '#737373', better: '#737373', file: 'ring-gray.png' },
]
