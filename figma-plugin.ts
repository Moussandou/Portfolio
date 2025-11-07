import type { Plugin } from 'vite'

export function figmaAssetsPlugin(): Plugin {
  return {
    name: 'figma-assets-plugin',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        return `\0${id}` // Use null byte prefix to mark as virtual module
      }
    },
    load(id) {
      if (id.startsWith('\0figma:asset/')) {
        // Return a placeholder image as a data URL
        const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFhMWExYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5MzMzRUEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBwbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4='
        return `export default "${placeholderImage}"`
      }
    }
  }
}
