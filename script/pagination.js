export const paginateHeroes=(heroes,currentPage,pageSize)=>{
const start=(currentPage-1)*pageSize
const end=start+pageSize
return heroes.slice(start,end)
}