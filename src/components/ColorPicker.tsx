'use client'

import { HexColorPicker } from 'react-colorful'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <HexColorPicker color={color} onChange={onChange} />
      <div className="flex items-center">
        <div
          className="w-8 h-8 rounded-md border mr-2"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 border rounded-md"
        />
      </div>
    </div>
  )
}