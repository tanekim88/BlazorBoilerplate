/// <reference types="@sveltejs/kit" />

import type { Webview } from "vscode";

declare global{
    const tsvscode: Webview;

}