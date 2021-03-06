//@ts-check

/**
 * pretty print matrix of a matrix
 * @param {number[]} m 
 */
export function pretty_repr(m) {

    let out = ""
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            out += m[j + 4 * i] + " "
        }
        out += "\n"
    }
    return out
}

/**
 * cross product of 3d vector with another 3d vector
 * @param {number[]} a
 * @param {number[]} b
 */
export function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}


/**
 * cross product of 3d vector with another 3d vector
 * @param {number[]} a
 * @param {number[]} b
 */
export function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ]
}

/**
 * subtract an 3d vector with another
 * @param {number[]} a
 * @param {number[]} b
 */
export function subtractVector(a, b) {
    return [
        a[0] - b[0],
        a[1] - b[1],
        a[2] - b[2]
    ]
}

/**
 * normalize an 3d vector
 * @param {number[]} v
 */
export function normalize(v) {
    let length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])

    if (length > 0.000001) {
        return [ v[0] / length, v[1] / length, v[2] / length];
    } else {
        return [0, 0, 0];
    }
}

/**
 * 
 * @param {number[]} cameraPos 
 * @param {number[]} target 
 * @param {number[]} up 
 */
export function lookAt(cameraPos, target, up = [0, 1, 0]) {
    let zAxis = normalize(subtractVector(cameraPos, target));
    let xAxis = normalize(cross(up, zAxis));
    let yAxis = normalize(cross(zAxis, xAxis))

    return [
        xAxis[0],     xAxis[1],     xAxis[2],     0,
        yAxis[0],     yAxis[1],     yAxis[2],     0,
        zAxis[0],     zAxis[1],     zAxis[2],     0,
        cameraPos[0], cameraPos[1], cameraPos[2], 1,
    ]
}

/**
 * transpose an 4x4 matrix
 * @param {number[]} m 
 */
export function transpose(m) {
    return [
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15],
    ]
}

/**
 * Returns an translation 4x4 matrix
 * @param {number} tx 
 * @param {number} ty 
 * @param {number} tz 
 */
export function translation(tx, ty, tz) {
    return [
        1,  0,  0,  0,
        0,  1,  0,  0,
        0,  0,  1,  0,
        tx, ty, tz, 1,
    ];
};

/**
 * translate m using an matrix
 * @param {Array} m
 * @param {number} tx 
 * @param {number} ty 
 * @param {number} tz 
 */
export function translate(m, tx, ty, tz) {
    return multiply(m, translation(tx, ty, tz));
};

/**
 * x axis rotation matrix
 * @param {number} radians 
 */
export function xRotation(radians) {
    let c = Math.cos(radians)
    let s = Math.sin(radians)

    return [
        1,  0,  0,  0,
        0,  c,  s,  0,
        0, -s,  c,  0,
        0,  0,  0,  1,
    ];
};

/**
 * y axis rotation matrix
 * @param {number} radians 
 */
export function yRotation(radians) {
    let c = Math.cos(radians)
    let s = Math.sin(radians)

    return [
        c,  0, -s,  0,
        0,  1,  0,  0,
        s,  0,  c,  0,
        0,  0,  0,  1,
    ];
};

/**
 * z axis rotation matrix
 * @param {number} radians 
 */
export function zRotation(radians) {
    let c = Math.cos(radians)
    let s = Math.sin(radians)

    return [
        c,  s,  0,  0,
       -s,  c,  0,  0,
        0,  0,  1,  0,
        0,  0,  0,  1,
    ];
};

/**
 * Rotate m around the x axis
 * @param {number[]} m
 * @param {number} radians 
 */
export function xRotate(m, radians) {
    return multiply(m, xRotation(radians));
};

/**
 * Rotate m around the y axis
 * @param {number[]} m
 * @param {number} radians 
 */
export function yRotate(m, radians) {
    return multiply(m, yRotation(radians));
};

/**
 * Rotate m around the y axis
 * @param {number[]} m
 * @param {number} radians 
 */
export function zRotate(m, radians) {
    return multiply(m, zRotation(radians));
};

/**
 * Return a scaling matrix
 * @param {number} sx
 * @param {number} sy
 * @param {number} sz
 */
export function scaling(sx, sy, sz) {
    return [
        sx,  0,  0,  0,
        0,  sy,  0,  0,
        0,   0,  sz, 0,
        0,   0,  0,  1,
    ];
};

/**
 * Scale m by sx, sy and sz
 * @param {number[]} m
 * @param {number} sx
 * @param {number} sy
 * @param {number} sz
 */
export function scale(m, sx, sy, sz) {
    return multiply(m, scaling(sx, sy, sz))
}

/**
 * The identity matrix
 */
export function identity() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
};

/**
 * Multiply 4x4 matrix by another 4x4 matrix
 * @param {number[]} a first matrix
 * @param {number[]} b second matrix
 */
export function multiply(a, b) {
    let b00 = b[0 * 4 + 0];
    let b01 = b[0 * 4 + 1];
    let b02 = b[0 * 4 + 2];
    let b03 = b[0 * 4 + 3];
    let b10 = b[1 * 4 + 0];
    let b11 = b[1 * 4 + 1];
    let b12 = b[1 * 4 + 2];
    let b13 = b[1 * 4 + 3];
    let b20 = b[2 * 4 + 0];
    let b21 = b[2 * 4 + 1];
    let b22 = b[2 * 4 + 2];
    let b23 = b[2 * 4 + 3];
    let b30 = b[3 * 4 + 0];
    let b31 = b[3 * 4 + 1];
    let b32 = b[3 * 4 + 2];
    let b33 = b[3 * 4 + 3];
    let a00 = a[0 * 4 + 0];
    let a01 = a[0 * 4 + 1];
    let a02 = a[0 * 4 + 2];
    let a03 = a[0 * 4 + 3];
    let a10 = a[1 * 4 + 0];
    let a11 = a[1 * 4 + 1];
    let a12 = a[1 * 4 + 2];
    let a13 = a[1 * 4 + 3];
    let a20 = a[2 * 4 + 0];
    let a21 = a[2 * 4 + 1];
    let a22 = a[2 * 4 + 2];
    let a23 = a[2 * 4 + 3];
    let a30 = a[3 * 4 + 0];
    let a31 = a[3 * 4 + 1];
    let a32 = a[3 * 4 + 2];
    let a33 = a[3 * 4 + 3];

    return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
};

/**
 * Projection from pixel coordinates into clip space
 * @param {number} width 
 * @param {number} height 
 * @param {number} depth
 */
export function projection(width, height, depth) {
    return [
        (2 / width),  0,              0,                 0,
        0,            (-2 / height),  0,                 0,
        0,            0,              (2 / depth),       0,
       -1,            1,              0,                 1,
    ];
};

/**
 * Orthographic projection
 * @param {number} left 
 * @param {number} right 
 * @param {number} bottom 
 * @param {number} top 
 * @param {number} near 
 * @param {number} far 
 */
export function orthographic(left, right, bottom, top, near, far) {
    return [
      (2 / (right - left)),              0,                                 0,                              0,
      0,                                 (2 / (top - bottom)),              0,                              0,
      0,                                 0,                                 (2 / (near - far)),             0,
      ((left + right) / (left - right)), ((bottom + top) / (bottom - top)), ((near + far) / (near - far)),  1,
    ];
}

/**
 * Converts coordinates from a 3D frustum into clip space
 * @param {number} fieldOfViewInRadians angle in radians that determines how "wide" the frustum is
 * @param {number} aspect aspect ratio, usually just based on the canvas width/height ratio
 * @param {number} near depth z coordinate of the front plane, so this min z distance before things gets clipped 
 * @param {number} far depth z coordinate of the back plane. Any object after this gets clipped
 */
export function perspective(fieldOfViewInRadians, aspect, near, far) {
    let f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians)
    let rangeInv = 1.0 / (near - far)

    return [
        (f / aspect),  0,  0,                            0,
        0,             f,  0,                            0,
        0,             0,  ((near + far) * rangeInv),   -1,
        0,             0,  (near * far * rangeInv * 2),  0,
    ];
}

/**
 * Compute the inverse of a 4x4 matrix. Because the 4x4 matrix is square 
 * there should be an inverse matrix
 * @param {number[]} m a 4x4 matrix
 */
export function inverse(m) {
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0  = m22 * m33;
    var tmp_1  = m32 * m23;
    var tmp_2  = m12 * m33;
    var tmp_3  = m32 * m13;
    var tmp_4  = m12 * m23;
    var tmp_5  = m22 * m13;
    var tmp_6  = m02 * m33;
    var tmp_7  = m32 * m03;
    var tmp_8  = m02 * m23;
    var tmp_9  = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;
    var tmp_12 = m20 * m31;
    var tmp_13 = m30 * m21;
    var tmp_14 = m10 * m31;
    var tmp_15 = m30 * m11;
    var tmp_16 = m10 * m21;
    var tmp_17 = m20 * m11;
    var tmp_18 = m00 * m31;
    var tmp_19 = m30 * m01;
    var tmp_20 = m00 * m21;
    var tmp_21 = m20 * m01;
    var tmp_22 = m00 * m11;
    var tmp_23 = m10 * m01;

    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
                (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
                (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
                (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
                (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    return [
        d * t0,
        d * t1,
        d * t2,
        d * t3,
        d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
            (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
        d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
            (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
        d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
            (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
        d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
            (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
        d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
            (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
        d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
            (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
        d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
            (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
        d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
            (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
        d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
            (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
        d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
            (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
        d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
            (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
        d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
            (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
    ];
}

/**
 * Multiply applies an vector to a matrix.
 * @param {number[]} m 4x4 matrix
 * @param {number[]} v 4n vector
 */
export function transformVector(m, v) {

    let dst = [];
    for (let i = 0; i < 4; ++i) {
        dst[i] = 0.0;
        for (let j = 0; j < 4; ++j) {
            dst[i] += v[j] * m[j * 4 + i];
        }
    }
    return dst;
}

/**
 * 
 * @param {number[]} m 
 * @param {number[]} v 
 * @param {number[]} dst 
 */
export function transformPoint(m, v, dst = [0,0,0]) {
    var v0 = v[0];
    var v1 = v[1];
    var v2 = v[2];
    var d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];

    dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
    dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
    dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;

    return dst;
}