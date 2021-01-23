#version 300 es

in vec2 a_position;
uniform vec2 u_resolution;

/*
 * Converts our positions (in pixels) to
 * clipspace
 */
vec2 convertToClipSpace() {
  vec2 ratio = a_position / u_resolution;
  return ((ratio * 2.0) - 1.0) * vec2(1, -1);
}

void main() {
  vec2 clipspace = convertToClipSpace();
  gl_Position = vec4(clipspace, 0, 1);
}