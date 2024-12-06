import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"; // импортируем path
import { fileURLToPath } from "url"; // импортируем fileURLToPath
import { dirname } from "path"; // импортируем dirname

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@store": path.resolve(__dirname, "src/store"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@MyContext": path.resolve(__dirname, "src/MyContext"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
});
