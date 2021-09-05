import vscode, { Webview } from "vscode";
import fs from 'fs';
import path from 'path';
import { defaultRenameFilesAndFoldersState, RenameFilesAndFoldersState } from "./models/rename-files-and-folders-state";
import { renameFilesAndFoldersEvents } from "./events";

export class FilesAndFoldersRenamer {
  public static viewType = 'Rename Files And Folders View';
  private static _cache: any = {};
  public static getCachedPanel(key: Symbol) {
    return FilesAndFoldersRenamer._cache[key as any];
  }

  public static defaultOptions = {
    // Enable javascript in the webview
    enableScripts: true,

    // localResourceRoots: [
    //   vscode.Uri.joinPath(extensionUri, "svelte", "build"),
    //   vscode.Uri.joinPath(extensionUri, "src", "styles"),
    //   vscode.Uri.joinPath(extensionUri, "out"),
    // ],
  };
  public key: Symbol;

  private readonly _panel: vscode.WebviewPanel;
  _state: RenameFilesAndFoldersState | undefined;
  public static _extensionUri: vscode.Uri;

  public constructor(state: RenameFilesAndFoldersState = defaultRenameFilesAndFoldersState, panel?: vscode.WebviewPanel) {
    this.key = Symbol();

    if (state.extensionUri) {
      FilesAndFoldersRenamer._extensionUri = state.extensionUri;
    }

    state ??= defaultRenameFilesAndFoldersState;
    const column = vscode.window.activeTextEditor?.viewColumn;
    this._state = state;

    this._panel = panel ?? vscode.window.createWebviewPanel(
      FilesAndFoldersRenamer.viewType,
      "Rename Form",
      column || vscode.ViewColumn.One,
      FilesAndFoldersRenamer.defaultOptions
    );

    FilesAndFoldersRenamer._cache[this.key as any] = this._panel;

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
    let solidDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
      FilesAndFoldersRenamer._extensionUri,
      "solid"
    ));

    if (!fs.existsSync(path.join(solidDirPath.fsPath, 'assets'))) {
      solidDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
        FilesAndFoldersRenamer._extensionUri,
        'out',
        "solid"
      ));
    }

    const htmlUri = webview.asWebviewUri(vscode.Uri.joinPath(
      solidDirPath,
      "index.html"
    ));

    let html = fs.readFileSync(htmlUri.fsPath, { encoding: 'utf8' });

    let b = webview.asWebviewUri(vscode.Uri.joinPath(
      FilesAndFoldersRenamer._extensionUri,
      "src","routes", "rename-files-and-folders",
      "index.html"
    ));

    html =  fs.readFileSync(b.fsPath, { encoding: 'utf8' });
    if (html.indexOf('@buildDirPath') === -1) {
      return html;
    }

    const assetsDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
      solidDirPath,
      "assets"
    ));

    // const startJsFileBasename = fs.readdirSync(assetsDirPath.fsPath).filter(f => f.startsWith('start-'))[0];
    // const startJsFilePath = path.join(assetsDirPath.fsPath, startJsFileBasename);
    // let startJsFileContent = fs.readFileSync(startJsFilePath, { encoding: 'utf8' });
    // startJsFileContent = startJsFileContent.replace(/@assetsDirPath/g, assetsDirPath.toString());
    // fs.writeFileSync(startJsFilePath, startJsFileContent);


    // // update the base URI tag
    // html = html.replace(/@assetsDirPath/g, assetsDirPath.toString());
    html = html.replace(/@buildDirPath/g, solidDirPath.toString());
    html = html.replace(/@cspSource/g, webview.cspSource);

    fs.writeFileSync(htmlUri.fsPath, html);

    return html;
  }
}