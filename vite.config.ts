import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: "src/lib/**/*",
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/lib/index.ts",
      fileName: "index",
      formats: ["es","cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
