import { differenceInDays, isAfter, format } from 'date-fns'

// 计算剩余天数（更精确的版本）
export function getRemainingDays(targetDate: Date): string {
  const now = new Date()
  
  if (isAfter(now, targetDate)) {
    return '已到达'
  }
  
  const days = differenceInDays(targetDate, now)
  
  return `${days}天后`
}

// 格式化日期
export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

// 根据背景色计算文字颜色（黑或白）
export function getContrastColor(backgroundColor: string): string {
  if (!backgroundColor) return 'text-black'
  
  // 如果是图片背景，默认返回白色文字
  if (backgroundColor.startsWith('http') || backgroundColor.startsWith('/')) {
    return 'text-white'
  }
  
  // 处理hex颜色
  let hex = backgroundColor
  if (hex.startsWith('#')) {
    hex = hex.substring(1)
  }
  
  // 处理rgb/rgba颜色
  if (hex.startsWith('rgb')) {
    const rgb = hex.match(/\d+/g)
    if (rgb) {
      const [r, g, b] = rgb.map(Number)
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? 'text-black' : 'text-white'
    }
  }
  
  // 处理3位hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  
  // 计算亮度
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  return brightness > 128 ? 'text-black' : 'text-white'
}