/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from 'inversify';
import { resolve } from 'node:path';

import { importClassesFromDirectories } from './import-classes-from-dirs';

const container = new Container();

export function configDependencies(): Container {
  try {
    const useCasesPaths = resolve(__dirname, '..', 'domain', 'usecases', '**', '**', '*.usecase.{ts,js}');
    const reposPaths = resolve(__dirname, '..', 'infra', 'db', 'repositories', '**', '*.repository.{ts,js}');

    const useCases = importClassesFromDirectories([useCasesPaths]);
    console.log(`Use-cases injected = ${useCases.length}`);

    const repos = importClassesFromDirectories([reposPaths]);
    console.log(`Repositories injected = ${repos.length}`);

    [...useCases, ...repos].forEach((injClass: any) => container.bind(injClass.name).to(injClass));

    return container;
  } catch (err) {
    console.warn(err);

    throw new Error('Error on config dependencies');
  }
}
