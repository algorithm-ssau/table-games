import {$authHost, $host} from "./index";


export const createGame = async (game) => {
    const {data} = await $authHost.post('api/game', game)
    return data

}
export const updateGame = async (game, id) =>{
    const {data} = await $authHost.put('api/game/' + id, game)
    return data
}
export const deleteGame = async (id) =>{
    const {data} = await $authHost.delete('api/game/' + id)
    return data
}
export const fetchGame = async () => {
    const {data} = await $host.get('api/game')
    return data

}
export const fetchOneGame = async (id) => {
    const {data} = await $host.get('api/game/' + id)
    return data

}
export const fetchCategory = async (category) => {
    const {data} = await $host.get('api/category', category)
    return data

}
