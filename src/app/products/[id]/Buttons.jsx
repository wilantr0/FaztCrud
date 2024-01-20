'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";



export default function Buttons({id}) {

  const router = useRouter()
  
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <button onClick={() => router.push(`/products/edit/${id}`)} className="h-10 w-12 bg-amber-400 flex items-center justify-center rounded-md"><FaEdit /></button>
      <button onClick={async ()=>{
        if(confirm('Está seguro de que quiere eliminar el producto?')){
          const res = await axios.delete(`http://localhost:3000/api/products/${id}`)
          res.status === 204?( router.push('/products'), router.refresh()):''
        }
      }} className="h-10 w-12 bg-red-500 flex items-center justify-center rounded-md"><FaTrash /></button>
    </div>
  )
}
