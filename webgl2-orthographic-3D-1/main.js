import * as webglUtils from '../webgl/utils.js'
import * as m4 from '../webgl/matrix4.js'

//@ts-check

function getGeometry() {
    // drawing an F out of three bawxes
    return [
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
    ];
}

function getColor(gl) {
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
function drawScene(gl, vao, program, position, data) {

    gl.useProgram(program)

    gl.enable(gl.CULL_FACE) // only draw front-facing triangles
        // a front facing triangle is triangle in which vertices are
        // described in a counter-clockwise fashion 
        // (so order matters when describing the geometry!!)

    gl.enable(gl.DEPTH_TEST)
        // enable z-buffering which makes determine the depth of front facing possible

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT) // clear screen space with an transparent value

    gl.bindVertexArray(vao)


    let left = 0
    let right = gl.canvas.clientWidth
    let bottom = gl.canvas.clientHeight
    let top = 0
    let near = 400
    let far = -400

    let matrix = m4.orthographic(left, right, bottom, top, near, far)
    matrix = m4.translate(matrix, data.translation[0], data.translation[1], data.translation[2])
    matrix = m4.xRotate(matrix, data.rotation[0])
    matrix = m4.yRotate(matrix, data.rotation[1])
    matrix = m4.zRotate(matrix, data.rotation[2])
    matrix = m4.scale(matrix, data.scale[0], data.scale[1], data.scale[2])

    gl.uniformMatrix4fv(position.transformPtr, false, matrix)

    let triangleCount = 16 * 6; // to make the geometry more 3D like we have to have 16 rectangles
                                // of 2 triangles each (which themselves consist of 3 vertices)
    let offset = 0
    gl.drawArrays(gl.TRIANGLES, offset, triangleCount)

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

    let state = {
        translation: [45, 150, 0],
        rotation: [webglUtils.degreesToRadians(40), webglUtils.degreesToRadians(25), webglUtils.degreesToRadians(325)],
        scale: [1, 1, 1],
        color: [Math.random(), Math.random(), Math.random(), 1]
    }

    const program = webglUtils.newProgramFromSources(gl, vertexShaderSource, fragmentShaderSource)

    const transformPtr = gl.getUniformLocation(program, "u_transform")

    const vao = gl.createVertexArray()

    webglUtils.setupAttributes(gl, program, vao, {
        a_position: { data: getGeometry(), arity: 3, type: gl.FLOAT },
        a_color:    { data: getColor(), arity: 3, type: gl.UNSIGNED_BYTE, normalized: true }
    });


    /* drawing and ui  */
    const redraw = () => {
        drawScene(gl, vao, program,
            {transformPtr},
            state
        )
    }

    redraw()

    let scaleValues = {
        minValue: -3,
        maxValue: 3,
        stepValue: 0.1,
        currentValue: 1,
    };

    let rotationLimits = {minValue: 0, maxValue: 360}
    let translationLimits = {minValue: 0, maxValue: 300}

    webglUtils.setupSliders({
        'X Scale:': {
            ...scaleValues,
            handle: value => {
                state.scale[0] = Number(value)
                redraw()
            }
        },
        'Y Scale:': {
            ...scaleValues,
            handle: value => {
                state.scale[1] = Number(value)
                redraw()
            }
        },
        'Z Scale:': {
            ...scaleValues,
            handle: value => {
                state.scale[2] = Number(value)
                redraw()
            }
        },
        'X Rotation:': {
            ...rotationLimits,
            currentValue: state.rotation[0],
            handle: value => {
                state.rotation[0] = webglUtils.degreesToRadians(Number(value))
                redraw()
            }
        },
        'Y Rotation:': {
            ...rotationLimits,
            currentValue: state.rotation[1],
            handle: value => {
                state.rotation[1] = webglUtils.degreesToRadians(Number(value))
                redraw()
            }
        },
        'Z Rotation:': {
            ...rotationLimits,
            currentValue: state.rotation[2],
            handle: value => {
                state.rotation[2] = webglUtils.degreesToRadians(Number(value))
                redraw()
            }
        },
        'X Translation:': {
            ...translationLimits,
            currentValue: state.translation[0],
            handle: value => {
                state.translation[0] = Number(value)
                redraw()
            }
        },
        'Y Translation:': {
            ...translationLimits,
            currentValue: state.translation[1],
            handle: value => {
                state.translation[1] = Number(value)
                redraw()
            }
        },
        'Z Translation:': {
            ...translationLimits,
            currentValue: state.translation[2],
            handle: value => {
                state.translation[2] = Number(value)
                redraw()
            }
        }
    });
}

window.onload = main