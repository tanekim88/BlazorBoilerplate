import _ from 'lodash';

export type Action = 'ts-to-json' | 'copy' | 'scss-to-css';

export interface ExternalsForHtml {
  html: string,
  insertAt: any
}

export interface ScriptsForHtml {
  html: string,
  insertAt: any
}



export interface Input {
  fromPath?: string,
  toRelativePath?: string,
  toName?: string,
  include?: string[],
  sourceMap?: boolean,
  relativeTo?: string,
  inPlace?: boolean,
  globOptions?: {
    ignore?: string[]
  },
  action?: Action,
  applyChunk?: boolean,
  htmlToken?: string,
  outDir?: string,
  watch?: boolean,
  baseName?: string,
}


export interface HtmlInput extends Input {

  externals?: ExternalsForHtml[]
}

export interface CopyInput extends Input {
  fromPath?: string,
  toRelativePath?: string,
  toName?: string,
  include?: string[],
  sourceMap?: boolean,
  relativeTo?: string,
  inPlace?: boolean,
  globOptions?: {
    ignore?: string[]
  },
  action?: Action,
  applyChunk?: boolean,
  htmlToken?: string,
  outDir?: string,
  watch?: boolean,
  baseName?: string,
}

export interface VitePluginGlobInputOptions {
  inputs: Input[],
  externalsForHtml?: { html: string, insertAt: any }[],
  sass?: Input[],
  copy?: Input[],
  rm?: Input[],
  empty?: Input[],
}

export interface Data {
  absFrom?: string,
  absFrom2?: string,
  from2ToFrom?: string,
  relTo?: string,
  relTo2?: string,
  relTo3?: string,
  absTo?: string,
  absTo2?: string,
  imports?: string[],
  facadeModuleId?: string,
  action?: Action,
  code?: string,
  htmlToken?: string,
  baseName?: string,
}
