import { CssService } from "ace-linters/build/css-service";
import { HtmlService } from "ace-linters/build/html-service";
import { JsonService } from "ace-linters/build/json-service";
import { PhpService } from "ace-linters/build/php-service";
import { ServiceManager } from "ace-linters/build/service-manager";
import { TypescriptService } from "ace-linters/build/typescript-service";
import { XmlService } from "ace-linters/build/xml-service";
import { YamlService } from "ace-linters/build/yaml-service";
import { AceLuaLinter } from "ace-lua-linter/build/ace-lua-linter";
import { PythonService } from "ace-python-ruff-linter/build/python-service";

// The manager automatically listens to 'message' events on 'self'
const manager = new ServiceManager(self);

// Custom services to hold defaults
class CustomTypescriptService extends TypescriptService {
	constructor(mode) {
		super(mode);
		this.setGlobalOptions({
			compilerOptions: {
				allowJs: true,
				checkJs: false,
				target: 99, // ESNext
				module: 99, // ESNext
				lib: ["dom", "esnext"],
				moduleResolution: 2,
				allowSyntheticDefaultImports: true,
			},
		});
	}
}

// Register custom classes instead of the default module
// NOTE: definition, typeDefinition and implementation have been disabled because they conflict with multi-cursor mode of Acode and the inability to provide file access as those features expect.
manager.registerService("typescript", {
	features: {
		completion: true,
		completionResolve: true,
		diagnostics: true,
		format: true,
		hover: true,
		documentHighlight: true,
		signatureHelp: true,
		definition: false,
		typeDefinition: false,
		implementation: false,
	},
	module: () => Promise.resolve({ TypescriptService: CustomTypescriptService }),
	className: "TypescriptService",
	modes: "typescript|tsx|javascript|jsx",
});

// Register other classes
// NOTE: definition, typeDefinition and implementation have been disabled because they conflict with multi-cursor mode of Acode and the inability to provide file access as those features expect.
manager.registerService("html", {
	features: {
		completion: true,
		completionResolve: true,
		diagnostics: true,
		format: true,
		hover: true,
		documentHighlight: true,
		signatureHelp: false,
		definition: false,
	},
	module: () => Promise.resolve({ HtmlService }),
	className: "HtmlService",
	modes: "html",
});
manager.registerService("css", {
	features: {
		completion: true,
		completionResolve: true,
		diagnostics: true,
		format: true,
		hover: true,
		documentHighlight: true,
		signatureHelp: false,
		definition: false,
	},
	module: () => Promise.resolve({ CssService }),
	className: "CssService",
	modes: "css",
});
manager.registerService("less", {
	features: {
		completion: true,
		completionResolve: true,
		diagnostics: true,
		format: true,
		hover: true,
		documentHighlight: true,
		signatureHelp: false,
		definition: false,
	},
	module: () => Promise.resolve({ CssService }),
	className: "CssService",
	modes: "less",
});
manager.registerService("scss", {
	features: {
		completion: true,
		completionResolve: true,
		diagnostics: true,
		format: true,
		hover: true,
		documentHighlight: true,
		signatureHelp: false,
		definition: false,
	},
	module: () => Promise.resolve({ CssService }),
	className: "CssService",
	modes: "scss",
});
manager.registerService("json", {
	features: {
		completion: true,
		completionResolve: true,
		diagnostics: true,
		format: true,
		hover: true,
		documentHighlight: false,
		signatureHelp: false,
		definition: false,
	},
	module: () => Promise.resolve({ JsonService }),
	className: "JsonService",
	modes: "json",
});
manager.registerService("json5", {
	features: {
		completion: true,
		completionResolve: true,
		diagnostics: true,
		format: true,
		hover: true,
		documentHighlight: false,
		signatureHelp: false,
		definition: false,
	},
	module: () => Promise.resolve({ JsonService }),
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
		definition: false,
	},
	module: () => Promise.resolve({ AceLuaLinter }),
	className: "AceLuaLinter",
	modes: "lua",
});
manager.registerService("yaml", {
	features: {
		completion: true,
		completionResolve: true,
		diagnostics: true,
		format: true,
		hover: true,
		documentHighlight: false,
		signatureHelp: false,
		definition: false,
	},
	module: () => Promise.resolve({ YamlService }),
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
		definition: false,
	},
	module: () => Promise.resolve({ XmlService }),
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
		definition: false,
	},
	module: () => Promise.resolve({ PhpService }),
	className: "PhpService",
	modes: "php",
});
manager.registerService("python", {
	features: {
		completion: false,
		completionResolve: false,
		diagnostics: true,
		format: true,
		hover: false,
		documentHighlight: false,
		signatureHelp: false,
		definition: false,
	},
	module: () => Promise.resolve({ PythonService }),
	className: "PythonService",
	modes: "python",
});
