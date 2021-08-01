// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MainPage } from './main-page';
import { Sidebar } from './sidebar';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	// item.text = "$(beaker) Great";
	// item.command = "files-and-folders-renamer.open-rename-files-and-folders-form";
	// item.show();

	const sidebar = new Sidebar(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"sidebar",
			sidebar
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('files-and-folders-renamer.open-rename-files-and-folders-form', async () => {
			MainPage.createOrShow(context.extensionUri);
		}));


	context.subscriptions.push(
		vscode.commands.registerCommand('files-and-folders-renamer.refresh', async () => {

			// await vscode.commands.executeCommand(
			// 	"workbench.action.closeSidebar"
			// );

			// await vscode.commands.executeCommand(
			// 	"workbench.view.extension.sidebar-view"
			// );

			MainPage.kill();
			MainPage.createOrShow(context.extensionUri);


			setTimeout(() => {
				vscode.commands.executeCommand(
					"workbench.action.webview.openDeveloperTools"
				);
			}, 500);
		}));

}

// this method is called when your extension is deactivated
export function deactivate() { }
