/* TypeScript file generated from Parse_unit.resi by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Parse_unitBS = require('./Parse_unit.bs');

// tslint:disable-next-line:interface-over-type-literal
export type cssUnit = { readonly value: number; readonly unit: (null | undefined | string) };

export const testUnit: (_1:string) => boolean = Parse_unitBS.testUnit;

export const parseUnit: (_1:string) => cssUnit = Parse_unitBS.parseUnit;
