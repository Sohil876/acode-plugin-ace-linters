import { LanguageProvider } from "ace-linters/build/ace-linters";
import plugin from "../plugin.json";

class AcodeAceLinters {
	async init() {
		this.baseUrl = this.baseUrl.endsWith("/")
			? this.baseUrl
			: this.baseUrl + "/";
		const workerBlob = this.createWorkerBlob();
		const workerUrl = URL.createObjectURL(workerBlob);

		this.worker = new Worker(workerUrl);
		this.provider = LanguageProvider.create(this.worker);
		this.provider.registerEditor(editorManager.editor);

		const extensions = [
			"json",
			"json5",
			"xml",
			"html",
			"css",
			"scss",
			"less",
			"javascript",
			"typescript",
			"tsx",
			"jsx",
			"lua",
			"yaml",
			"php",
		];
		acode.registerFormatter(plugin.id, extensions, () => {
			this.provider.format();
		});

		window.toast("Ace Linters: Loaded successfully");
	}

	createWorkerBlob() {
		// This list should match the files we copied to 'dist' in esbuild config
		const services = [
			{
				name: "json",
				script: "json-service.js",
				className: "JsonService",
				modes: "json|json5",
			},
			{
				name: "html",
				script: "html-service.js",
				className: "HtmlService",
				modes: "html",
			},
			{
				name: "css",
				script: "css-service.js",
				className: "CssService",
				modes: "css",
			},
			{
				name: "less",
				script: "css-service.js",
				className: "CssService",
				modes: "less",
			},
			{
				name: "scss",
				script: "css-service.js",
				className: "CssService",
				modes: "scss",
			},
			{
				name: "typescript",
				script: "typescript-service.js",
				className: "TypescriptService",
				modes: "typescript|tsx|javascript|jsx",
			},
			{
				name: "lua",
				script: "ace-lua-linter.js",
				className: "AceLuaLinter",
				modes: "lua",
			},
			{
				name: "yaml",
				script: "yaml-service.js",
				className: "YamlService",
				modes: "yaml",
			},
			{
				name: "xml",
				script: "xml-service.js",
				className: "XmlService",
				modes: "xml",
			},
			{
				name: "php",
				script: "php-service.js",
				className: "PhpService",
				modes: "php",
			},
		];

		// We construct the worker code as a string.
		// Note: We use `importScripts` which works inside the Blob worker because we pass the absolute `baseUrl` to locate the files.
		const workerCode = `
            try {
                importScripts("${this.baseUrl}service-manager.js");
                const manager = new ServiceManager(self);
                
                ${services
									.map(
										(s) => `
                    manager.registerService("${s.name}", {
                        module: () => {
                            importScripts("${this.baseUrl}${s.script}");
                            return { ${s.className} };
                        },
                        className: "${s.className}",
                        modes: "${s.modes}"
                    });
                `,
									)
									.join("\n")}
            } catch (e) {
                console.error("Worker Error:", e);
            }
        `;

		return new Blob([workerCode], { type: "application/javascript" });
	}

	async destroy() {
		if (this.provider) {
			// Safe disposal
			try {
				this.provider.dispose();
			} catch (e) {}
		}
		if (this.worker) {
			this.worker.terminate();
		}
		acode.unregisterFormatter(plugin.id);
	}
}

if (window.acode) {
	const acodePlugin = new AcodeAceLinters();
	acode.setPluginInit(
		plugin.id,
		async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
			if (!baseUrl.endsWith("/")) {
				baseUrl += "/";
			}
			acodePlugin.baseUrl = baseUrl;
			await acodePlugin.init($page, cacheFile, cacheFileUrl);
		},
	);
	acode.setPluginUnmount(plugin.id, () => {
		acodePlugin.destroy();
	});
}
