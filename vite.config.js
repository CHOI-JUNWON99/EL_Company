import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    // Brotli 압축 플러그인 추가
    compression({
      algorithm: "brotliCompress", // Brotli를 사용하여 파일 압축
      ext: ".br", // 확장자 추가
      threshold: 10240, // 10KB 이상의 파일만 압축
      deleteOriginFile: false, // 원본 파일 유지
    }),
    // Gzip 압축 플러그인 추가
    compression({
      algorithm: "gzip", // Gzip 압축
      ext: ".gz", // 확장자 추가
      threshold: 10240, // 10KB 이상의 파일만 압축
      deleteOriginFile: false, // 원본 파일 유지
    }),
  ],

  build: {
    outDir: "dist", // Firebase Hosting 디렉토리와 일치시킴
    sourcemap: true, // 디버깅 용도로 소스맵 활성화
    chunkSizeWarningLimit: 1500, // 청크 크기 경고 제한 늘리기
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor"; // 외부 라이브러리를 별도 청크로 분리
          }
        },
      },
      input: {
        main: "/index.html",
      },
    },
  },

  server: {
    historyApiFallback: true, // SPA 라우팅 지원
    hmr: {
      overlay: false, // HMR 에러 오버레이 비활성화
    },
  },
});
