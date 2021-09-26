// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode from 'vscode';
import { FilesAndFoldersRenamer } from './routes/rename-files-and-folders';
import { defaultRenameFilesAndFoldersState, RenameFilesAndFoldersState } from './routes/rename-files-and-folders/models/rename-files-and-folders-state';
import { Sidebar } from './routes/sidebar';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	// item.text = "$(beaker) Great";
	// item.command = "files-and-folders-renamer.open-rename-files-and-folders-form";
	// item.show();

	// const sidebar = new Sidebar(context.extensionUri);
	// context.subscriptions.push(
	// 	vscode.window.registerWebviewViewProvider(
	// 		"sidebar",
	// 		sidebar
	// 	)
	// );

	context.subscriptions.push(
		vscode.commands.registerCommand('files-and-folders-renamer.view-rename-files-and-folders', async (uri: vscode.Uri) => {
			console.dir(defaultRenameFilesAndFoldersState)
			console.dir(context);
			if (uri) {
				const state = Object.assign({}, defaultRenameFilesAndFoldersState, {
					extensionUri: context.extensionUri, sourcePath: uri.fsPath
				});
				new FilesAndFoldersRenamer(state);
			}
		}));


	context.subscriptions.push(
		vscode.commands.registerCommand('files-and-folders-renamer.refresh', async (uri: vscode.Uri) => {

			// await vscode.commands.executeCommand(
			// 	"workbench.action.closeSidebar"
			// );

			// await vscode.commands.executeCommand(
			// 	"workbench.view.extension.sidebar-view"
			// );

			const state = Object.assign({}, defaultRenameFilesAndFoldersState, {
				extensionUri: context.extensionUri, sourcePath: uri?.fsPath
			});
			new FilesAndFoldersRenamer(state);
			setTimeout(() => {
				vscode.commands.executeCommand(
					"workbench.action.webview.openDeveloperTools"
				);
			}, 500);
		}));

	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(FilesAndFoldersRenamer.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: RenameFilesAndFoldersState) {

				console.log(`Got state: ${state}`);
				// Reset the webview options so we use latest uri for `localResourceRoots`.
				webviewPanel.webview.options = getWebviewOptions(context.extensionUri);

				state ??= defaultRenameFilesAndFoldersState;

				new FilesAndFoldersRenamer(state, webviewPanel);
			}
		});
	}
}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
	return {
		// Enable javascript in the webview
		enableScripts: true,

		// And restrict the webview to only loading content from our extension's `media` directory.
		// localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
	};
}

// this method is called when your extension is deactivated
export function deactivate() { }


