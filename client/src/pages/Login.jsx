import { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  const navigate = useNavigate()

  const { fetchUserDetails } = useContext(Context)

  // console.log("generalContext", fetchUserDetails())

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await dataResponse.json();

      if(responseData.success){
        toast.success(responseData.message)
        navigate("/")
        fetchUserDetails()
      }

      if(responseData.error){
        toast.error(responseData.message)
      }


    } catch (error) {
      console.error("Error while signing up:", error);
    }

  };

  // console.log("data login", data);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto shadow-lg rounded-lg">
          <div className="w-20 h-20 mx-auto mb-4 relative overflow-hidden rounded-full">
            <img src={loginIcons} alt="login icons" className="w-full h-full" />
          </div>

          <form className="pt-4 flex flex-col gap-1" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Email:</label>
              <div className="bg-slate-100 p-2 rounded">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
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
              <Link
                to="/forget-password"
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password
              </Link>
            </div>
            <button
              type="submit"
              className="w-full max-w-[150px] bg-red-600 hover:bg-red-700 text-white p-2 rounded-full hover:scale-110 transition-all mx-auto block mt-4"
            >
              Sign in
            </button>
          </form>

          <p className="mt-2">
            Do not have an account?{" "}
            <Link to="/sign-up" className="hover:underline hover:text-red-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;