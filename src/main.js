import { LanguageProvider } from "ace-linters/build/ace-linters";
import plugin from "../plugin.json";

class AcodeAceLinters {
	async init() {
		this.baseUrl = this.baseUrl.endsWith("/")
			? this.baseUrl
			: this.baseUrl + "/";
		const workerUrl = this.baseUrl + "worker.js";

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
