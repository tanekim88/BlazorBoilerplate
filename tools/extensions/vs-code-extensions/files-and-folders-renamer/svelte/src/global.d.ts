/// <reference types="@sveltejs/kit" />

import type { Webview } from "vscode";

interface ExtendedWebview extends Webview {
    setState: (obj: any) => void
    getState: () => any
}
declare global {
    const webview: ExtendedWebview;

}