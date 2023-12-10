/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { extname, normalize } from 'node:path';

const loadFileClasses = (exported: any, allLoaded?: Function[]) => {
  allLoaded = allLoaded ?? [];

  switch (true) {
    case exported instanceof Function:
      allLoaded.push(exported);
      break;

    case exported instanceof Array:
      exported.forEach((i: any) => loadFileClasses(i, allLoaded));
      break;

    case exported instanceof Object || typeof exported === 'object':
      Object.keys(exported).forEach((key) => loadFileClasses(exported[key], allLoaded));

    default:
      break;
  }

  return allLoaded;
};

export function importClassesFromDirectories(directories: string[]): Function[] {
  const formats = ['.js', '.ts'];

  const allFiles = directories.reduce((allDirs, dir) => {
    return allDirs.concat(require('glob').sync(normalize(dir)));
  }, [] as string[]);

  const dirs = allFiles
    .filter((file) => formats.indexOf(extname(file)) !== -1)
    .map((file) => {
      return require(file);
    });

  return loadFileClasses(dirs);
}
