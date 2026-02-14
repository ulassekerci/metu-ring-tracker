export function darkenHexHSL(hex: string, amount = 0.1): string {
  hex = hex.replace('#', '')
  const num = parseInt(hex, 16)
  let r = ((num >> 16) & 255) / 255
  let g = ((num >> 8) & 255) / 255
  let b = (num & 255) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  l = Math.max(0, l - amount)

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let q = l < 0.5 ? l * (1 + s) : l + s - l * s
  let p = 2 * l - q

  r = hue2rgb(p, q, h + 1 / 3)
  g = hue2rgb(p, q, h)
  b = hue2rgb(p, q, h - 1 / 3)

  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, '0')

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
