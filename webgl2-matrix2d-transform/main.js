import * as webglUtils from '../webgl/utils.js'
import * as m3 from '../webgl/matrix3.js'

//@ts-check

function setGeometry(gl) {
    // drawing an F out of three bawxes
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            // left box
            0, 0,
            30, 0,
            0, 150,
            0, 150,
            30, 0,
            30, 150,

            // top box
            30, 0,
            100, 0,
            30, 30,
            30, 30,
            100, 0,
            100, 30,

            // middle box
            30, 60,
            67, 60,
            30, 90,
            30, 90,
            67, 60,
            67, 90

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

    let matrix = m3.identity()
    matrix = m3.projection(matrix, gl.canvas.clientWidth, gl.canvas.clientHeight)
    matrix = m3.translation(matrix, data.translation[0], data.translation[1])
    matrix = m3.rotation(matrix, data.rotation)
    matrix = m3.scaling(matrix, data.scale[0], data.scale[1])
    matrix = m3.translation(matrix, -50, -75) // moves the anchor point

    gl.uniformMatrix3fv(position.transformPtr, false, matrix)

    let triangleCount = 18
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

    let translation = [gl.canvas.width / 2, gl.canvas.height / 2]
    let color = [Math.random(), Math.random(), Math.random(), 1]
    let rotation = 0
    let scale = [1, 1]

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

    gl.vertexAttribPointer(posPtr, 2, gl.FLOAT, false, 0, 0)

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
            'Scale:',
            {minValue: -3, maxValue: 3, stepValue: 0.1, currentValue: 1},
            value => {
                scale[0] = Number(value)
                scale[1] = Number(value)
                redraw()
            }
        ),
        webglUtils.addSlider(
            'Rotation:',
            {minValue: 0, maxValue: 360},
            value => {
                let angleInDegrees = Number(value)
                rotation = angleInDegrees * Math.PI / 180 
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