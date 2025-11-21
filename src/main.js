import { LanguageProvider } from "ace-linters/build/ace-linters";
import plugin from "../plugin.json";

class AcodeAceLinters {
	async init() {
		const workerUrl = this.baseUrl + "worker.js";

		this.worker = new Worker(workerUrl);
		this.provider = LanguageProvider.create(this.worker);
		this.provider.registerEditor(editorManager.editor);

		const extensions = [
			"json",
			"json5",
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
			"py",
		];
		acode.registerFormatter(plugin.id, extensions, () => {
			this.provider.format();
		});

		window.toast("Ace Linters: Loaded successfully!");
	}

	async destroy() {
		try {
			acode.unregisterFormatter(plugin.id);
		} catch (e) {}

		try {
			if (editorManager.editor && editorManager.editor.session) {
				const session = editorManager.editor.session;
				session.clearAnnotations();
				session.clearBreakpoints();
				editorManager.editor.renderer.updateBackMarkers();
			}
		} catch (e) {
			console.warn("AceLinters: Failed to clear UI", e);
		}

		if (this.worker) {
			this.worker.terminate();
		}
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
