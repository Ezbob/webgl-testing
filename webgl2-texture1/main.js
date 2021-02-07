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
    var matrix = m4.translate(m4.xRotation(Math.PI), -50, -75, -15);
    //var matrix = m4.xRotate(m4.translation(-50, -75, -15), Math.PI);

    for (let i = 0; i < geoData.length; i += 3) {
        let vector = m4.transformPoint(matrix, [geoData[i + 0], geoData[i + 1], geoData[i + 2], 1]);
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
function setTexcoords(gl) {
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([
            // left column front
            0, 0,
            0, 1,
            1, 0,
            0, 1,
            1, 1,
            1, 0,

            // top rung front
            0, 0,
            0, 1,
            1, 0,
            0, 1,
            1, 1,
            1, 0,

            // middle rung front
            0, 0,
            0, 1,
            1, 0,
            0, 1,
            1, 1,
            1, 0,

            // left column back
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1,

            // top rung back
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1,

            // middle rung back
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1,

            // top
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // top rung right
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,

            // under top rung
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,

            // between top rung and middle
            0, 0,
            1, 1,
            0, 1,
            0, 0,
            1, 0,
            1, 1,

            // top of middle rung
            0, 0,
            1, 1,
            0, 1,
            0, 0,
            1, 0,
            1, 1,

            // right of middle rung
            0, 0,
            1, 1,
            0, 1,
            0, 0,
            1, 0,
            1, 1,

            // bottom of middle rung.
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,

            // right of bottom
            0, 0,
            1, 1,
            0, 1,
            0, 0,
            1, 0,
            1, 1,

            // bottom
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,

            // left side
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
        ]),
        gl.STATIC_DRAW
    );
}

class AnimationClock {
    constructor(first = 0) {
        this.then = first;
    }

    calculateDeltaTime(nowInMilliSec) {
        nowInMilliSec *= 0.001
        let dt = nowInMilliSec - this.then
        this.then = nowInMilliSec
        return dt
    }
};

let clock = new AnimationClock()

/**
 * scene drawing. the vertex shader translates the F, while input data remains the same
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLVertexArrayObject} vao 
 */
function drawScene(gl, vao, position, data, now) {

    let dt = clock.calculateDeltaTime(now)

    data.rotation[0] += 1.2 * dt;
    data.rotation[1] += 0.7 * dt;

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

    // projection that puts stuff stuff in a frustum. The frustum is effectively a pyramid
    // with the pointy top cutoff by a rectangular plane. Doing this is important to avoid
    // over-clipping when the camera zooms in close to some object of if some object is really far 
    // away
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let zNearPlane = 1;
    let zFarPlane = 2000;
    let projectionMatrix = m4.perspective(data.fieldOfViewRadians, aspect, zNearPlane, zFarPlane)


    let cameraPos = [0, 0, 200]
    let target = [0, 0, 0]
    let cameraMatrix = m4.lookAt(cameraPos, target)

    let viewMatrix = m4.inverse(cameraMatrix)

    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

    let matrix = m4.xRotate(viewProjectionMatrix, data.rotation[0])
    matrix = m4.yRotate(matrix, data.rotation[1])

    gl.uniformMatrix4fv(position.transformPtr, false, matrix)

    gl.drawArrays(gl.TRIANGLES, 0, 16 * 6)

    requestAnimationFrame((now) => {
        drawScene(gl, vao, position, data, now)
    })
}

/**
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 * @param {Blob} textureArrayBlob
 * @returns {void}
 */
async function main() {
    let [vertexShaderSource, fragmentShaderSource, imageBlob] = await Promise.all([
        fetch('vertex.glsl').then(response => response.text()),
        fetch('fragment.glsl').then(response => response.text()),
        fetch('../f-texture.png').then(response => response.blob())
    ]);

    const gl = webglUtils.newWebGL2Context('#canvas')

    let fieldOfViewRadians = webglUtils.degreesToRadians(60)
    let translation = [0, 0, -360];
    let rotation = [
        webglUtils.degreesToRadians(190),
        webglUtils.degreesToRadians(40),
        webglUtils.degreesToRadians(320)
    ];
    let scale = [1, 1, 1];
    let rotationSpeed = 1.2;

    const program = new webglUtils.WebGl2Program(gl, vertexShaderSource, fragmentShaderSource)

    const posPtr = program.getAttributeLocation("a_position")
    const texturePtr = program.getAttributeLocation("a_texcoord")

    const transformPtr = program.getUniformLocation("u_transform")

    const vao = gl.createVertexArray()

    gl.bindVertexArray(vao) // set vao as the active vao

    /* position attribute setup */
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    setGeometry(gl) // buffers data

    gl.enableVertexAttribArray(posPtr)
    gl.vertexAttribPointer(posPtr, 3, gl.FLOAT, false, 0, 0)

    /* texture attribute setup */
    const textureBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer)

    setTexcoords(gl) // buffers data

    gl.enableVertexAttribArray(texturePtr)
    gl.vertexAttribPointer(texturePtr, 2, gl.FLOAT, true, 0, 0)


    /* texture setup */
    let texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255]));


    let image = new Image();
    image.src = URL.createObjectURL(imageBlob);

    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D)
    }


    let positionPtrs = {transformPtr, texturePtr}
    let data = {
        fieldOfViewRadians,
        translation,
        rotation,
        rotationSpeed,
        scale
    }

    requestAnimationFrame((now) => {
        drawScene(gl, vao, positionPtrs, data, now)
    })

}

window.onload = main