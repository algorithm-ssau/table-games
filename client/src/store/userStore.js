import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {}
        this._basket = []
        this._basketCount2 = 0
        this._basketCount = 0
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }
    setBasket(basket){
        this._basket = basket
    }
    setBasketCount2(count2){
        this._basketCount2 = count2
    }
    setBasketCount(count){
        this._basketCount = count
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    get basket(){
        return this._basket
    }
    get basketCount2(){
        return this._basketCount2
    }
    get basketCount(){
        return this._basketCount
    }

}