import vscode, { Webview } from "vscode";
import fs from 'fs';
import path from 'path';
import { colorToolEvents } from "./events";
import { ColorToolState, defaultColorToolState } from "./models/color-tool-state";

export class ColorTool {
  public static viewType = 'Color Tool';
  private static _cache: any = {};
  public static getCachedPanel(key: Symbol) {
    return ColorTool._cache[key as any];
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
  _state: ColorToolState | undefined;
  public static _extensionUri: vscode.Uri;

  public constructor(state: ColorToolState = defaultColorToolState, panel?: vscode.WebviewPanel) {
    this.key = Symbol();

    if (state.extensionUri) {
      ColorTool._extensionUri = state.extensionUri;
    }

    state ??= defaultColorToolState;
    const column = vscode.window.activeTextEditor?.viewColumn;
    this._state = state;

    this._panel = panel ?? vscode.window.createWebviewPanel(
      ColorTool.viewType,
      "Rename Form",
      column || vscode.ViewColumn.One,
      ColorTool.defaultOptions
    );

    ColorTool._cache[this.key as any] = this._panel;

    // Set the webview's initial html content
    this._panel.webview.html = this._getHtmlForWebview();


    this._panel.onDidDispose(() => this.dispose(), null);

    const webview = this._panel.webview;

    colorToolEvents.listen(webview, state);
  }

  public dispose() {
    // Clean up our resources
    this._panel.dispose();
  }


  private _getHtmlForWebview() {
    const webview = this._panel.webview;
    let svelteDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
      ColorTool._extensionUri,
      "svelte"
    ));

    if (!fs.existsSync(path.join(svelteDirPath.fsPath, 'index.html'))) {
      svelteDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
        ColorTool._extensionUri,
        'out',
        "svelte"
      ));
    }

    const htmlUri = webview.asWebviewUri(vscode.Uri.joinPath(
      svelteDirPath,
      "rename-files-and-folders",
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