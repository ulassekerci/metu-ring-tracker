export const getColorName = (hex: string) => {
  return colorDict.find((color) => color.hex === hex)?.color || 'unknown'
}

export const getBetterColor = (hex: string) => {
  return colorDict.find((color) => color.hex === hex)?.better || hex
}

const colorDict = [
  { color: 'red', hex: '#ff0000', better: '#ff4d4d' },
  { color: 'yellow', hex: '#ffff57', better: '#ffff80' },
  { color: 'purple', hex: '#9600CD', better: '#b366ff' },
  { color: 'brown', hex: '#A64D00', better: '#d97706' },
  { color: 'gray', hex: '#808080', better: '#808080' }, // not sure about this one
]
