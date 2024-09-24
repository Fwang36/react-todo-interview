import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin to remove sourceMappingURL from the output files
function removeSourceMapPlugin() {
  return {
    name: 'remove-sourcemaps',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(/\/\/# sourceMappingURL=.*\.map/g, '')
    },
    generateBundle(_, bundle) {
      for (const file in bundle) {
        if (bundle[file].type === 'asset' && bundle[file].source) {
          bundle[file].source = bundle[file].source.toString().replace(/\/\/# sourceMappingURL=.*\.map/g, '')
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), removeSourceMapPlugin()],
  build: {
    sourcemap: false
  }
})