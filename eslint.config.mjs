import globals from "globals"
import pluginReact from "eslint-plugin-react"
import { defineConfig, globalIgnores } from "eslint/config"

const ignores = ["node_modules/*", "build/*", "android/*", "ios/*"]

export default defineConfig([
	globalIgnores(ignores),
	{ files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
	pluginReact.configs.flat.recommended,
	{
		rules: {
			"react/react-in-jsx-scope": "off",
			"no-unused-vars": "error",
			"no-undef": "error",
			"react/prop-types": "off",
			"react/no-unescaped-entities": "off"
		},
	},
])
