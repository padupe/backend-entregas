import { sign, verify } from "jsonwebtoken"

export function signJWT(payload: object, secret_key: string, options: object) {

    return sign({payload}, secret_key, options)
}

export function verifyJWT(token: string, secret_key: string) {

    return verify(token, secret_key, function (err, decoded) {
        if (err) {
            console.log(err)
            return false
        }
        return decoded
    })
}