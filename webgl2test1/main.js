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
        0, 0, 
        0, 0.5,
        0.7, 0
    ];

    // create buffer object. This is an container that we can put our js array into
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // line (1)
        // binding also has the effect of introducing the buffer in the WebGL as ARRAY_BUFFER
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Setup vertexArrayObject that binds to the a_position variable in the shader code
    let vertexArrayObject = gl.createVertexArray();
    gl.bindVertexArray(vertexArrayObject); // (2) like (1) we 'push' the vertex array object onto the context
    const posPtr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posPtr); // if not enabled the variable will become constant
    gl.vertexAttribPointer(posPtr, 2, gl.FLOAT, false, 0, 0); 
        // we declare the pointer and buffer (1), (2) and associated (2) -> (1)
        // (2) becoming the pointer address and (1) the value we get when 'dereferencing' (2)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        // what 2d space should web gl convert from clip space back into ? well the whole canvas!
        // so you can shrink or enlarge here if you want

    gl.clearColor(0, 0, 0, 0.7)
    gl.clear(gl.COLOR_BUFFER_BIT) // clear screen space with an transparent value

    gl.bindVertexArray(vertexArrayObject) // again "push" vertexArrayObject so we can use it
    gl.drawArrays(gl.TRIANGLES, 0, 3) // there are three primitives and data starts at the zeroth index
}

window.onload = () => {
    Promise.all([
        fetch('vertex.glsl').then(response => response.text()),
        fetch('fragment.glsl').then(response => response.text())
    ]).then(([vertexShaderCode, fragmentShaderCode]) => {
        main(vertexShaderCode, fragmentShaderCode)
    })
}