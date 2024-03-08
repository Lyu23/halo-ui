import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'views': path.resolve(__dirname, 'src/views'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/variable.scss";`
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    }
  },
  /*
  proxy: {
    '/api': {
      target: 'https://node.halonode.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
  */
  plugins: [
    vue(),
    
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/export.ts'),
      name: 'halow',
      fileName: (format) => `halow.${format}.ts`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }

})
