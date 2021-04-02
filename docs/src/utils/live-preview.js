import {
  useGravity,
  useGravityGroup,
  useGravity2D,
  useFriction,
  useFrictionGroup,
  useFluidResistance,
  useFluidResistanceGroup,
  usePrefersReducedMotion,
} from 'renature';

import { Toggle } from '../components/toggle';

export const scope = {
  useGravity,
  useGravityGroup,
  useGravity2D,
  useFluidResistance,
  useFluidResistanceGroup,
  useFriction,
  useFrictionGroup,
  usePrefersReducedMotion,
  Toggle,
};

const importRegex = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

export function removeImportFromPreview(code) {
  return code.replace(importRegex, '');
}
