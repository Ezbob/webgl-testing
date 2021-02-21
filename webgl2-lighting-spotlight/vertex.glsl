#version 300 es

in vec4 a_position;
in vec3 a_normal;

uniform vec3 u_lightWorldPosition;
uniform vec3 u_viewWorldPosition;

uniform mat4 u_world;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

out vec3 v_normal;
out vec3 v_surfaceToLight;
out vec3 v_surfaceToView;

void main() {
  // tranform the geometry
  gl_Position = u_worldViewProjection * a_position;

  // orienting normals
  v_normal = mat3(u_worldInverseTranspose) * a_normal;

  // compute the world position of the surface
  vec3 surfaceWorldPosition = (u_world * a_position).xyz;

  // vector pointing from surfaces to the light source
  v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

  v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
}
