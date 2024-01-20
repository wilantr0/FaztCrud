import ProductCard from "@/src/components/ProductCard"
import { conn } from "@/src/libs/db"
import axios from "axios"


async function loadProducts (){
  const { data } = await axios.get('http://localhost:3000/api/products')
  return data
  
}

export default async function ProductsPage() {
  const products = await loadProducts()
  return (
    <div className=" absolute flex flex-row gap-4 h-full w-full bg-slate-500">{
      products.map(item => {
        return(
        <ProductCard item={item} key={item.id}/>
        )
      })
      }</div>
  )
}



