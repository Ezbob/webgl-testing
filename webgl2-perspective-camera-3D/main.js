import * as webglUtils from '../webgl/utils.js'
import * as m4 from '../webgl/matrix4.js'

//@ts-check

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 */
function setGeometry(gl) {
    // drawing an F out of three bawxes

    const geoData = new Float32Array([
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
    ]);


    // Center the F around the origin and Flip it around. We do this because
    // we're in 3D now with and +Y is up where as before when we started with 2D
    // we had +Y as down.

    // We could do by changing all the values above but I'm lazy.
    // We could also do it with a matrix at draw time but you should
    // never do stuff at draw time if you can do it at init time.
    var matrix = m4.xRotation(Math.PI);
    matrix = m4.translate(matrix, -50, -75, -15);

    for (var i = 0; i < geoData.length; i += 3) {
        var vector = m4.transformVector(matrix, [geoData[i + 0], geoData[i + 1], geoData[i + 2], 1]);
        geoData[i + 0] = vector[0];
        geoData[i + 1] = vector[1];
        geoData[i + 2] = vector[2];
    }

    gl.bufferData(
        gl.ARRAY_BUFFER,
        geoData,
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

    const radius = 200;
    const nFs = 5;

    // projection that puts stuff stuff in a frustum. The frustum is effectively a pyramid
    // with the pointy top cutoff by a rectangular plane. Doing this is important to avoid
    // over-clipping when the camera zooms in close to some object of if some object is really far 
    // away
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let zNearPlane = 1;
    let zFarPlane = 2000;
    let projectionMatrix = m4.perspective(data.fieldOfViewRadians, aspect, zNearPlane, zFarPlane)

    // camera trick; we create an cameraMatrix moves this the way we want, and
    // compute the inverse to get the movement of how everything will be moved
    // relative to the camera if that camera movement was done
    let cameraMatrix = m4.yRotation(data.cameraAngleRadians)
    cameraMatrix = m4.translate(cameraMatrix, 0, 50, radius * 1.5);

    let fPosition = [radius, 0, 0];

    // camera row from camera matrix
    let cameraPos = [
        cameraMatrix[12],
        cameraMatrix[13],
        cameraMatrix[14]
    ];

    let up = [0, 1, 0];

    // make the camera look at an F at fPosition  twelve o'clock
    cameraMatrix = m4.lookAt(cameraPos, fPosition, up);

    // now compute the view matrix which how the world inside the frustum will look
    let viewMatrix = m4.inverse(cameraMatrix);
    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    // let draw nFs F in a circle
    for (let i = 0; i < nFs; ++i) {
        let angle = i * Math.PI * 2 / nFs;

        let x = Math.cos(angle) * radius;
        let z = Math.sin(angle) * radius;

        let matrix = m4.translate(viewProjectionMatrix, x, 0, z);

        gl.uniformMatrix4fv(position.transformPtr, false, matrix);

        let primitiveType = gl.TRIANGLES;
        let offset = 0;
        let count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }

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

    let fieldOfViewRadians = webglUtils.degreesToRadians(60)
    let cameraAngleRadians = webglUtils.degreesToRadians(0)

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
            {cameraAngleRadians, fieldOfViewRadians}
        )
    }

    redraw()

    let ui_section = webglUtils.getUiSection()

    let sliders = [
       webglUtils.addSlider(
        'Camera angle:',
        {minValue: -360, maxValue: 360, currentValue: cameraAngleRadians, stepValue: 0.1},
        value => {
            cameraAngleRadians = webglUtils.degreesToRadians(Number(value))
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