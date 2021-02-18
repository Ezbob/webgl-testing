import * as webglUtils from '../webgl/utils.js'
import * as m4 from '../webgl/matrix4.js'

//@ts-check

function getGeometry() {
    let geoData = [
        // left column front
        0,   0,  0,
        0, 150,  0,
        30,   0,  0,
        0, 150,  0,
        30, 150,  0,
        30,   0,  0,

        // top rung front
        30,   0,  0,
        30,  30,  0,
        100,   0,  0,
        30,  30,  0,
        100,  30,  0,
        100,   0,  0,

        // middle rung front
        30,  60,  0,
        30,  90,  0,
        67,  60,  0,
        30,  90,  0,
        67,  90,  0,
        67,  60,  0,

        // left column back
          0,   0,  30,
         30,   0,  30,
          0, 150,  30,
          0, 150,  30,
         30,   0,  30,
         30, 150,  30,

        // top rung back
         30,   0,  30,
        100,   0,  30,
         30,  30,  30,
         30,  30,  30,
        100,   0,  30,
        100,  30,  30,

        // middle rung back
         30,  60,  30,
         67,  60,  30,
         30,  90,  30,
         30,  90,  30,
         67,  60,  30,
         67,  90,  30,

        // top
          0,   0,   0,
        100,   0,   0,
        100,   0,  30,
          0,   0,   0,
        100,   0,  30,
          0,   0,  30,

        // top rung right
        100,   0,   0,
        100,  30,   0,
        100,  30,  30,
        100,   0,   0,
        100,  30,  30,
        100,   0,  30,

        // under top rung
        30,   30,   0,
        30,   30,  30,
        100,  30,  30,
        30,   30,   0,
        100,  30,  30,
        100,  30,   0,

        // between top rung and middle
        30,   30,   0,
        30,   60,  30,
        30,   30,  30,
        30,   30,   0,
        30,   60,   0,
        30,   60,  30,

        // top of middle rung
        30,   60,   0,
        67,   60,  30,
        30,   60,  30,
        30,   60,   0,
        67,   60,   0,
        67,   60,  30,

        // right of middle rung
        67,   60,   0,
        67,   90,  30,
        67,   60,  30,
        67,   60,   0,
        67,   90,   0,
        67,   90,  30,

        // bottom of middle rung.
        30,   90,   0,
        30,   90,  30,
        67,   90,  30,
        30,   90,   0,
        67,   90,  30,
        67,   90,   0,

        // right of bottom
        30,   90,   0,
        30,  150,  30,
        30,   90,  30,
        30,   90,   0,
        30,  150,   0,
        30,  150,  30,

        // bottom
        0,   150,   0,
        0,   150,  30,
        30,  150,  30,
        0,   150,   0,
        30,  150,  30,
        30,  150,   0,

        // left side
        0,   0,   0,
        0,   0,  30,
        0, 150,  30,
        0,   0,   0,
        0, 150,  30,
        0, 150,   0,
    ]

    var matrix = m4.xRotation(Math.PI);
    matrix = m4.translate(matrix, -50, -75, -15);

    for (var i = 0; i < geoData.length; i += 3) {
        var vector = m4.transformVector(matrix, [geoData[i + 0], geoData[i + 1], geoData[i + 2], 1]);
        geoData[i + 0] = vector[0];
        geoData[i + 1] = vector[1];
        geoData[i + 2] = vector[2];
    }
    return geoData
}


function getNormals() {
    return [
        // left column front
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        // top rung front
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        // middle rung front
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        // left column back
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        // top rung back
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        // middle rung back
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        // top
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        // top rung right
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        // under top rung
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        // between top rung and middle
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        // top of middle rung
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        // right of middle rung
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        // bottom of middle rung.
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        // right of bottom
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        // bottom
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        // left side
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
    ]
}


function getColor() {
    return [
        // left column front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

        // top rung front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

        // middle rung front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

        // left column back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        // top rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        // middle rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        // top
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,

        // top rung right
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,

        // under top rung
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,

        // between top rung and middle
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,

        // top of middle rung
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,

        // right of middle rung
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,

        // bottom of middle rung.
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,

        // right of bottom
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,

        // bottom
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,

        // left side
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
    ];
}

/**
 * scene drawing. the vertex shader translates the F, while input data remains the same
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLVertexArrayObject} vao 
 */
function drawScene(gl, program, vao, uniforms, data) {

    gl.enable(gl.CULL_FACE) // only draw front-facing triangles
        // a front facing triangle is triangle in which vertices are
        // described in a counter-clockwise fashion 
        // (so order matters when describing the geometry!!)

    gl.enable(gl.DEPTH_TEST)
        // enable z-buffering which makes determine the depth of front facing possible

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT) // clear screen space with an transparent value

    gl.useProgram(program)

    gl.bindVertexArray(vao)

    // projection that puts stuff stuff in a frustum. The frustum is effectively a pyramid
    // with the pointy top cutoff by a rectangular plane. Doing this is important to avoid
    // over-clipping when the camera zooms in close to some object of if some object is really far 
    // away
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let zNearPlane = 1;
    let zFarPlane = 2000;
    let projectionMatrix = m4.perspective(data.fieldOfViewRadians, aspect, zNearPlane, zFarPlane)

    let camera = [100, 150, 200]
    let target = [0, 35, 0]
    let cameraMatrix = m4.lookAt(camera, target)
    let viewMatrix = m4.inverse(cameraMatrix)
    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    let worldMatrix = m4.yRotation(data.cameraAngleRadians)
    worldMatrix = m4.scale(worldMatrix, data.scale[0], data.scale[1], data.scale[2])

    let worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix)

    // world inverse transpose matrix here makes it so that normal directions are preserved
    // when we subject the F to non-uniform scaling (scaling one axis at a time)
    let worldInverseTransposeMatrix = m4.inverse(worldMatrix)

    gl.uniformMatrix4fv(uniforms.u_worldViewProjection, false, worldViewProjectionMatrix)

    // webgl can transpose the matrix for us to transpose is set to true here
    gl.uniformMatrix4fv(uniforms.u_worldInverseTranspose, true, worldInverseTransposeMatrix)

    // coloring the F
    gl.uniform4fv(uniforms.u_color, [0.2, 1, 0.2, 1])

    // setting the reverse direction (some vector that points to the light source) of the light source
    gl.uniform3fv(uniforms.u_reverseLightDirection, m4.normalize([0.5, 0.7, 1]))

    gl.drawArrays(gl.TRIANGLES, 0, 16 * 6)
}

/**
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 * @returns {void}
 */
async function main() {
    let vertexShaderSource = await fetch('vertex.glsl').then(response => response.text())
    let fragmentShaderSource = await fetch('fragment.glsl').then(response => response.text())

    const gl = webglUtils.newWebGL2Context('#canvas')

    let data = {
        fieldOfViewRadians: webglUtils.degreesToRadians(60),
        cameraAngleRadians: webglUtils.degreesToRadians(0),
        scale: [ 1, 1, 1 ]
    };

    const program = webglUtils.newProgramFromSources(gl, vertexShaderSource, fragmentShaderSource)

    const vao = gl.createVertexArray()

    webglUtils.setupAttributes(gl, program, vao, {
        a_position: { data: getGeometry(), arity: 3, type: gl.FLOAT },
        a_normal: { data: getNormals(), arity: 3, type: gl.FLOAT }
    });

    let uniforms = webglUtils.setupUniforms(gl, program, [
        'u_worldInverseTranspose',
        'u_worldViewProjection',
        'u_color',
        'u_reverseLightDirection'
    ])

    /* drawing and ui  */
    const redraw = () => {
        drawScene(gl, program, vao, uniforms, data)
    }

    redraw()

    const angle_converter = value => {
        data.cameraAngleRadians = webglUtils.degreesToRadians(Number(value))
        redraw()
    }

    const scale_converter = index => value => {
        data.scale[index] = Number(value)
        redraw()
    }

    webglUtils.setupSliders({
        "Camera angle: ": {minValue: -360, maxValue: 360, currentValue: data.cameraAngleRadians, stepValue: 0.1, handle: angle_converter},
        "X scale: ": {minValue: 1, maxValue: 3, stepValue: 0.1, handle: scale_converter(0)},
        "Y scale: ": {minValue: 1, maxValue: 3, stepValue: 0.1, handle: scale_converter(1)},
        "Z scale: ": {minValue: 1, maxValue: 3, stepValue: 0.1, handle: scale_converter(2)}
    })
}

window.onload = main