import * as vscode from "vscode";
import * as fs from 'fs';
import * as path from 'path';

export class Sidebar implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      // localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
       
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  
  ranOnce = false;
  private _getHtmlForWebview(webview: vscode.Webview) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>

    </head>
    <body>
 hihihi
    </body>
    </html>`;
    const buildDirPath = webview.asWebviewUri(vscode.Uri.joinPath(
      this._extensionUri,
      "svelte",
      'build'
    ));

    const htmlUri = webview.asWebviewUri(vscode.Uri.joinPath(
      buildDirPath,
      'sidebar',
      "index.html"
    ));

    let html = fs.readFileSync(htmlUri.fsPath, { encoding: 'utf8' });

    if(this.ranOnce){
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