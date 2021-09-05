import { getOptions } from 'loader-utils';

export default function webpackPostPostcssLoader(source, map) {
    const options = getOptions(this);

    source = source.replace(/#\((\$[\w-_]+)\)/gm, '#{$1}');

    this.callback(null, source, map);
}
