#version 300 es

precision highp float;

// color varying from the vertex shader
in vec3 v_normal;
in vec3 v_surfaceToLight;
in vec3 v_surfaceToView;

uniform vec4 u_color;
uniform float u_shininess;

uniform vec3 u_lightDirection;
uniform float u_limit;

out vec4 fragColoring;

void main() {
    // varying get's interpolated, so it make sure it
    // is length 1 we have to normalize
    vec3 normal = normalize(v_normal);

    vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

    float light = 0.0;
    float specular = 0.0;

    float dotFromDirection = dot(surfaceToLightDirection, - u_lightDirection);

    if (dotFromDirection >= u_limit) {
        light = dot(normal, surfaceToLightDirection);
        if (light > 0.0) {
            specular = pow(dot(normal, halfVector), u_shininess);
        }
    }

    fragColoring = u_color;

    // making the color component lighter or darker
    fragColoring.rgb *= light;

    fragColoring.rgb += specular;
}