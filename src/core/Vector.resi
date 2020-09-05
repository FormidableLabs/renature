export type vector<'a> = ('a, 'a)
export type t<'a> = vector<'a>

export add: (~v1: vector<int>, ~v2: vector<int>) => vector<int>
export addf: (~v1: vector<float>, ~v2: vector<float>) => vector<float>

export sub: (~v1: vector<int>, ~v2: vector<int>) => vector<int>
export subf: (~v1: vector<float>, ~v2: vector<float>) => vector<float>

export mult: (~v: vector<int>, ~s: int) => vector<int>
export multf: (~v: vector<float>, ~s: float) => vector<float>

export div: (~v: vector<int>, ~s: int) => vector<int>
export divf: (~v: vector<float>, ~s: float) => vector<float>

export mag: vector<int> => float
export magf: vector<float> => float

export norm: vector<int> => vector<float>
export normf: vector<float> => vector<float>

export lerpV: (~acc: vector<int>, ~target: vector<int>, ~roundness: float) => vector<int>
export lerpfV: (~acc: vector<float>, ~target: vector<float>, ~roundness: float) => vector<float>
