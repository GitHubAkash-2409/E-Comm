import { RiCloseFill } from "react-icons/ri";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center rounded">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={() => onClose()}
        >
          <RiCloseFill />
        </div>

        <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
          <img
            src={imgUrl}
            alt="Full Screen"
            className="max-w-full max-h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
