export lerpColor: (
  ~acc: Parse_color.rgba,
  ~target: Parse_color.rgba,
  ~roundness: float,
) => Parse_color.rgba

export interpolateColor: (
  ~range: (float, float),
  ~domain: (Parse_color.rgba, Parse_color.rgba),
  ~value: float,
) => string
