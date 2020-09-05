/* TypeScript file generated from Parse_transform.resi by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Parse_transformBS = require('./Parse_transform.bs');

// tslint:disable-next-line:interface-over-type-literal
export type cssTransform = { readonly transform: (null | undefined | string); readonly transformProperty: (null | undefined | string) };

export const testTransform: (_1:string) => boolean = Parse_transformBS.testTransform;

export const testTransforms: (_1:string) => boolean = Parse_transformBS.testTransforms;

export const parseTransform: (_1:string) => cssTransform = Parse_transformBS.parseTransform;

export const parseTransforms: (_1:string) => string[] = Parse_transformBS.parseTransforms;
