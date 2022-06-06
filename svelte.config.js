import adapter from "@sveltejs/adapter-static";
// was "@sveltejs/adapter-auto"

/** @type {import(""@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "docs",
			assets: "docs"
		}),
		paths: {
			// change below to your repo name
			base: "",
		},
		prerender: {
			default: true
		}
	}
};

export default config;