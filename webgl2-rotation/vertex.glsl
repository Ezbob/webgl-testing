#version 300 es

in vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_rotation;
uniform vec2 u_translation;

/*
 * 2D rotate by radians.
 * This rotates the vector around the origin
 */
vec2 rotate(vec2 non_rotated) {
  return vec2(
    non_rotated.x * u_rotation.y + non_rotated.y * u_rotation.x,
    non_rotated.y * u_rotation.y - non_rotated.x * u_rotation.x
  );
}

/*
 * 2D translation.
 * This translates from the origin
 */
vec2 translate(vec2 non_translated) {
  return non_translated + u_translation;
}

/*
 * Converts our positions (in pixels) to
 * clipspace
 */
vec2 convertToClipSpace(vec2 position) {
  vec2 ratio = position / u_resolution;
  return ((ratio * 2.0) - 1.0) * vec2(1, -1);
}

void main() {
  vec2 rotated = rotate(a_position);
  vec2 translated = translate(rotated);
  vec2 clipspace = convertToClipSpace(translated);
  gl_Position = vec4(clipspace, 0, 1);
}