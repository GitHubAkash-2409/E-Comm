import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    console.log("changed", e);
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  return (
    <>
      <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
          <div className="flex justify-between items-center pb-3">
            <h2 className="font-bold text-lg">upload product</h2>
            <div
              className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
              onClick={() => onClose()}
            >
              <RiCloseFill />
            </div>
          </div>

          <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5">
            <label htmlFor="productName">Product Name : </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter Product Name"
              value={data.productName}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded outline-none"
            ></input>
            <label htmlFor="brandName" className="mt-3">
              Brand Name :
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Enter Brand Name"
              value={data.brandName}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded outline-none"
            ></input>
            <label htmlFor="category" className="mt-3">
              Category :
            </label>
            <select
              value="data.category"
              className="p-2 bg-slate-100 border rounded outline-none"
            >
              {productCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                );
              })}
            </select>
            <label htmlFor="productImage" className="mt-3">
              Project Image :{" "}
            </label>
            <label htmlFor="uploadImageInput">
              <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm">Upload Project Image</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={handleUploadProduct}
                  ></input>
                </div>
              </div>
            </label>
            <div>
              {data?.productImage[0] ? (
                <div className="flex items-center gap-2">
                  {data.productImage.map((el) => {
                    return (
                      <div className="relative">
                        <img
                          key={el}
                          src={el}
                          alt={el}
                          width={80}
                          height={80}
                          className="bg-slate-100 border cursor-pointer"
                          onClick={() => {
                            console.log("Image clicked:", el);
                            setOpenFullScreenImage(true);
                            setFullScreenImage(el);
                          }}
                        />

                          <div className="absolute bottom-0 right-0 p-1 rounded text-white bg-red-600 cursor-pointer">
                          <MdDelete />
                          </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-red-600 text-xs">
                  *Please Upload Product Image
                </p>
              )}
            </div>

            <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white mb-10 rounded">
              Upload Product
            </button>
          </form>
        </div>
        {/* Display Image Full Screen */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </>
  );
};

export default UploadProduct;
// 06:49:00
