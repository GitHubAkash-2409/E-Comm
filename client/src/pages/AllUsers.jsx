import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id : ""
    })

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }

            // console.log(dataResponse);
        } catch (error) {
            console.error("Error fetching all users:", error);
            toast.error("Failed to fetch users. Please try again later.");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className="pb-4 bg-white">
            <table className="userTable w-full">
                <thead>
                    <tr className="bg-black text-white">
                        <th className="border text-base font-medium text-center">Sr No.</th>
                        <th className="border text-base font-medium text-center">Name</th>
                        <th className="border text-base font-medium text-center">Email Id</th>
                        <th className="border text-base font-medium text-center">Role</th>
                        <th className="border text-base font-medium text-center">Created Date</th>
                        <th className="border text-base font-medium text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((el, index) => (
                        <tr key={el.id}>
                            <td className="border text-base text-center">{index + 1}</td>
                            <td className="border text-base text-center">{el.name}</td>
                            <td className="border text-base text-center">{el.email}</td>
                            <td className="border text-base text-center">{el.role}</td>
                            <td className="border text-base text-center">{moment(el.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                            <td className="text-center">
                                <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white" 
                                onClick={()=>{
                                    setUpdateUserDetails(el)
                                    setOpenUpdateRole(true)
                                    }}>
                                    <FaEdit  size={25}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {allUsers.length === 0 && (
                        <tr>
                            <td colSpan="5" className="border text-center">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>


                    {
                        openUpdateRole && (
                            <ChangeUserRole onClose={()=>setOpenUpdateRole(false)} 
                            name={updateUserDetails.name}
                            email={updateUserDetails.email}
                            role={updateUserDetails.role}
                            userId={updateUserDetails._id}
                            callFunction={fetchAllUsers}
                            />
                        )
                    }
            

        </div>
    );
};

export default AllUsers;
