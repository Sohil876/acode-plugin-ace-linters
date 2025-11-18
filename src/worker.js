import { CssService } from "ace-linters/build/css-service";
import { HtmlService } from "ace-linters/build/html-service";
import { JavascriptService } from "ace-linters/build/javascript-service";
import { JsonService } from "ace-linters/build/json-service";
import { LuaService } from "ace-linters/build/lua-service";
import { PhpService } from "ace-linters/build/php-service";
import { ServiceManager } from "ace-linters/build/service-manager";
import { XmlService } from "ace-linters/build/xml-service";
import { YamlService } from "ace-linters/build/yaml-service";

// The manager automatically listens to 'message' events on 'self'
const manager = new ServiceManager(self);

manager.registerService("json", {
	className: "JsonService",
	modes: "json|json5",
	serviceInstance: new JsonService("json|json5"),
});

manager.registerService("html", {
	className: "HtmlService",
	modes: "html",
	serviceInstance: new HtmlService("html"),
});

manager.registerService("css", {
	className: "CssService",
	modes: "css",
	serviceInstance: new CssService("css"),
});

manager.registerService("scss", {
	className: "CssService",
	modes: "scss",
	serviceInstance: new CssService("scss"),
});

manager.registerService("less", {
	className: "CssService",
	modes: "less",
	serviceInstance: new CssService("less"),
});

manager.registerService("javascript", {
	className: "JavascriptService",
	modes: "javascript|typescript|tsx|jsx",
	serviceInstance: new JavascriptService("javascript|typescript|tsx|jsx"),
});

manager.registerService("lua", {
	className: "LuaService",
	modes: "lua",
	serviceInstance: new LuaService("lua"),
});

manager.registerService("yaml", {
	className: "YamlService",
	modes: "yaml",
	serviceInstance: new YamlService("yaml"),
});

manager.registerService("xml", {
	className: "XmlService",
	modes: "xml",
	serviceInstance: new XmlService("xml"),
});

manager.registerService("php", {
	className: "PhpService",
	modes: "php",
	serviceInstance: new PhpService("php"),
});
