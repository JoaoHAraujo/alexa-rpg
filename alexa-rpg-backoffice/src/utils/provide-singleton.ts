/* eslint-disable @typescript-eslint/no-explicit-any */
import { interfaces } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';

export const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>): any {
  return fluentProvide(identifier).inSingletonScope().done();
};
