declare namespace IndexScssNamespace {
    export interface IIndexScss {
        tooltip: string;
        'tooltip-bottom': string;
        'tooltip-left': string;
        'tooltip-right': string;
        'tooltip-top': string;
        tooltiptext: string;
        'tooltiptext-fade': string;
        'tooltiptext-fade-bottomarrow': string;
        'tooltiptext-fade-leftarrow': string;
        'tooltiptext-fade-rightarrow': string;
        'tooltiptext-fade-toparrow': string;
    }
}

declare const IndexScssModule: IndexScssNamespace.IIndexScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IndexScssNamespace.IIndexScss;
};

export = IndexScssModule;
