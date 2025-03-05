export const getColorName = (hex: string, lang: 'en' | 'tr' = 'tr') => {
  const color = colorDict.find((color) => color.hex === hex.toUpperCase())
  return color ? color[lang] : hex
}

export const getBetterColor = (hex: string) => {
  const color = colorDict.find((color) => color.hex === hex.toUpperCase())
  return color ? color.better : hex
}

export const getFileName = (hex: string) => {
  const color = colorDict.find((color) => color.hex === hex.toUpperCase())
  return color?.file || 'ring-gray.png'
}

const colorDict = [
  { en: 'Red', tr: 'Kırmızı', hex: '#FF0000', better: '#FF4D4D', file: 'ring-red.png' },
  { en: 'Yellow', tr: 'Sarı', hex: '#FFFF57', better: '#FFCC00', file: 'ring-yellow.png' },
  { en: 'Purple', tr: 'Mor', hex: '#9600CD', better: '#B366FF', file: 'ring-purple.png' },
  { en: 'Brown', tr: 'Kahverengi', hex: '#A64D00', better: '#D97706', file: 'ring-brown.png' },
  { en: 'Blue', tr: 'Lacivert', hex: '#0000FF', better: '#1447E6', file: 'ring-blue.png' },
  { en: 'Gray', tr: 'Gri', hex: '#737373', better: '#737373', file: 'ring-gray.png' },
]
