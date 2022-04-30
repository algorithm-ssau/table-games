import {makeAutoObservable} from "mobx";

export default class gameStorage{
    constructor() {
        this._categories = []
        this._games = []
        makeAutoObservable(this)
    }

    setCategories(categories){
        this._categories = categories
    }
    setGames(games){
        this._games = games
    }
    get categories(){
        return this._categories
    }
    get games(){
        return this._games
    }

}