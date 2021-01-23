#version 300 es
precision highp float;

uniform vec4 u_color;

out vec4 fragColoring;

void main() {
    fragColoring = u_color;
}