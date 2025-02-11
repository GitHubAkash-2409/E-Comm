import { useState } from "react"
import UploadProduct from "../components/UploadProduct"

const AllProducts = () => {

  const[openUploadProduct, setOpenUploadProduct] = useState(false)

  return (
    <>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full py-1 px-3 transition-all" onClick={()=> setOpenUploadProduct(true)}>Add Products</button>
      </div>

      {/* upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)}/>
        )
      }
    </>
  )
}

export default AllProducts
