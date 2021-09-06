'use strict';

// external tooling
const resolve = require('resolve');

const moduleDirectories = [ 'web_modules', 'node_modules' ];

function resolveModule(id, opts) {
  return new Promise((res, rej) => {
    resolve(id, opts, (err, path) => (err ? rej(err) : res(path)));
  });
}

module.exports = function(id, base, options) {
  const paths = options.path;

  const resolveOpts = {
    basedir: base,
    moduleDirectory: moduleDirectories.concat(options.addModulesDirectories),
    paths: paths,
    extensions: [ '.css', '.scss' ],
    packageFilter: function processPackage(pkg) {
      if (pkg.style) pkg.main = pkg.style;
      else if (!pkg.main || !/\.css$/.test(pkg.main)) pkg.main = 'index.css';
      else if (!pkg.main || !/\.scss$/.test(pkg.main)) pkg.main = 'index.scss';
      return pkg;
    },
    preserveSymlinks: false
  };

  ////////////////////////////////////////////
  if (id[0] == '~') {
    id = id.substr(1);
  }

  if (/node_modules(.+)/.test(base)) {
    const matches2 = /node_modules(.+)$/.exec(base);
    const d = matches2[1].substr(1);
    id = d + '/' + id;
  }

  const matches = /([-_\w]+)$/.exec(id);
  const name = matches[1];

  const idWithUnderscoreName = id.replace(new RegExp(`${name}$`), `_${name}`);

  return (
    resolveModule(`./${id}`, resolveOpts)
      .catch(() => resolveModule(id, resolveOpts))
      .catch(() => resolveModule(`${id}/_index.scss`, resolveOpts))
      .catch(() => resolveModule(`${id}/_${name}.scss`, resolveOpts))
      .catch(() => resolveModule(`${idWithUnderscoreName}.scss`, resolveOpts))
      ////////////////////////////////////////
      .catch(() => {
        if (paths.indexOf(base) === -1) paths.unshift(base);

        throw new Error(
          `Failed to find '${id}' or ${name} or ${base}
  in [
    ${paths.join(',\n        ')}
  ]`
        );
      })
  );
};
