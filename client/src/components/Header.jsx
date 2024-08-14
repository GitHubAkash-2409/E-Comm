import Logo from "./Logo";
import { GrFormSearch } from "react-icons/gr";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify"
import { setUserDetails } from "../store/userSlice";
import { useState } from "react";
import ROLE from "../common/role";

const AppHeader = () => {

  const user  = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setmenuDisplay] = useState(false)

  console.log("user header", user)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logOut.url, {
      method: SummaryApi.logOut.method,
      credentials: "include", 
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message); 
      dispatch(setUserDetails(null))
    } else {
      toast.error(data.message); 
    }

  }

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-2 justify-between">
        
        <Link to={"/"}> 
        <Logo w={75} h={45} />
        </Link>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
          />
          <div className="text-white min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full">
            <GrFormSearch size={30} />
          </div>
        </div>

        <div className="flex items-center gap-5">
          
          <div className="relative flex justify-center">

            {
              user?._id && (
                <div className="text-3xl cursor-pointer relative flex justify-center" onClick={()=>setmenuDisplay(prev => !prev)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic } alt={user?.name} className="h-10 w-10 rounded-full"/>
                    ) : (
                      <HiMiniUserCircle />
                    )
                  }
                </div>
              )
            }
            

              {
                menuDisplay && (
                  <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                    <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2" onClick={()=>setmenuDisplay(prev => !prev)}>Admin Panel</Link>
                        )
                      }
                    </nav>
                  </div>
                )
              }

            
          </div>

          <div className="text-2xl cursor-pointer relative">
            <span>
              <FaCartPlus />
            </span>

            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>


            <div>
              {
                user?._id ?(
                  <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white items-center bg-red-600 hover:bg-red-700">
              Logout
            </button>
                ) : (
                  <Link to={"/login"}>
            <button className="px-3 py-1 rounded-full text-white items-center bg-red-600 hover:bg-red-700">
              Login
            </button>
            </Link>
                )
              }
            </div>
          
        </div>
      </div>
    </header>
  );
};

export default AppHeader;