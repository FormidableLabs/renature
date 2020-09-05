// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as $$Array from "bs-platform/lib/es6/array.js";
import * as Caml_array from "bs-platform/lib/es6/caml_array.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Interpolate_unit from "./Interpolate_unit.bs.js";
import * as Parse_box_shadow from "../parsers/Parse_box_shadow.bs.js";
import * as Interpolate_color from "./Interpolate_color.bs.js";
import * as NormalizeColor from "../parsers/normalizeColor";

function rgba(prim) {
  return NormalizeColor.rgba(prim);
}

function colorToRgba(color) {
  return Belt_Option.getWithDefault(Belt_Option.map(Caml_option.nullable_to_opt(NormalizeColor.normalizeColor(color)), rgba), {
              r: 0,
              g: 0,
              b: 0,
              a: 1
            });
}

function interpolateBoxShadow(param, param$1, value) {
  var rh = param[1];
  var rl = param[0];
  var fromBoxShadow = Parse_box_shadow.parseBoxShadow(param$1[0]);
  var toBoxShadow = Parse_box_shadow.parseBoxShadow(param$1[1]);
  var offsetX = Interpolate_unit.interpolateUnit([
        rl,
        rh
      ], [
        fromBoxShadow.offsetX,
        toBoxShadow.offsetX
      ], value);
  var offsetY = Interpolate_unit.interpolateUnit([
        rl,
        rh
      ], [
        fromBoxShadow.offsetY,
        toBoxShadow.offsetY
      ], value);
  var blur = Interpolate_unit.interpolateUnit([
        rl,
        rh
      ], [
        fromBoxShadow.blur,
        toBoxShadow.blur
      ], value);
  var spread = Interpolate_unit.interpolateUnit([
        rl,
        rh
      ], [
        fromBoxShadow.spread,
        toBoxShadow.spread
      ], value);
  var color = Interpolate_color.interpolateColor([
        rl,
        rh
      ], [
        colorToRgba(fromBoxShadow.color),
        colorToRgba(toBoxShadow.color)
      ], value);
  var inset = fromBoxShadow.inset && toBoxShadow.inset ? "inset " : "";
  return inset + [
            offsetX,
            offsetY,
            blur,
            spread,
            color
          ].join(" ");
}

function interpolateBoxShadows(range, param, value) {
  var dlBoxShadows = Parse_box_shadow.parseBoxShadows(param[0]);
  var dhBoxShadows = Parse_box_shadow.parseBoxShadows(param[1]);
  return $$Array.mapi((function (i, bsl) {
                  return interpolateBoxShadow(range, [
                              bsl,
                              Caml_array.caml_array_get(dhBoxShadows, i)
                            ], value);
                }), dlBoxShadows).join(", ");
}

export {
  interpolateBoxShadow ,
  interpolateBoxShadows ,
  
}
/* Parse_box_shadow Not a pure module */
