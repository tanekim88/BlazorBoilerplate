var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { VitePluginBaseService } from '../vite-plugin-base/vite-plugin-base.service';
let VitePluginHtmlService = class VitePluginHtmlService extends VitePluginBaseService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
    createPlugin(argOptions) {
        const options = this.mergeService.mergeOptions(super.createOptions(), argOptions);
        return {
            name: 'html',
            transformIndexHtml(html) {
                const externals = options.externals ?? [];
                externals.forEach(external => {
                    let pos = external.pos;
                    if (!pos) {
                        pos = external.insertAt.includes('</') ? 'before' : 'after';
                    }
                    const replaceWith = pos == 'after' ? `$&\n${external.html}` : `${external.html}\n$&`;
                    html = html.replace(external.insertAt, replaceWith);
                });
                return html;
            },
            enforce: 'post'
        };
    }
};
VitePluginHtmlService = __decorate([
    Injectable()
], VitePluginHtmlService);
export { VitePluginHtmlService };
//# sourceMappingURL=vite-plugin-html.service.js.map