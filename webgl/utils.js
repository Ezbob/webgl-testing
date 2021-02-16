
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

/**
 * @param {object} schema 
 */
export function setupSliders(schema) {
    let ui_section = getUiSection()
    for (let slider_text in schema) {
        let entry = schema[slider_text]
        let slider = addSlider(slider_text, entry, entry.handle)
        ui_section.appendChild(slider)
    }
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
 * @typedef {(
 *   {[buffer_name: string]: {
 *         type: number,
 *         arity: number,
 *         data: Array<Number> | Float32Array | Int32Array | Uint32Array,
 *         hint?: number,
 *         stride?: number,
 *         offset?: number,
 *         normalized?: boolean
 *    }}
 * )} AttributeSchema
 * 
 * @typedef {({ [buffer_name: string]: WebGLBuffer })} BufferSet
 * 
 * @typedef {( {[uniform_name: string]: { location?: number, transpose?:boolean }} )} UniformSchema
 */

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLVertexArrayObject} vao 
 * @param {AttributeSchema} schema 
 * @returns { BufferSet }
 */
export function createBufferSets(gl, vao, schema) {
    gl.bindVertexArray(vao)

    let bufferSet = {}
    for (let bufferName in schema) {
        let buffer = gl.createBuffer()

        let dict = schema[bufferName]
        let hint = dict.hint ? dict.hint : gl.STATIC_DRAW;

        let data = null
        if (dict.data instanceof Array) {
            let cons = glTypeToTypedArrayCons(gl, dict.type)
            data = new cons(dict.data)
        } else {
            data = dict.data
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, hint)
        bufferSet[bufferName] = buffer
    }
    return bufferSet
}



/**
 * 
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 * @param {WebGLVertexArrayObject} vao
 * @param { AttributeSchema } schema
 * @param { BufferSet } bufferSet
 */
export function enableAttributes(gl, program, vao, schema, bufferSet) {
    gl.bindVertexArray(vao)

    for (let attributeName in schema) {
        let attributeLocation = gl.getAttribLocation(program, attributeName)
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
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 * @param {WebGLVertexArrayObject} vao
 * @param {AttributeSchema} schema
 */
export function setupAttributes(gl, program, vao, schema) {
    validateSchema(schema)
    const bufferSet = createBufferSets(gl, vao, schema)
    enableAttributes(gl, program, vao, schema, bufferSet)
    return bufferSet;
}

/**
 * Returns a matching TypedArray constructor for an WebGL type
 * @param {WebGL2RenderingContext} gl 
 * @param {number} gltype 
 */
export function glTypeToTypedArrayCons(gl, gltype) {
    switch(gltype) {
        case gl.BYTE:
            return Int8Array;
        case gl.UNSIGNED_BYTE:
            return Uint8Array;
        case gl.SHORT:
            return Int16Array;
        case gl.UNSIGNED_SHORT:
            return Uint16Array;
        case gl.INT:
            return Int32Array;
        case gl.UNSIGNED_INT:
            return Uint32Array;
        case gl.UNSIGNED_SHORT_4_4_4_4:
            return Uint16Array;
        case gl.UNSIGNED_SHORT_5_5_5_1:
            return Uint16Array;
        case gl.UNSIGNED_SHORT_5_6_5:
            return Uint16Array;
        case gl.FLOAT:
            return Float32Array;
        case gl.HALF_FLOAT:
            return Uint16Array;
        case gl.UNSIGNED_INT_10F_11F_11F_REV:
            return Uint32Array;
        case gl.UNSIGNED_INT_2_10_10_10_REV:
            return Uint32Array;
        case gl.UNSIGNED_INT_5_9_9_9_REV:
            return Uint32Array;
        case gl.FLOAT_32_UNSIGNED_INT_24_8_REV:
            return Uint32Array;
        case gl.UNSIGNED_INT_24_8:
            return Uint32Array;
        default:
            throw new Error("Cons for GLType not found")
    }
}

/**
 * Returns a matching TypedArray constructor for an WebGL type
 * @param {WebGL2RenderingContext} gl 
 */
export function typedArrayToGltype(gl, typeArrayInstance) {

    if (typeArrayInstance instanceof Int8Array) {
        return gl.BYTE
    } else if (typeArrayInstance instanceof Uint8Array) {
        return gl.UNSIGNED_BYTE
    } else if (typeArrayInstance instanceof Int16Array) {
        return gl.SHORT
    } else if (typeArrayInstance instanceof Uint16Array) {
        return gl.UNSIGNED_SHORT
    } else if (typeArrayInstance instanceof Int32Array) {
        return gl.INT
    } else if (typeArrayInstance instanceof Uint32Array) {
        return gl.UNSIGNED_INT
    } else if (typeArrayInstance instanceof Float32Array) {
        return gl.FLOAT
    } else {
        throw new Error("No match for type array instance")
    }
}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLProgram} program 
 * @param {UniformSchema} schema
 */
export function setupUniforms(gl, program, schema) {
   let result = {}
    for (let uniform_name in schema) {
        result[uniform_name] = {
            location: gl.getUniformLocation(program, uniform_name),
            transpose: !!schema[uniform_name].transpose
        }
   }

   return result;
}