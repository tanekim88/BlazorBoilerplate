import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';
import { dataProvider } from "./data-provider";

export class MainPage {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: MainPage | undefined;
  public static _sourceUri: vscode.Uri;

  public static readonly viewType = "main";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static async createOrShow(extensionUri: vscode.Uri, sourceUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor?.viewColumn;
    
    MainPage._sourceUri = sourceUri;

    // If we already have a panel, show it.
    if (MainPage.currentPanel) {
      MainPage.currentPanel._panel.reveal(column);
      MainPage.currentPanel._update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      MainPage.viewType,
      "Rename Form",
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // localResourceRoots: [
        //   vscode.Uri.joinPath(extensionUri, "svelte", "build"),
        //   vscode.Uri.joinPath(extensionUri, "src", "styles"),
        //   vscode.Uri.joinPath(extensionUri, "out"),
        // ],
      }
    );

    MainPage.currentPanel = new MainPage(panel, extensionUri);
  }

  public static kill() {
    MainPage.currentPanel?.dispose();
    MainPage.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    MainPage.currentPanel = new MainPage(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;


    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    const webview = this._panel.webview
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "fetch-preview": {
          if (!data.value) {
            return;
          }
          const previews = await dataProvider.fetchPreview(data.value);

          await webview.postMessage({
            type: 'preview-fetched',
            value: previews
          });

          break;
        }
        case "commit": {
          if (!data.value) {
            return;
          }

          await dataProvider.commit(data.value);

          await webview.postMessage({
            type: 'commit-done',
            value: true
          });

          break;
        }
        case 'fetch-source': {
          await MainPage.sendPostFetchedEvent(webview);

          break;
        }
      }
    });
  }
  public static async sendPostFetchedEvent(webview: vscode.Webview | undefined) {
    await webview?.postMessage({
      type: 'source-fetched',
      value: MainPage._sourceUri?.fsPath
    });
  }

  public dispose() {
    MainPage.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      x?.dispose();
    }
  }

  private async _update() {
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview);
    await MainPage.sendPostFetchedEvent(MainPage.currentPanel?._panel.webview);
  }

  ranOnce = false;

  private _getHtmlForWebview(webview: vscode.Webview) {
    // // And the uri we use to load this script in the webview

    // Uri to load styles into webview
    const buildDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
      this._extensionUri,
      "svelte",
      'build'
    ));

    const htmlUri = webview.asWebviewUri(vscode.Uri.joinPath(
      buildDirPath,
      "index.html"
    ));

    let html = fs.readFileSync(htmlUri.fsPath, { encoding: 'utf8' });

    if (this.ranOnce) {
      return html;
    }

    const _appDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
      buildDirPath,
      "_app"
    ));

    const startJsFileBasename = fs.readdirSync(_appDirPath.fsPath).filter(f => f.startsWith('start-'))[0];
    const startJsFilePath = path.join(_appDirPath.fsPath, startJsFileBasename);
    let startJsFileContent = fs.readFileSync(startJsFilePath, { encoding: 'utf8' });
    startJsFileContent = startJsFileContent.replace(/@_appDirPath/g, _appDirPath.toString());
    fs.writeFileSync(startJsFilePath, startJsFileContent);


    // update the base URI tag
    html = html.replace(/@_appDirPath/g, _appDirPath.toString());
    html = html.replace(/@buildDirPath/g, buildDirPath.toString());
    html = html.replace(/@cspSource/g, webview.cspSource);

    fs.writeFileSync(htmlUri.fsPath, html);

    this.ranOnce = true;

    return html;
  }
}