import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "url"

export default defineConfig(() => {
	return {
		build: {
			outDir: "build",
		},
		server: {
			port: 5000,
			strictPort: true,
		},
		preview: {
			port: 5000,
			strictPort: true,
		},
		plugins: [react()],
		base: '/mediterms-frontend-staging/',
		resolve: {
			alias: {
				"@app_hooks": fileURLToPath(new URL("./src/app_hooks", import.meta.url)),
				hooks: fileURLToPath(new URL("./src/hooks", import.meta.url)),
				components: fileURLToPath(new URL("./src/components", import.meta.url)),
				context: fileURLToPath(new URL("./src/context", import.meta.url)),
				config: fileURLToPath(new URL("./src/config", import.meta.url)),
				pages: fileURLToPath(new URL("./src/pages", import.meta.url)),
				"@admin_pages": fileURLToPath(new URL("./src/pages/admin_pages", import.meta.url)),
				routing: fileURLToPath(new URL("./src/routing", import.meta.url)),
				reduxStore: fileURLToPath(new URL("./src/reduxStore", import.meta.url)),
				scripts: fileURLToPath(new URL("./src/scripts", import.meta.url)),
				styles: fileURLToPath(new URL("./src/styles", import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					quietDeps: true,
					silenceDeprecations: ["mixed-decls", "import", "color-functions", "global-builtin"],
				},
			},
		},
	}
})
