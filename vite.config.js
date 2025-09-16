// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: "/news-explorer/",
//   plugins: [react()],
//   server: {
//     port: 3001,
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/news-explorer/" : "/",
  server: {
    port: 3001,
  },
}));
