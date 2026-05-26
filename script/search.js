import { updateState } from "./state.js";
import { renderApp  } from "./render.js";

export const filterHeroes=(heroes, query)=>{
    const result=heroes.filter(hero=>hero.name.toLowerCase().includes(query.toLowerCase()))
return result
}
export const initSearch =(heroes) =>{
    const searchInput = document.getElementById("search")
    searchInput.addEventListener('input',(event)=>{
const query =event.target.value
const filteredHeroes=filterHeroes(heroes, query)
updateState({query})
renderApp()
    })
}