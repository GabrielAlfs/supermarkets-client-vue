const requireModules = import.meta.globEager('./**/*.ts');

const modules = {};

Object.keys(requireModules).forEach((path) => {
  if (path.includes('index.ts')) return;
  const [moduleName, imported] = path
    .replace(/(\.\/|\.ts)/g, '')
    .toLowerCase()
    .split('/');

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true,
    };
  }

  modules[moduleName][imported] = requireModules[path].default;
});

export default modules;
