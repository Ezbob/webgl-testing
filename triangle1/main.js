import * as webglUtils from '../webgl/utils.js'

//@ts-check

/*
    Pipeline of webgl

    Vertices as input (Vertex buffer object)
        1. Vertex shader
            via drawElements and drawArray
            calculating position of each vertex and put it in varying gl_position
            calculating color texture coordinates
        2. Primitive Assembly
            triangles are assembled
        3. Rasterization
            culling: which edges and vertices is in front and visible from the view area (depth filtering)
            clipping: which edges and vertices is inside the view area, remove all outside (x and y filtering)
        4. Fragment shader
            data from vertex shader in varying variables
            primitives from rasterization 
            uses those data to calculate coloring of pixels inside polygonal faces
            the color data is stored in fragments
        5. Fragment operations
            After coloring is determined and stored in step 4; fragments are used to calculate more
            effects on each pixel. This includes
                depth 
                color buffer blend
                dithering
        6. Framebuffer
            once fragments are calculated; the information is written to framebuffer makes holds the
            scene data
            Once data the framebuffer has been written to; the primitive is rendered on screen
*/


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
        -0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0,
         0.5, -0.5, 0.0
    ];

    const indices = [0, 1, 2];

    // here we create an vertex buffer object out of vertex coordinations and
    // allocates it in the webgl context
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    // binding has the effect of "selecting" the buffer to be the one that is
    // currently getting worked on (webgl binding works like the lua stack for working with
    // embedded lua)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW)
    // draw static is an usage hint for webgl, saying that this buffer will not be changed 
    // much
    //gl.bindBuffer(gl.ARRAY_BUFFER, null); // unbind. Unselect the buffer as the current working
    // buffer

    const indexBuffer = gl.createBuffer()

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

    /* Step 4: Shader programs needs buffer objects */

    // binding the buffer where we stored the vertex data again, to make it the
    // current working buffer.
    //gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

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
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
}

window.onload = () => {
    Promise.all([
        fetch('vertex.glsl').then(response => response.text()),
        fetch('fragment.glsl').then(response => response.text())
    ]).then(([vertex, fragment]) => {
        main(vertex, fragment)
    })
}