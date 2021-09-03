import { Injectable } from '@nestjs/common';
import { VitePluginBaseService } from '../vite-plugin-base/vite-plugin-base.service';
import { statSync, readFileSync, writeFileSync, readdirSync, unlinkSync } from 'fs';
import { relative, basename, join, dirname } from 'path';
import hasha from 'hasha';
import cheerio from 'cheerio';
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

        // const { template, filename, externals, inject, publicPath } = options;
        // let destFile = options.destFile


        return {
            name: 'html',
            transformIndexHtml(html) {
                const externals = options.externals ?? [];
                externals.forEach(external => {
                    let pos = external.pos;
                    if (!pos) {
                        pos = external.html.includes('</') ? 'before' : 'after'
                    }
                    const replaceWith = external.pos == 'after' ? `$0${external.html}` : `${external.html}$0`
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
