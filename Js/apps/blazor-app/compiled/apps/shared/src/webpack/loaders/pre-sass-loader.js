export default function webpackPreSassLoader(source, map) {
    source = source.replace(/\/\/PRESASSLOADER/gm, '/*PRESASSLOADER');
    source = source.replace(/\/\/POSTSASSLOADER/gm, 'POSTSASSLOADER*/');
    this.callback(null, source, map);
}
//# sourceMappingURL=pre-sass-loader.js.map