import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';
import { dataProvider, PreviewItem, MainState } from "./data-provider";


export class Index {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: Index | undefined;
  public static _sourceUri: vscode.Uri;

  public static readonly viewType = "main";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static async createOrShow(extensionUri: vscode.Uri, sourceUri: vscode.Uri, state?: MainState) {
    const column = vscode.window.activeTextEditor?.viewColumn;

    MainPage._sourceUri = sourceUri;

    // If we already have a panel, show it.
    if (MainPage.currentPanel) {
      MainPage.currentPanel._panel.reveal(column);
      MainPage.currentPanel._update(state);
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

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, state?: MainState) {
    MainPage.currentPanel = new MainPage(panel, extensionUri, state);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, state?: MainState) {
    this._panel = panel;
    this._extensionUri = extensionUri;


    // Set the webview's initial html content
    this._update(state);

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    const webview = this._panel.webview
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "get-preview": {
          if (!data.value) {
            return;
          }
          const previews = await dataProvider.getPreview(data.value);

          await webview.postMessage({
            type: 'preview-received',
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
        case 'get-state': {
          await this.sendStateRecievedEvent();
          break;
        }
      }
    });
  }

  public async sendStateRecievedEvent(state?: MainState) {
    const webview = this._panel.webview;

    await webview?.postMessage({
      type: 'state-received',
      value: state ?? { source: MainPage._sourceUri?.fsPath }
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

  private async _update(state?: MainState) {
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview);

  }


  private _getHtmlForWebview(webview: vscode.Webview) {
    // // And the uri we use to load this script in the webview

    // Uri to load styles into webview
    let svelteDirPath = vscode.Uri.joinPath(
      this._extensionUri,
      "svelte"
    );

    if (!fs.existsSync(path.join(svelteDirPath.fsPath, 'index.html'))) {
      svelteDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
        this._extensionUri,
        "out", "svelte"
      ));
    }

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