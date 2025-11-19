import { ServiceManager } from "ace-linters/build/service-manager";
import { TypescriptService } from "ace-linters/build/typescript-service";

// The manager automatically listens to 'message' events on 'self'
let manager = new ServiceManager(self);

// Custom services to hold defaults
class CustomTypescriptService extends TypescriptService {
	constructor(mode) {
		super(mode);
		this.setGlobalOptions({
			compilerOptions: {
				// 1. Environment Setup
				allowJs: true,
				// THE FIX: Disable strict type checking for .js files.
				// This stops errors like "Property 'x' does not exist on type 'y' while still catching syntax errors (e.g. missing brackets).
				checkJs: false,

				// 2. Assume modern environment (fixes "cannot find name 'console/window/document'")
				target: 99, // ScriptTarget.ESNext
				module: 99, // ModuleKind.ESNext
				lib: ["dom", "esnext"], // Load default type definitions for Browser + JS

				// 3. Module resolution
				moduleResolution: 2, // ModuleResolutionKind.NodeJs
				allowSyntheticDefaultImports: true,
			},
		});
	}
}

// Register custom classes instead of the default module
manager.registerService("typescript", {
	module: () => {
		// We don't need to import the module dynamically anymore because we imported the class above
		// effectively bundling it into the worker.js file.
		return { TypescriptService: CustomTypescriptService };
	},
	className: "TypescriptService",
	modes: "typescript|tsx|javascript|jsx",
});

// Register other classes
manager.registerService("html", {
	features: { signatureHelp: false },
	module: () => import("ace-linters/build/html-service"),
	className: "HtmlService",
	modes: "html",
});
manager.registerService("css", {
	features: { signatureHelp: false },
	module: () => import("ace-linters/build/css-service"),
	className: "CssService",
	modes: "css",
});
manager.registerService("less", {
	features: { signatureHelp: false },
	module: () => import("ace-linters/build/css-service"),
	className: "CssService",
	modes: "less",
});
manager.registerService("scss", {
	features: { signatureHelp: false },
	module: () => import("ace-linters/build/css-service"),
	className: "CssService",
	modes: "scss",
});
manager.registerService("json", {
	features: { signatureHelp: false, documentHighlight: false },
	module: () => import("ace-linters/build/json-service"),
	className: "JsonService",
	modes: "json",
});
manager.registerService("json5", {
	features: { signatureHelp: false, documentHighlight: false },
	module: () => import("ace-linters/build/json-service"),
	className: "JsonService",
	modes: "json5",
});
manager.registerService("lua", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: true,
		hover: false,
		documentHighlight: false,
		signatureHelp: false,
	},
	module: () => import("ace-lua-linter/build/ace-lua-linter"),
	className: "AceLuaLinter",
	modes: "lua",
});
manager.registerService("yaml", {
	features: { signatureHelp: false, documentHighlight: false },
	module: () => import("ace-linters/build/yaml-service"),
	className: "YamlService",
	modes: "yaml",
});
manager.registerService("xml", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false,
	},
	module: () => import("ace-linters/build/xml-service"),
	className: "XmlService",
	modes: "xml",
});
manager.registerService("php", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: false,
		hover: false,
		documentHighlight: false,
		signatureHelp: false,
	},
	module: () => import("ace-linters/build/php-service"),
	className: "PhpService",
	modes: "php",
});
