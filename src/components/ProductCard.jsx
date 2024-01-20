export default function ProductCard({ item }) {
  return (
    <div key={item.id} className="relative bg-gray-700 w-fit max-w-48 h-fit flex flex-col items-center justify-center m-4 rounded-md">
      <img src={item.image} alt={item.description} className="w-full h-fit rounded-t-md mb-2" />
      <div className="flex flex-col items-start p-4">
        <h1 className="text-2xl">{item.name}</h1>
        <h2 className="text-xl">{item.price} €</h2>
        <p className="text-sm mt-4">{item.description}</p>
        <a className="text-center bg-yellow-400 px-6 text-white p-1 rounded-full mt-4 w-full hover:bg-orange-600" href={`/products/${item.id}`}>Editar</a>
      </div>
  </div>
  )
}
console