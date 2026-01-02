import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  apiUrl: string;
}

export const CONFIG = new InjectionToken<Environment>('CONFIG', {
  providedIn: 'root',
  factory: () => {
    throw new Error('CONFIG must be provided in the app config. Use provideConfig() to configure the environment.');
  },
});

export function provideConfig(config: Environment) {
  return {
    provide: CONFIG,
    useValue: config,
  };
}
