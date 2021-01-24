#version 300 es
precision highp float;

// color varying from the vertex shader
in vec4 v_color;

out vec4 fragColoring;

void main() {
    fragColoring = v_color;
}