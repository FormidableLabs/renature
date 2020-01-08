// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Utils from "./Utils.bs.js";
import * as Caml_int32 from "bs-platform/lib/es6/caml_int32.js";
import * as Interpolate_number from "../interpolate/Interpolate_number.bs.js";

function add(v1, v2) {
  return /* tuple */[
          v1[0] + v2[0] | 0,
          v1[1] + v2[1] | 0
        ];
}

function addf(v1, v2) {
  return /* tuple */[
          v1[0] + v2[0],
          v1[1] + v2[1]
        ];
}

function sub(v1, v2) {
  return /* tuple */[
          v1[0] - v2[0] | 0,
          v1[1] - v2[1] | 0
        ];
}

function subf(v1, v2) {
  return /* tuple */[
          v1[0] - v2[0],
          v1[1] - v2[1]
        ];
}

function mult(v, s) {
  return /* tuple */[
          Caml_int32.imul(v[0], s),
          Caml_int32.imul(v[1], s)
        ];
}

function multf(v, s) {
  return /* tuple */[
          v[0] * s,
          v[1] * s
        ];
}

function div(v, s) {
  return /* tuple */[
          Caml_int32.div(v[0], s),
          Caml_int32.div(v[1], s)
        ];
}

function divf(v, s) {
  return /* tuple */[
          v[0] / s,
          v[1] / s
        ];
}

function mag(v) {
  var x = Utils.foi(v[0]);
  var y = Utils.foi(v[1]);
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function magf(v) {
  return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
}

function norm(v) {
  var m = mag(v);
  if (m !== 0) {
    return divf(/* tuple */[
                Utils.foi(v[0]),
                Utils.foi(v[1])
              ], m);
  } else {
    return /* tuple */[
            0,
            0
          ];
  }
}

function normf(v) {
  var m = magf(v);
  if (m !== 0) {
    return divf(v, m);
  } else {
    return /* tuple */[
            0,
            0
          ];
  }
}

function lerpfV(acc, target, roundness) {
  var x = Interpolate_number.lerpf(acc[0], target[0], roundness);
  var y = Interpolate_number.lerpf(acc[1], target[1], roundness);
  return /* tuple */[
          x,
          y
        ];
}

function lerpV(acc, target, roundness) {
  var match = lerpfV(/* tuple */[
        Utils.foi(acc[0]),
        Utils.foi(acc[1])
      ], /* tuple */[
        Utils.foi(target[0]),
        Utils.foi(target[1])
      ], roundness);
  return /* tuple */[
          Utils.iof(match[0]),
          Utils.iof(match[1])
        ];
}

export {
  add ,
  addf ,
  sub ,
  subf ,
  mult ,
  multf ,
  div ,
  divf ,
  mag ,
  magf ,
  norm ,
  normf ,
  lerpV ,
  lerpfV ,
  
}
/* No side effect */
