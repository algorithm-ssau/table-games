import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)

}

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const loginBuyer = async (email, password) => {
    const {data} = await $host.post('api/user/loginBuyer', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)

}

export const checkBuyer = async () => {
    const {data} = await $authHost.get('api/user/authBuyer')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const pushBasket = async (buyerIdBuyer,productIdProduct,products_count,price) => {
    const {data} = await $host.post('api/user/pushBasket', {buyerIdBuyer,productIdProduct,products_count,price})
    return data
}
export const getBasket = async (buyerIdBuyer) => {
    const {data} = await $host.get('api/user/getBasket', {params: {buyerIdBuyer}})
    return data
}
export const delBasket = async (buyerIdBuyer, productIdProduct) => {
    const {data} = await $host.delete('api/user/delBasket', {params: {buyerIdBuyer, productIdProduct}})
    return data
}
export const updBasket = async (buyerIdBuyer, productIdProduct, products_count) => {

    const {data} = await $host.put('api/user/updBasket', {buyerIdBuyer, productIdProduct, products_count})
    return data
}