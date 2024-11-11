import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    hmr: {
      overlay: false, // HMR 에러 오버레이 비활성화
    },
  },
});
