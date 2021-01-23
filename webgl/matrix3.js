
export function translation(tx, ty) {
        return [
            1,  0,  0,
            0,  1,  0,
            tx, ty, 1
        ];
    };

export function rotation(radians) {
    let c = Math.cos(radians)
    let s = Math.sin(radians)

    return [
        c, -s, 0,
        s,  c, 0,
        0,  0, 1,
    ];
};

export function scaling(sx, sy) {
    return [
        sx,  0,  0,
        0,  sy,  0,
        0,   0,  1,
    ];
};

export function multiply(mat_a, mat_b) {
    let a00 = mat_a[0 * 3 + 0];
    let a01 = mat_a[0 * 3 + 1];
    let a02 = mat_a[0 * 3 + 2];
    let a10 = mat_a[1 * 3 + 0];
    let a11 = mat_a[1 * 3 + 1];
    let a12 = mat_a[1 * 3 + 2];
    let a20 = mat_a[2 * 3 + 0];
    let a21 = mat_a[2 * 3 + 1];
    let a22 = mat_a[2 * 3 + 2];
    let b00 = mat_b[0 * 3 + 0];
    let b01 = mat_b[0 * 3 + 1];
    let b02 = mat_b[0 * 3 + 2];
    let b10 = mat_b[1 * 3 + 0];
    let b11 = mat_b[1 * 3 + 1];
    let b12 = mat_b[1 * 3 + 2];
    let b20 = mat_b[2 * 3 + 0];
    let b21 = mat_b[2 * 3 + 1];
    let b22 = mat_b[2 * 3 + 2];

    return [
        b00 * a00 + b01 * a10 + b02 * a20,
        b00 * a01 + b01 * a11 + b02 * a21,
        b00 * a02 + b01 * a12 + b02 * a22,
        b10 * a00 + b11 * a10 + b12 * a20,
        b10 * a01 + b11 * a11 + b12 * a21,
        b10 * a02 + b11 * a12 + b12 * a22,
        b20 * a00 + b21 * a10 + b22 * a20,
        b20 * a01 + b21 * a11 + b22 * a21,
        b20 * a02 + b21 * a12 + b22 * a22,
    ];
}

export function identity() {
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];
}