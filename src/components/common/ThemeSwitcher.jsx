import React from 'react'
import { colorPalettes, setColorPalette, getCurrentPalette } from '../../config/theme'

const ThemeSwitcher = () => {
  const currentPalette = Object.entries(colorPalettes).find(
    ([name, palette]) => palette.primary[500] === getCurrentPalette().primary[500]
  )?.[0]

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
      {Object.keys(colorPalettes).map((paletteName) => (
        <button
          key={paletteName}
          onClick={() => setColorPalette(paletteName)}
          className={`w-6 h-6 rounded-full transition-transform hover:scale-110 border-2 ${currentPalette === paletteName ? 'border-primary-600' : 'border-transparent'}`}
          style={{ backgroundColor: colorPalettes[paletteName].primary[500] }}
          aria-label={`Switch to ${paletteName} theme`}
        />
      ))}
    </div>
  )
}

export default ThemeSwitcher