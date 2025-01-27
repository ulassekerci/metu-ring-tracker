export const getColorName = (hex: string) => {
  return colorDict.find((color) => color.hex === hex.toUpperCase())?.color || 'unknown'
}

export const getBetterColor = (hex: string) => {
  return colorDict.find((color) => color.hex === hex.toUpperCase())?.better || hex
}

export const getFileName = (hex: string) => {
  return colorDict.find((color) => color.hex === hex.toUpperCase())?.file || 'ring-gray.png'
}

const colorDict = [
  { color: 'red', hex: '#FF0000', better: '#FF4D4D', file: 'ring-red.png' },
  { color: 'yellow', hex: '#FFFF57', better: '#FFcc00', file: 'ring-yellow.png' },
  { color: 'purple', hex: '#9600CD', better: '#B366FF', file: 'ring-purple.png' },
  { color: 'brown', hex: '#A64D00', better: '#D97706', file: 'ring-brown.png' },
  { color: 'gray', hex: '#737373', better: '#737373', file: 'ring-gray.png' },
]
