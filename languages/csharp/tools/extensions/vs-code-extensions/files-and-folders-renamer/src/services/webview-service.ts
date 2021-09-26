import { Webview } from "vscode";


class WebviewService {
    async postMessage<T>(webview: Webview, name: string, data: T) {
        return await webview.postMessage({ type: name, value: data });
    }
}


export const webviewService = new WebviewService();