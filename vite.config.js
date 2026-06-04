import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  base: '/',
  build: {
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 启用异步chunk加载
    rollupOptions: {
      output: {
        // 手动分包策略：React生态库单独打包
        manualChunks: {
          'react-vendor': ['react', 'react-dom']
        }
      }
    },
    // 使用esbuild压缩（内置，无需额外安装terser）
    minify: 'esbuild',
    // 移除console和debugger
    esbuild: {
      drop: ['console', 'debugger']
    },
    // 生成sourcemap（生产环境建议关闭）
    sourcemap: false,
    // 资源内联阈值 4KB
    assetsInlineLimit: 4096
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
