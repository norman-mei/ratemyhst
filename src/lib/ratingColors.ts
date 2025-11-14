type RatingStyle = {
  background: string
  textColor: string
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export function getRatingStyle(value?: number | null, scale = 5): RatingStyle {
  if (!value || Number.isNaN(value) || value <= 0) {
    return {
      background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
      textColor: '#111827',
    }
  }

  const maxScale = Math.max(1, scale)
  const clamped = clamp(value, 1, maxScale)
  const ratio = maxScale === 1 ? 1 : (clamped - 1) / (maxScale - 1)
  const hue = 0 + ratio * 120 // red to green
  const start = `hsl(${hue} 80% 60%)`
  const end = `hsl(${hue} 70% 40%)`

  return {
    background: `linear-gradient(135deg, ${start}, ${end})`,
    textColor: '#111827',
  }
}
