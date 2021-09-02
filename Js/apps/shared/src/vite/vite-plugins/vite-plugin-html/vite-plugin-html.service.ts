import { Injectable } from '@nestjs/common';
import { VitePluginBaseService } from '../vite-plugin-base/vite-plugin-base.service';
import { statSync, readFileSync, writeFileSync, readdirSync, unlinkSync } from 'fs';
import { relative, basename, join, dirname } from 'path';
import hasha from 'hasha';
import cheerio from 'cheerio';
// const cheerio = require('cheerio');

function traverse(dir, list) {
    const dirList = readdirSync(dir);
    dirList.forEach(node => {
        const file = `${dir}/${node}`;
        if (statSync(file).isDirectory()) {
            traverse(file, list);
        } else {
            if (/\.js$/.test(file)) {
                list.push({ type: 'js', file });
            } else if (/\.css$/.test(file)) {
                list.push({ type: 'css', file });
            }
        }
    });
}

function isURL(url) {
    return /^(((https|http|ftp|rtsp|mms):)?\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(url);
}

export interface VitePluginHtmlOptions {
    externals?: { type: 'js' | 'css', file: string, pos?: 'before' | 'after' }[],
    inject?: string,
    publicPath?: string,
    destFile?: string
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
                return html.replace(
                    /.*/,
                    `<title>Title replaced!</title>`
                )
            },
            enforce: 'post' as any
        };
    }
}
