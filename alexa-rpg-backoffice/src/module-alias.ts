import moduleAlias from 'module-alias';
import { join, resolve } from 'node:path';

const files = resolve(__dirname, '../');

moduleAlias.addAliases({
  '@src': join(files, 'src'),
  '@repositories': join(files, 'src', 'infra', 'db', 'repositories'),
  '@models': join(files, 'src', 'domain', 'models'),
});
