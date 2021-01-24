#version 300 es

in vec4 a_position;
in vec4 a_color;

uniform mat4 u_transform;
uniform float u_fudgeFactor;

// our first varying!
out vec4 v_color;

void main() {
  vec4 position = u_transform * a_position;

  float zToDivideBy = 1.0 + position.z * u_fudgeFactor;

  gl_Position = vec4(position.xy / zToDivideBy, position.zw);

  v_color = a_color;
}
