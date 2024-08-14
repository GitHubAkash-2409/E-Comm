import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import './App.css'; 

function App() {

  const dispatch = useDispatch()

  // Function to fetch user details
  const fetchUserDetails = async() => {
    const dataResponse = await fetch(SummaryApi.CurrentUserDetails.url,{
      method : SummaryApi.CurrentUserDetails.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data)) 
    }

    console.log(dataApi)

    console.log("user-data",dataResponse)
  }

  useEffect(() => {
    /* USER DETAILS */
    fetchUserDetails()
  })

 
  return (
    <>
    <Context.Provider value={{

      fetchUserDetails //user details fetch

    }}>
      <ToastContainer />
      <AppHeader />
      <main className="min-h-[calc(100vh-120vh)]">
        <Outlet />
      </main>
      <AppFooter />
    </Context.Provider>
  </>
  
  );
}

export default App;

