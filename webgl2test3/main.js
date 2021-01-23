import * as webglUtils from '../webgl/utils.js'

//@ts-check

function randomInt(range) {
    return Math.floor(Math.random() * range)
}

function setRectangle(gl, x, y, width, height) {
    let x1 = x
    let x2 = x + width
    let y1 = y
    let y2 = y + height

    let points = [
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)
}


/**
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 * @returns {void}
 */
function main(vertexShaderSource, fragmentShaderSource) {
    if (!vertexShaderSource || !fragmentShaderSource) {
        console.error("Could not find either shader code")
        return
    }

    /* Step 1: Prepare WebGL context and fetch from DOM */
    const gl = webglUtils.newWebGL2Context('#canvas')

    /* Step 2: Create the webgl program using shaders */
    const program = new webglUtils.WebGl2Program(gl, vertexShaderSource, fragmentShaderSource)

    const posPtr = program.getAttributeLocation("a_position")
    const resolutionPtr = program.getUniformLocation("u_resolution")
    const colorPtr = program.getUniformLocation("u_color")

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT) // clear screen space with an transparent value

    const vao = gl.createVertexArray()
    let bufferObject2;

    gl.bindVertexArray(vao) // set vao as the active vao

    bufferObject2 = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject2)
    gl.enableVertexAttribArray(posPtr)
    gl.vertexAttribPointer(posPtr, 2, gl.FLOAT, false, 0, 0)

    gl.uniform2f(resolutionPtr, gl.canvas.width, gl.canvas.height)

    for (let i = 0; i < 50; ++i) {
        // here we fill stuff in and then draw multiple times.

        setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300))

        gl.uniform4f(colorPtr, Math.random(), Math.random(), Math.random(), 1);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}

window.onload = () => {
    Promise.all([
        fetch('vertex.glsl').then(response => response.text()),
        fetch('fragment.glsl').then(response => response.text())
    ]).then(([vertexShaderCode, fragmentShaderCode]) => {
        main(vertexShaderCode, fragmentShaderCode)
    })
}