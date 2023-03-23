import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";

export default {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: "build",
			assets: "build",
			fallback: null,
			precompress: false,
			strict: true,
		}),
	},
	extensions: [".svelte", ".md", ".svx"],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: [".md", ".svx"],
		}),
	],
};
