import { Webview } from "vscode";
import { webviewService } from "../../../services/webview-service";
import { ColorToolState } from "../models/color-tool-state";

class ColorToolEvents {
    listen(webview: Webview, state?: ColorToolState) {
        webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
      
                case 'get-state': {
                    await webviewService.postMessage(webview, 'state-received', state);
                    break;
                }
            }
        });
    }
}

export const colorToolEvents = new ColorToolEvents();