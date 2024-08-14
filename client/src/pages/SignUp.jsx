import { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPasspassword: "",
    profilePic: ""
  });


  const navigate = useNavigate()


  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);
    console.log("imagePic", imagePic);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPasspassword) {
      try {
        const dataResponse = await fetch(SummaryApi.signUp.url, {
          method: SummaryApi.signUp.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responseData = await dataResponse.json();

        if(responseData.success){
          toast.success(responseData.message)
          navigate("/login")
        }

        if(responseData.error){
          toast.error(responseData.message)
        }


        console.log("data", responseData);
 
        // Clear form data
        setData({
          name: "",
          email: "",
          password: "",
          confirmPasspassword: "",
          profilePic: "",
        });


      } catch (error) {
        console.error("Error while signing up:", error);
        setErrorMessage("Failed to sign up. Please try again.");
      }
    } else {
      toast.error("Passwords do not match. Please check again.");
      setErrorMessage("Passwords do not match. Please check again.");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto shadow-lg rounded-lg">
          <div className="w-20 h-20 mx-auto mb-4 relative overflow-hidden rounded-full">
            <img
              src={data.profilePic || loginIcons}
              alt="login icons"
              className="w-full h-full"
            />
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form
            className="pt-4 flex flex-col gap-1"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block mb-1">Name:</label>
              <div className="bg-slate-100 p-2 rounded">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Email:</label>
              <div className="bg-slate-100 p-2 rounded">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Password:</label>
              <div className="bg-slate-100 p-2 rounded flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <button
                  type="button"
                  className="cursor-pointer text-xl ml-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Confirm Password:</label>
              <div className="bg-slate-100 p-2 rounded flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm password"
                  name="confirmPasspassword"
                  value={data.confirmPasspassword}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <button
                  type="button"
                  className="cursor-pointer text-xl ml-2"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

           

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full max-w-[150px] bg-red-600 hover:bg-red-700 text-white p-2 rounded-full hover:scale-110 transition-all mx-auto block mt-4"
            >
              Sign up
            </button>
          </form>

          <p className="mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-red-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;