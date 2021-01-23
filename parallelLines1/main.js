import * as webglUtils from '../webgl/utils.js'

//@ts-check

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
    const gl = webglUtils.newWebGLContext('#canvas')

    /* Step 2: Create the webgl program using shaders */
    const program = webglUtils.newProgramFromSources(gl, vertexShaderSource, fragmentShaderSource)

    if (program) {
        gl.useProgram(program)
    } else {
        console.error("Program not created")
        return
    }

    /* Step 3: Define the geometry and store it in buffer objects */

    // Note: our attribute is vec2 (two dimensions). This means that
    // we the vertex data comes in pairs (illustrated by new lines)
    const vertexData = [
        -0.7, -0.1, 0.0,
        -0.3, 0.6, 0.0,
        -0.3, -0.3, 0.0,
        0.2, 0.6, 0,
        0.3, -0.3, 0,
        0.7, 0.6, 0
    ];

    const vertexBuffer = webglUtils.newVertexBufferF32(gl, vertexData)
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

    /* Step 4: Shader programs needs buffer objects */

    // binding the buffer where we stored the vertex data again, to make it the
    // current working buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // now we will associate the current working buffer with the vertex shader
    // attribute called 'a_position'
    let position = gl.getAttribLocation(program, "a_position")
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(position)

    /* Step 5: Drawing triangles! */

    // Clear the background and set an background color
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0.5, 0.5, 0.5, 0.9)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    //gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

window.onload = () => {
    Promise.all([
        fetch('vertex.glsl').then(response => response.text()),
        fetch('fragment.glsl').then(response => response.text())
    ]).then(([vertex, fragment]) => {
        main(vertex, fragment)
    })
}