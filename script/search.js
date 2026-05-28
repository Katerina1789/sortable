import { updateState } from "./state.js";
import { renderApp  } from "./render.js";

export const filterHeroes=(heroes, query,field)=>{
    return heroes.filter(hero=>{
    if (field==="name") return hero.name.toLowerCase().includes(query.toLowerCase())
if (field==="race") return hero.appearance.race.toLowerCase().includes(query.toLowerCase())
if (field==="gender") return hero.appearance.gender.toLowerCase().includes(query.toLowerCase())
if (field==="alignment") return hero.biography.alignment.toLowerCase().includes(query.toLowerCase())
else return hero.name.toLowerCase().includes(query.toLowerCase())
})
}
export const initSearch =(heroes) =>{
    const searchInput = document.getElementById("search")
    const selectField=document.getElementById("field")
    searchInput.addEventListener('input',(event)=>{
const query =event.target.value
const field=selectField.value
const filteredHeroes=filterHeroes(heroes, query,field)
updateState({query})
renderApp()
    })
}