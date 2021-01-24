import * as webglUtils from '../webgl/utils.js'
import * as m4 from '../webgl/matrix4.js'

//@ts-check

function setGeometry(gl) {
    // drawing an F out of three bawxes
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            // left box
             0,   0,  0,
            30,   0,  0,
             0, 150,  0,
             0, 150,  0,
            30,   0,  0,
            30, 150,  0,

            // top box
             30,  0,  0,
            100,  0,  0,
             30, 30,  0,
             30, 30,  0,
            100,  0,  0,
            100, 30,  0,

            // middle box
            30,  60,  0,
            67,  60,  0,
            30,  90,  0,
            30,  90,  0,
            67,  60,  0,
            67,  90,  0,

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
            30,   30,  30,
            30,   60,  30,
            30,   30,   0,
            30,   60,  30,
            30,   60,   0,

            // top of middle rung
            30,   60,   0,
            30,   60,  30,
            67,   60,  30,
            30,   60,   0,
            67,   60,  30,
            67,   60,   0,

            // right of middle rung
            67,   60,   0,
            67,   60,  30,
            67,   90,  30,
            67,   60,   0,
            67,   90,  30,
            67,   90,   0,

            // bottom of middle rung.
            30,   90,   0,
            30,   90,  30,
            67,   90,  30,
            30,   90,   0,
            67,   90,  30,
            67,   90,   0,

            // right of bottom
            30,   90,   0,
            30,   90,  30,
            30,  150,  30,
            30,   90,   0,
            30,  150,  30,
            30,  150,   0,

            // bottom
            0,   150,   0,
            0,   150,  30,
            30,  150,  30,
            0,   150,   0,
            30,  150,  30,
            30,  150,   0,

            // left side
            0,     0,   0,
            0,     0,  30,
            0,   150,  30,
            0,     0,   0,
            0,   150,  30,
            0,   150,   0,
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

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT) // clear screen space with an transparent value

    gl.bindVertexArray(vao)

    gl.uniform4fv(position.colorPtr, data.color)

    let matrix = m4.identity()
    matrix = m4.projection(matrix, gl.canvas.clientWidth, gl.canvas.clientHeight, 400)
    matrix = m4.translation(matrix, data.translation[0], data.translation[1], data.translation[2])
    matrix = m4.xRotation(matrix, data.rotation[0])
    matrix = m4.yRotation(matrix, data.rotation[1])
    matrix = m4.zRotation(matrix, data.rotation[2])
    matrix = m4.scaling(matrix, data.scale[0], data.scale[1], data.scale[2])

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

    let translation = [45, 150, 0]
    let rotation = [webglUtils.degreesToRadians(40), webglUtils.degreesToRadians(25), webglUtils.degreesToRadians(325)]
    let scale = [1, 1, 1]
    let color = [Math.random(), Math.random(), Math.random(), 1]

    const program = new webglUtils.WebGl2Program(gl, vertexShaderSource, fragmentShaderSource)

    const posPtr = program.getAttributeLocation("a_position")
    const colorPtr = program.getUniformLocation("u_color")
    const transformPtr = program.getUniformLocation("u_transform")

    const bufferObject2 = gl.createBuffer()
    const vao = gl.createVertexArray()

    gl.bindVertexArray(vao) // set vao as the active vao

    gl.enableVertexAttribArray(posPtr)

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject2)

    setGeometry(gl)

    gl.vertexAttribPointer(posPtr, 3, gl.FLOAT, false, 0, 0)

    const redraw = () => {
        drawScene(gl, vao,
            {colorPtr, transformPtr},
            {translation, color, rotation, scale}
        )
    }

    redraw()

    let ui_section = webglUtils.getUiSection()

    let sliders = [
        webglUtils.addSlider(
            'X Scale:',
            {minValue: -3, maxValue: 3, stepValue: 0.1, currentValue: 1},
            value => {
                scale[0] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Y Scale:',
            {minValue: -3, maxValue: 3, stepValue: 0.1, currentValue: 1},
            value => {
                scale[1] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Z Scale:',
            {minValue: -3, maxValue: 3, stepValue: 0.1, currentValue: 1},
            value => {
                scale[2] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'X Rotation:',
            {minValue: 0, maxValue: 360},
            value => {
                let angleInDegrees = Number(value)
                rotation[0] = webglUtils.degreesToRadians(angleInDegrees)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Y Rotation:',
            {minValue: 0, maxValue: 360},
            value => {
                let angleInDegrees = Number(value)
                rotation[1] = webglUtils.degreesToRadians(angleInDegrees)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Z Rotation:',
            {minValue: 0, maxValue: 360},
            value => {
                let angleInDegrees = Number(value)
                rotation[2] = webglUtils.degreesToRadians(angleInDegrees)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'X Translation:',
            {minValue: 0, maxValue: 300, currentValue: translation[0]},
            value => {
                translation[0] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Y Translation:',
            {minValue: 0, maxValue: 200, currentValue: translation[1]},
            value => {
                translation[1] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Z Translation:',
            {minValue: 0, maxValue: 200, currentValue: translation[2]},
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