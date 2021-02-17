#version 300 es

precision highp float;

// color varying from the vertex shader
in vec3 v_normal;

uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;

out vec4 fragColoring;

void main() {
    // varying get's interpolated, so it make sure it
    // is length 1 we have to normalize
    vec3 normal = normalize(v_normal);

    float light = dot(normal, u_reverseLightDirection);

    fragColoring = u_color;

    // making the color component lighter or darker
    fragColoring.rgb *= light;
}