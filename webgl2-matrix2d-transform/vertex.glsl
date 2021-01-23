#version 300 es

in vec2 a_position;
uniform vec2 u_resolution;
uniform mat3 u_transform;

/*
 * Converts our positions (in pixels) to
 * clipspace
 */
vec2 convertToClipSpace(vec2 position) {
  vec2 ratio = position / u_resolution;
  return ((ratio * 2.0) - 1.0) * vec2(1, -1);
}

void main() {
  vec2 transformed = (u_transform * vec3(a_position, 1)).xy;
  vec2 clipspace = convertToClipSpace(transformed);
  gl_Position = vec4(clipspace, 0, 1);
}