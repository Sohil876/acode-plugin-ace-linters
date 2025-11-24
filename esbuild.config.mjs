import { exec } from "child_process";
import * as esbuild from "esbuild";

const isServe = process.argv.includes("--serve");

// Clear build directory before starting new build
exec("rm -rf ./dist", (err, stdout) => {
	if (err) {
		console.error("Error cleaning build directory:", err);
		return;
	}
	console.log(stdout.trim());
	console.log("Build directory cleaned!");
});

// Function to pack the ZIP file
function packZip() {
	exec("node ./pack-zip.js", (err, stdout) => {
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
const buildConfig = {
	entryPoints: ["src/main.js", "src/worker.js"],
	bundle: true,
	minify: false,
	minifyWhitespace: true,
	minifySyntax: true,
	minifyIdentifiers: false,
	keepNames: true,
	logLevel: "info",
	color: true,
	outdir: "dist",
	format: "iife",
	target: "es2022",
	define: {
		"process.env.NODE_ENV": '"production"',
		global: "self",
	},
	alias: {
		path: "path-browserify",
	},
	plugins: [zipPlugin],
};

// Main function to handle both serve and production builds
(async () => {
	if (isServe) {
		console.log("Starting development server...");

		// Watch and Serve Mode
		const ctx = await esbuild.context(buildConfig);

		await ctx.watch();
		await ctx.serve({
			servedir: ".",
			port: 3000,
		});
	} else {
		console.log("Building for production...");
		await esbuild.build(buildConfig);
		console.log("Production build complete.");
	}
})();
