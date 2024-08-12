import { Processor } from '../types';

import { arrayProcessor } from './arrayProcessor';
import { bigNumberProcessor } from './bigNumberProcessor';
import { defaultProcessor } from './defaultProcessor';
import { mapProcessor } from './mapProcessor';
import { objectProcessor } from './objectProcessor';

export const processors: Processor<any>[] = [
  bigNumberProcessor,
  arrayProcessor,
  mapProcessor,
  objectProcessor,
  defaultProcessor
];
