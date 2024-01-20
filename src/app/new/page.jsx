import ProductForm from "@/src/components/ProductForm"


export default function NewPage() {
  return(
    <div className="relative w-full h-full flex justify-center bg-slate-500">
      <ProductForm state='NEW' />
    </div>
  )
}
