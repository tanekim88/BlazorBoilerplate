import vscode, { Webview } from "vscode";
import fs from 'fs';
import path from 'path';
import { RenameFilesAndFoldersState } from "./models/rename-files-and-folders-state";
import { renameFilesAndFoldersEvents } from "./events";

type SymbolIndex = {
  [key: symbol | string]: string // works
}

export class RenameFilesAndFoldersView {
  public static cache: { [key: Symbol | string]: vscode.WebviewPanel } = {};

  public static defaultOptions = {
    // Enable javascript in the webview
    enableScripts: true,

    // localResourceRoots: [
    //   vscode.Uri.joinPath(extensionUri, "svelte", "build"),
    //   vscode.Uri.joinPath(extensionUri, "src", "styles"),
    //   vscode.Uri.joinPath(extensionUri, "out"),
    // ],
  };

  private readonly _panel: vscode.WebviewPanel;
  private _state: RenameFilesAndFoldersState | undefined;
  private readonly _extensionUri: vscode.Uri;

  public constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, state?: RenameFilesAndFoldersState) {
    this._extensionUri = extensionUri;

    const column = vscode.window.activeTextEditor?.viewColumn;

    this._state = state;

    // Otherwise, create a new panel.
    this._panel = panel ?? vscode.window.createWebviewPanel(
      "main",
      "Rename Form",
      column || vscode.ViewColumn.One,
      RenameFilesAndFoldersView.defaultOptions
    );

    // Set the webview's initial html content
    this._panel.webview.html = this._getHtmlForWebview();


    this._panel.onDidDispose(() => this.dispose(), null);

    const webview = this._panel.webview;

    renameFilesAndFoldersEvents.listen(webview, state);
  }

  public dispose() {
    // Clean up our resources
    this._panel.dispose();
  }


  private _getHtmlForWebview() {
    const webview = this._panel.webview;
    const svelteDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
      this._extensionUri,
      "src", "svelte"
    ));

    const htmlUri = webview.asWebviewUri(vscode.Uri.joinPath(
      svelteDirPath,
      "index.html"
    ));

    let html = fs.readFileSync(htmlUri.fsPath, { encoding: 'utf8' });

    if (html.indexOf('@buildDirPath') === -1) {
      return html;
    }

    const _appDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
      svelteDirPath,
      "_app"
    ));

    const startJsFileBasename = fs.readdirSync(_appDirPath.fsPath).filter(f => f.startsWith('start-'))[0];
    const startJsFilePath = path.join(_appDirPath.fsPath, startJsFileBasename);
    let startJsFileContent = fs.readFileSync(startJsFilePath, { encoding: 'utf8' });
    startJsFileContent = startJsFileContent.replace(/@_appDirPath/g, _appDirPath.toString());
    fs.writeFileSync(startJsFilePath, startJsFileContent);


    // update the base URI tag
    html = html.replace(/@_appDirPath/g, _appDirPath.toString());
    html = html.replace(/@buildDirPath/g, svelteDirPath.toString());
    html = html.replace(/@cspSource/g, webview.cspSource);

    fs.writeFileSync(htmlUri.fsPath, html);

    return html;
  }
}