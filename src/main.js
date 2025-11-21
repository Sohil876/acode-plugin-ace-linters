import { LanguageProvider } from "ace-linters/build/ace-linters";
import plugin from "../plugin.json";

class AcodeAceLinters {
	constructor() {
		this.onSwitchFile = this.onSwitchFile.bind(this);
		this.lastSession = null;
	}

	async init() {
		const workerUrl = this.baseUrl + "worker.js";

		this.worker = new Worker(workerUrl);
		this.provider = LanguageProvider.create(this.worker, {
			manualSessionControl: true,
		});
		this.provider.registerEditor(editorManager.editor);

		editorManager.on("switch-file", this.onSwitchFile);

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
		];
		acode.registerFormatter(plugin.id, extensions, () => {
			this.provider.format();
		});
		this.onSwitchFile();
		window.toast("Ace Linters: Loaded successfully!");
	}

	onSwitchFile() {
		const { editor } = editorManager;
		const session = editor.session;
		const file = editorManager.activeFile;

		// Safety checks
		if (!session || !file) return;

		if (this.lastSession && this.lastSession !== session) {
			this.lastSession.clearAnnotations();
			this.lastSession.clearBreakpoints();
			this.provider.closeDocument(this.lastSession);
		}

		const options = {
			filePath: file.filename || "unknown.txt",
			joinWorkspaceURI: false,
		};
		this.provider.registerSession(session, editor, options);
		this.lastSession = session;
	}

	async destroy() {
		editorManager.off("switch-file", this.onSwitchFile);
		try {
			acode.unregisterFormatter(plugin.id);
		} catch (e) {}

		try {
			if (this.lastSession) {
				this.lastSession.clearAnnotations();
				this.lastSession.clearBreakpoints();
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
