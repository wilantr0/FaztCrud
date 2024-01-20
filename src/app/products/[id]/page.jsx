import axios from "axios"
import Buttons from "./Buttons"


async function loadProducts (id){
  const { data } = await axios.get(`http://localhost:3000/api/products/${id}`)
  return data[0]
  
}

export default async function EditProduct({ params }) {
  const product = await loadProducts(params.id)
  return (
    <div className="absolute inset-0 m-auto p-6 bg-white text-black w-fit h-fit flex flex-row items-center gap-4">
      <img className="object-contain max-h-40" src={product.image} alt={product.description} />
      <div>
      <p>
        Name: {product.name}
      </p>
      <p>
        Price: {product.price}
      </p>
      <p>
        Description: {product.description}
      </p>
      </div>
      <Buttons id={product.id} />
    
    </div>
  )
}
