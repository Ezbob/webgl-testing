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
    const gl = webglUtils.newWebGL2Context('#canvas')

    /* Step 2: Create the webgl program using shaders */
    const program = webglUtils.newProgramFromSources(gl, vertexShaderSource, fragmentShaderSource)

    if (program) {
        gl.useProgram(program)
    } else {
        console.error("Program not created")
        return
    }

    // Note: in webgl2 we don't need to match the attribute vector length in the shader,
    // we just have to less than or equal to the vector length
    let positions = [
        // first triangle
        10, 20,
        80, 20,
        10, 30,
        // second triangle
        10, 30,
        80, 20,
        80, 30,
    ];

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Setup vertexArrayObject that binds to the a_position variable in the shader code
    let vertexArrayObject = gl.createVertexArray();
    gl.bindVertexArray(vertexArrayObject);

    const posPtr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posPtr);
    gl.vertexAttribPointer(posPtr, 2, gl.FLOAT, false, 0, 0); 

    const resolutionPtr = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionPtr, gl.canvas.width, gl.canvas.height);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0, 0, 0, 0.7)
    gl.clear(gl.COLOR_BUFFER_BIT |  gl.DEPTH_BUFFER_BIT) // clear screen space with an transparent value

    gl.bindVertexArray(vertexArrayObject) // again "push" vertexArrayObject so we can use it
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2) // there are three primitives and data starts at the zeroth index
}

window.onload = () => {
    Promise.all([
        fetch('vertex.glsl').then(response => response.text()),
        fetch('fragment.glsl').then(response => response.text())
    ]).then(([vertexShaderCode, fragmentShaderCode]) => {
        main(vertexShaderCode, fragmentShaderCode)
    })
}