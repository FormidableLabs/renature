/* TypeScript file generated from Parse_color.rei by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Parse_colorBS = require('./Parse_color.bs');

// tslint:disable-next-line:interface-over-type-literal
export type rgba = {
  readonly r: number; 
  readonly g: number; 
  readonly b: number; 
  readonly a: number
};

export const testColor: (_1:string) => boolean = Parse_colorBS.testColor;

export const parseColor: (_1:number) => rgba = Parse_colorBS.parseColor;
