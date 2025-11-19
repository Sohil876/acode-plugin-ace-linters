import { exec } from "node:child_process";
import * as esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

const isServe = process.argv.includes("--serve");

// Clear build directory before starting new build
exec("rm -rf ./dist", (err, stdout, stderr) => {
	if (err) {
		console.error("Error cleaning build directory:", err);
		return;
	}
	console.log(stdout.trim());
	console.log("Build directory cleaned!");
});

// Function to pack the ZIP file
function packZip() {
	exec("node ./pack-zip.js", (err, stdout, stderr) => {
		if (err) {
			console.error("Error packing zip:", err);
			return;
		}
		console.log(stdout.trim());
	});
}

// Custom plugin to pack ZIP after build or rebuild
const zipPlugin = {
	name: "zip-plugin",
	setup(build) {
		build.onEnd(() => {
			packZip();
		});
	},
};

// Base build configuration
let buildConfig = {
	entryPoints: ["src/main.js"],
	bundle: true,
	minify: true,
	logLevel: "info",
	color: true,
	outdir: "dist",
	format: "cjs",
	target: "es2019",
	define: {
		"process.env.NODE_ENV": '"production"',
		global: "self",
	},
	alias: {
		path: "path-browserify",
	},
	plugins: [
		// Copy the pre-compiled Ace Linter files to dist/
		// This allows us to use importScripts() in the worker blob
		copy({
			assets: [
				{
					from: [
						"./node_modules/ace-linters/build/ace-linters.js",
						"./node_modules/ace-linters/build/service-manager.js",
					],
					to: ["./"],
				},
				{
					// Explicitly list ONLY the services you registered in main.js, this prevents copying unused junk
					from: [
						"./node_modules/ace-linters/build/css-service.js",
						"./node_modules/ace-linters/build/html-service.js",
						"./node_modules/ace-linters/build/javascript-service.js",
						"./node_modules/ace-linters/build/json-service.js",
						"./node_modules/ace-linters/build/lua-service.js",
						"./node_modules/ace-linters/build/php-service.js",
						"./node_modules/ace-linters/build/typescript-service.js",
						"./node_modules/ace-linters/build/xml-service.js",
						"./node_modules/ace-linters/build/yaml-service.js",
					],
					to: ["./"],
				},
			],
		}),
		zipPlugin,
	],
};

// Main function to handle both serve and production builds
(async function () {
	if (isServe) {
		console.log("Starting development server...");

		// Watch and Serve Mode
		const ctx = await esbuild.context(buildConfig);

		await ctx.watch();
		const { host, port } = await ctx.serve({
			servedir: ".",
			port: 3000,
		});
	} else {
		console.log("Building for production...");
		await esbuild.build(buildConfig);
		console.log("Production build complete.");
	}
})();
