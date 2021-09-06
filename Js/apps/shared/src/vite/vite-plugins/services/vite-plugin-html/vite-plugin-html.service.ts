import { Injectable } from '@nestjs/common';
import { VitePluginBaseService } from '../../vite-plugin-base/vite-plugin-base.service';

// const cheerio = require('cheerio');


export interface VitePluginHtmlOptions {
    externals: { html: string, insertAt: any, pos?: 'before' | 'after' }[],
}

@Injectable()
export class VitePluginHtmlService extends VitePluginBaseService {

    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {

            },
            options,
        );
    }

    createPlugin(argOptions?: VitePluginHtmlOptions) {
        const options = this.mergeService.mergeOptions(
            super.createOptions(),
            argOptions,
        ) as VitePluginHtmlOptions;

        return {
            name: 'html',
            transformIndexHtml(html) {
                const externals = options.externals ?? [];
                externals.forEach(external => {
                    let pos = external.pos;
                    if (!pos) {
                        pos = external.insertAt.includes('</') ? 'before' : 'after'
                    }
                    const replaceWith = pos == 'after' ? `$&\n${external.html}` : `${external.html}\n$&`
                    html = html.replace(
                        external.insertAt,
                        replaceWith
                    )
                });
                return html;
            },
            enforce: 'post' as any
        };
    }
}
