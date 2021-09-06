import { Webview } from "vscode";
import { webviewService } from "../../../services/webview-service";
import { RenameFilesAndFoldersState } from "../models/rename-files-and-folders-state";
import { renameFilesAndFoldersService } from "../services/rename-files-and-folders.service";

class RenameFilesAndFoldersEvents {
    listen(webview: Webview, state?: RenameFilesAndFoldersState) {
        webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "get-preview": {
                    if (!data.value) {
                        return;
                    }
                    const previews = await renameFilesAndFoldersService.getPreviews(data.value);

                    await webviewService.postMessage(webview, 'preview-received', previews);
                    break;
                }
                case "commit": {
                    if (!data.value) {
                        return;
                    }

                    const previews = await renameFilesAndFoldersService.commit(data.value);

                    await webviewService.postMessage(webview, 'commit-done', previews);
                    break;
                }
                case 'get-state': {
                    await webviewService.postMessage(webview, 'state-received', state);
                    break;
                }
            }
        });
    }
}

export const renameFilesAndFoldersEvents = new RenameFilesAndFoldersEvents();