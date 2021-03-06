import * as webglUtils from '../webgl/utils.js'
import * as m4 from '../webgl/matrix4.js'

//@ts-check

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 */
function setGeometry(gl) {
    // drawing an F out of three bawxes
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
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
        ]),
        gl.STATIC_DRAW
    );
}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 */
function setColor(gl) {
    gl.bufferData(gl.ARRAY_BUFFER,
        new Uint8Array([
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
        ]),
        gl.STATIC_DRAW
    );
}

/**
 * scene drawing. the vertex shader translates the F, while input data remains the same
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLVertexArrayObject} vao 
 */
function drawScene(gl, vao, position, data) {

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

    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight

    let near = 1   // z of the (top) plane of the view frustum
    let far = 2000 // z of the bottom plane of the view frustum
    let matrix = m4.perspective(data.fieldOfViewRadians, aspect, near, far)
    //matrix = m4.multiply(matrix, m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400))
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
function main(vertexShaderSource, fragmentShaderSource) {
    if (!vertexShaderSource || !fragmentShaderSource) {
        console.error("Could not find either shader code")
        return
    }

    const gl = webglUtils.newWebGL2Context('#canvas')

    let translation = [-150, 0, -360]
    let rotation = [webglUtils.degreesToRadians(190), webglUtils.degreesToRadians(40), webglUtils.degreesToRadians(30)]
    let scale = [1, 1, 1]
    let fieldOfViewRadians = webglUtils.degreesToRadians(60)

    const program = new webglUtils.WebGl2Program(gl, vertexShaderSource, fragmentShaderSource)

    const posPtr = program.getAttributeLocation("a_position")
    const colorPtr = program.getAttributeLocation("a_color")

    const transformPtr = program.getUniformLocation("u_transform")

    const vao = gl.createVertexArray()

    gl.bindVertexArray(vao) // set vao as the active vao

    /* position attribute setup */
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    setGeometry(gl) // buffers data

    gl.enableVertexAttribArray(posPtr)
    gl.vertexAttribPointer(posPtr, 3, gl.FLOAT, false, 0, 0)

    /* color attribute setup */
    const colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)

    setColor(gl) // buffers data

    gl.enableVertexAttribArray(colorPtr)
    gl.vertexAttribPointer(colorPtr, 3, gl.UNSIGNED_BYTE, true, 0, 0)
        // ^ normalizing true -> 0-255 char is mapped to 0.0-1.0 range
        // Coloring in the fragment shader uses 0.0-1.0 values


    /* drawing and ui  */
    const redraw = () => {
        drawScene(gl, vao,
            {transformPtr},
            {translation, rotation, scale, fieldOfViewRadians}
        )
    }

    redraw()

    let ui_section = webglUtils.getUiSection()

    let sliders = [
        webglUtils.addSlider(
            'Field of view:',
            {minValue: 0, maxValue: 360, stepValue: 1, currentValue: webglUtils.radiansToDegrees(fieldOfViewRadians)},
            value => {
                fieldOfViewRadians = webglUtils.degreesToRadians(Number(value))
                redraw()
            }
        ),
        webglUtils.addSlider(
            'X Scale:',
            {minValue: 1, maxValue: 6, stepValue: 0.1, currentValue: 1},
            value => {
                scale[0] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Y Scale:',
            {minValue: 1, maxValue: 6, stepValue: 0.1, currentValue: 1},
            value => {
                scale[1] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Z Scale:',
            {minValue: 1, maxValue: 6, stepValue: 0.1, currentValue: 1},
            value => {
                scale[2] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'X Rotation:',
            {minValue: 0, maxValue: 360, currentValue: webglUtils.radiansToDegrees(rotation[0])},
            value => {
                let angleInDegrees = Number(value)
                rotation[0] = webglUtils.degreesToRadians(angleInDegrees)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Y Rotation:',
            {minValue: 0, maxValue: 360, currentValue: webglUtils.radiansToDegrees(rotation[1])},
            value => {
                let angleInDegrees = Number(value)
                rotation[1] = webglUtils.degreesToRadians(angleInDegrees)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Z Rotation:',
            {minValue: 0, maxValue: 360, currentValue: webglUtils.radiansToDegrees(rotation[2])},
            value => {
                let angleInDegrees = Number(value)
                rotation[2] = webglUtils.degreesToRadians(angleInDegrees)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'X Translation:',
            {maxValue: 300, currentValue: translation[0]},
            value => {
                translation[0] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Y Translation:',
            {maxValue: 200, currentValue: translation[1]},
            value => {
                translation[1] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Z Translation:',
            {minValue: -1500, maxValue: 0, currentValue: translation[2]},
            value => {
                translation[2] = Number(value)
                redraw()
            }
        )
    ];
    sliders.forEach((value) => {
        ui_section.appendChild(value)
    })
}

window.onload = () => {
    Promise.all([
        fetch('vertex.glsl').then(response => response.text()),
        fetch('fragment.glsl').then(response => response.text())
    ]).then(([vertexShaderCode, fragmentShaderCode]) => {
        main(vertexShaderCode, fragmentShaderCode)
    })
}