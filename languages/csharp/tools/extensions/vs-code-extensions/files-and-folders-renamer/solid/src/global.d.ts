import type { Webview } from "vscode";

interface ExtendedWebview extends Webview {
    setState: (obj: any) => void
    getState: () => any
}
declare global {
    const webview: ExtendedWebview;

}


declare module "solid-js" {
    namespace JSX {
        interface Directives {
            formSubmit: any
            validate: any
        }
        interface ExplicitProperties {
            // prop:____
        }
        interface ExplicitAttributes {
            // attr:____
        }
        interface CustomEvents {
            // on:____
        }
        interface CustomCaptureEvents {
            // oncapture:____
        }
    }
}