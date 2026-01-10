import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/", // ensures all assets work in production
    server: {
        proxy: {
        "/api": {
            target: "http://localhost:5000",
            changeOrigin: true,
            secure: false,
        },
        },
    },
});
