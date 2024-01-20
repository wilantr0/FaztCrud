"use client"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { useRef, useState, useEffect } from "react"


export default function ProductForm({ state }) {
  const [file, setFile] = useState(null)
  const form = useRef(null)
  const router = useRouter()
  const params = useParams()

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: ""
  })

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name] : e.target.value
    })
  }

  useEffect(()=>{
      if (params.id) {
        console.log(params.id)
        axios.get('/api/products/'+ params.id)
          .then(res => {
            console.log(res.data[0]) 
            setProduct({
              name: res.data[0].name,
              price: res.data[0].price,
              description: res.data[0].description,
              image: res.data[0].image
            })
            
          })
      }
    
  }, [])

  

  async function handleSumbit (e) {
    e.preventDefault()

    if(!params.id){
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('price', product.price)
      formData.append('description', product.description)
      file ? formData.append('image', file) : formData.append('image', null)
      const res = await axios.post('/api/products', formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      })
      console.log(res.data)
    } else{
      const res = await axios.put('/api/products/' + params.id, product)
      console.log(res)
    }
    form.current.reset()
    router.refresh()
    router.push('/products')
  }
  return (
    
      <div className=" absolute flex flex-col justify-center items-center w-2/6 py-20 px-10 mt-5 h-fit bg-gray-800 gap-14 rounded-3xl min-w-[300px]">
        <div className="flex flex-col gap-14">
        <h1 className="text-3xl text-center">{state} PRODUCT</h1>
        <form onSubmit={handleSumbit} className="flex flex-col justify-evenly items-center gap-4 w-full" ref={form}>
          <label htmlFor="name" className="flex flex-col text-start select-none gap-2">
            Product Name
            <input onChange={handleChange} value={product.name} type="text" placeholder="Name" name="name" className="bg-transparent w-64 translate-x-2 focus:border-b-2 outline-none border-b-blue-700"  />
          </label>
          
          <label htmlFor="description" className="flex flex-col text-start select-none gap-2">
            Product Description
            <textarea onChange={handleChange} value={product.description} rows={2} cols={23} placeholder="Description" name="description" className=" m-0  resize-none bg-transparent w-64 translate-x-2 focus:border-b-2 outline-none border-b-blue-700" />
          </label>
          
          <label htmlFor="price" className="flex flex-col text-start select-none gap-2">
            Product Price
            <input onChange={handleChange} value={product.price} type="number" placeholder="00.00" name="price" className="bg-transparent w-64 translate-x-2 focus:border-b-2 outline-none border-b-blue-700"  />
          </label>
          <label htmlFor="image" className="flex flex-col text-start select-none gap-2">
            Product Image
            <input onChange={e => {
              setFile(e.target.files[0])
            }}
            type="file" 
            accept="image/png, image/jpeg" 
            name="image" 
            className="bg-transparent w-64 translate-x-2 focus:border-b-2 outline-none border-b-blue-700"  />
          </label>
          {file?<img src={URL.createObjectURL(file)} className=" object-contain"  alt="" />:''}
          <input type="submit" className="bg-slate-500 p-4 px-8 rounded-xl hover:bg-sky-600 cursor-pointer mt-4 " value={params.id?"Actualizar producto":"Subir producto"} />
          
        </form>
        </div>
        
        
      </div>
  )
}
