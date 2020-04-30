import {
  useGravity,
  useFriction,
  useFluidResistance,
  useGravity2D,
} from 'renature';

import { Toggle } from '../components/toggle';

export const scope = {
  useGravity,
  useFriction,
  useFluidResistance,
  useGravity2D,
  Toggle,
};

const importRegex = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

export function removeImportFromPreview(code) {
  return code.replace(importRegex, '');
}
