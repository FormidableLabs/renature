/* TypeScript file generated from Parse_box_shadow.resi by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Parse_box_shadowBS = require('./Parse_box_shadow.bs');

// tslint:disable-next-line:interface-over-type-literal
export type cssBoxShadow = {
  readonly offsetX: string; 
  readonly offsetY: string; 
  readonly blur: string; 
  readonly spread: string; 
  readonly color: string; 
  readonly inset: boolean
};

export const testBoxShadow: (_1:string) => boolean = Parse_box_shadowBS.testBoxShadow;

export const testBoxShadows: (_1:string) => boolean = Parse_box_shadowBS.testBoxShadows;

export const parseBoxShadow: (_1:string) => cssBoxShadow = Parse_box_shadowBS.parseBoxShadow;

export const parseBoxShadows: (_1:string) => string[] = Parse_box_shadowBS.parseBoxShadows;
