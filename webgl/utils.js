
/**
 * Create an WebGL program from vertex and fragment shader sources
 * @param {WebGLRenderingContext | WebGL2RenderingContext} gl
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 */
export function newProgramFromSources(gl, vertexShaderSource, fragmentShaderSource) {
    const createShader = (type, source) => {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
        if (success) {
            return shader
        } else {
            switch (type) {
            case gl.VERTEX_SHADER:
                throw new Error("Creating vertex shader failed: " + gl.getShaderInfoLog(shader))
            case gl.FRAGMENT_SHADER:
                throw new Error("Creating vertex shader failed: " + gl.getShaderInfoLog(shader))
            default:
                throw new Error("CreateShader reports: " + gl.getShaderInfoLog(shader))
            }
            
        }
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success) {
        return program
    } else {
        throw new Error("CreateProgram reports: " + gl.getShaderInfoLog(shader))
    }
}

/**
 * Create WebGLRenderingContext from canvas
 * @param {string} canvasQueryString 
 */
export function newWebGLContext(canvasQueryString) {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector(canvasQueryString)

    const gl = canvas.getContext("webgl")

    if (!gl) {
        console.error("Could not get WebGL context")
        return null;
    }

    return gl;
}

/**
 * Create WebGL2RenderingContext from canvas
 * @param {string} canvasQueryString 
 */
export function newWebGL2Context(canvasQueryString) {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector(canvasQueryString)

    const gl = canvas.getContext("webgl2")

    if (!gl) {
        console.error("Could not get WebGL2 context")
        return null;
    }

    return gl;
}

/**
 * Create a new vertex buffer with data filled in.
 * Buffer is unbind after the buffer is created.
 * @param {WebGLRenderingContext} gl webgl context
 * @param {Array<number>} vertexArray the data array
 * @param {number} hint defaults to gl.STATIC_DRAW
 */
export function newVertexBufferF32(gl, vertexArray, hint = gl.STATIC_DRAW) {
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), hint)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    return vertexBuffer
}

/**
 * Create a new index buffer with data filled in.
 * Buffer is unbind after the buffer is created.
 * @param {WebGLRenderingContext} gl webgl context
 * @param {Array<number>} indexArray the data array
 * @param {number} hint defaults to gl.STATIC_DRAW
 */
export function newIndexBufferU16(gl, indexArray, hint = gl.STATIC_DRAW) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), hint)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    return buffer
}

export class VertexArrayObject {

    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     * 
     */
    constructor(gl) {
        this._object = gl.createVertexArray()
        this._gl = gl
        
        /** @type {Map<number,AttributeVertexBuffer>} */
        this._attributeBuffered = new Map()
        this.activate()
    }

    activate() {
        this._gl.bindVertexArray(this._object)
    }

    get object() {
        return this._object
    }

    /** @param {number} attributePosition */
    getAttributeBuffer(attributePosition) {
        let result = this._attributeBuffered.get(attributePosition)
        if (result) {
            result.activate()
        }
        return result
    }

    attachAttribute(attributePosition, size, type, normalized = false, stride = 0, offset = 0) {
        if (this._attributeBuffered.has(attributePosition)) {
            throw new Error("Attribute already attached")
        }

        this._attributeBuffered.set(attributePosition, new AttributeVertexBuffer(
            this._gl, attributePosition, size, type, normalized, stride, offset
        ));
        return this
    }
}


export class WebGl2Program {

    /**
     * 
     * @param {WebGL2RenderingContext} gl
     * @param {string} vertexShaderSource 
     * @param {string} fragmentShaderSource 
     */
    constructor(gl, vertexShaderSource, fragmentShaderSource) {
        this._vertexShaderSource = vertexShaderSource
        this._fragmentShaderSource = fragmentShaderSource
        this._gl = gl

        this._program = newProgramFromSources(gl, this._vertexShaderSource, this._fragmentShaderSource)

        this.activate()
    }

    activate() {
        this._gl.useProgram(this._program)
    }

    get object() {
        return this._program
    }

    /**
     * @param {string} attributeName 
     */
    getAttributeLocation(attributeName) {
        return this._gl.getAttribLocation(this._program, attributeName)
    }

    /**
     * 
     * @param {string} uniformName 
     */
    getUniformLocation(uniformName) {
        return this._gl.getUniformLocation(this._program, uniformName)
    }
}

let sliderIds = 0

export function addSlider(labelText, inputFieldValues, inputHandler) {
    let container = document.createElement('div')
    let sliderId = 'input-slider-' + (sliderIds)
    sliderIds++

    if (typeof(inputFieldValues.minValue) == "undefined" 
        && typeof(inputFieldValues.currentValue) != "undefined") {
        inputFieldValues.minValue = inputFieldValues.currentValue
    }

    if (inputFieldValues.minValue > inputFieldValues.maxValue) {
        throw new Error("Max value " + inputFieldValues.maxValue + " is smaller than max " + 
                        inputFieldValues.minValue)
    }

    let currentValue = typeof(inputFieldValues.currentValue) != "undefined" 
        ? inputFieldValues.currentValue : inputFieldValues.minValue;

    let step = typeof(inputFieldValues.stepValue) != "undefined"
        ? inputFieldValues.stepValue : 1;

    container.setAttribute('class', 'slidecontainer')

    let label = document.createElement('label')

    label.setAttribute('for', sliderId)
    label.setAttribute('class', 'slidelabeltext')
    label.innerText = labelText

    let input = document.createElement('input')
    input.setAttribute('type', 'range')
    input.setAttribute('min', inputFieldValues.minValue)
    input.setAttribute('max', inputFieldValues.maxValue)
    input.setAttribute('id', sliderId)
    input.setAttribute('value', currentValue)
    input.setAttribute('step', step)

    let dataview = document.createElement('output')

    dataview.setAttribute('for', sliderId)

    dataview.innerText = currentValue

    input.oninput = function() {
        dataview.innerText = this.value
        if (inputHandler) {
            inputHandler(this.value)
        }
    }

    container.appendChild(label)
    container.appendChild(input)
    container.appendChild(dataview)

    return container
}

export function getUiSection() {
    let section = document.querySelector('#ui-section')

    if (!section) {
        section = document.createElement("section")
        section.setAttribute('id', 'ui-section')
        document.body.appendChild(section)
    }

    return section
}

export function degreesToRadians(degree) {
    return degree * Math.PI / 180
}

export function radiansToDegrees(radians) {
    return radians * 180 / Math.PI
}

/* More abstractions that helps with attribute loading */

class MalformedSchemaError extends Error {}

function validateSchema(schema) {
    const isUndefined = a => typeof a === "undefined" || a === null;
    const isNotAnObject = a => typeof a !== "object";

    for (let entryName in schema) {
        const schemaEntry = schema[entryName]
        if (isNotAnObject(schemaEntry)) throw new MalformedSchemaError(`Entry: ${entryName} is not an object`)
        if (isUndefined(schemaEntry.arity)) throw new MalformedSchemaError(`'arity' field is missing for entry: '${entryName}'`)
        if (isUndefined(schemaEntry.type)) throw new MalformedSchemaError(`'type' field is missing for entry: '${entryName}'`)
        if (isUndefined(schemaEntry.data)) throw new MalformedSchemaError(`'data' field is missing for entry: '${entryName}'`)
    }
}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLVertexArrayObject} vao 
 * @param {object} schema 
 */
export function createBufferSets(gl, vao, schema) {
    gl.bindVertexArray(vao)

    let bufferSet = {}
    for (let bufferName in schema) {
        let buffer = gl.createBuffer()

        let dict = schema[bufferName]
        let hint = dict.hint ? dict.hint : gl.STATIC_DRAW;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, dict.data, hint)
        bufferSet[bufferName] = buffer
    }
    return bufferSet
}

/**
 * 
 * @param {WebGL2RenderingContext} gl
 * @param {WebGl2Program | WebGLProgram} program
 * @param {WebGLVertexArrayObject} vao
 * @param {object} schema
 */
export function enableAttributes(gl, program, vao, schema, bufferSet) {
    gl.bindVertexArray(vao)

    for (let attributeName in schema) {
        let attributeLocation = program.getAttributeLocation(attributeName)
        let buffer = bufferSet[attributeName]
        let schemaEntry = schema[attributeName]

        let stride = schemaEntry.stride ? schemaEntry.stride : 0
        let offset = schemaEntry.offset ? schemaEntry.offset : 0
        let normalized = schemaEntry.normalized ? schemaEntry.normalized : false;

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.enableVertexAttribArray(attributeLocation)
        gl.vertexAttribPointer(attributeLocation, schemaEntry.arity, schemaEntry.type, normalized, stride, offset)
    }
}

/**
 * 
 * @param {WebGL2RenderingContext} gl
 * @param {WebGl2Program | WebGLProgram} program
 * @param {WebGLVertexArrayObject} vao
 * @param {object} schema
 */
export function setupAttributes(gl, program, vao, schema) {
    validateSchema(schema)
    const bufferSet = createBufferSets(gl, vao, schema)
    enableAttributes(gl, program, vao, schema, bufferSet)
    return bufferSet;
}