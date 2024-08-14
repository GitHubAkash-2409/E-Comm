import { useState } from "react";
import ROLE from "../common/role";
import { RiCloseLine } from "react-icons/ri";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunction
}) => {
    const [selectedRole, setSelectedRole] = useState(role);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);

        console.log(event.target.value)
    };

    const updateUserRole = async () => {
        try {
            const fetchResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    role: selectedRole
                })
            });

            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();  
                callFunction();
            } else {
                toast.error(responseData.message);  
            }

            console.log("role-updated", responseData);
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-center items-center bg-gray-800 bg-opacity-75">
            <div className="bg-white shadow-md p-4 w-full max-w-sm">

                <button className="block ml-auto" onClick={onClose}><RiCloseLine /></button>

                <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

                <p>Name: {name}</p>
                <p>Email: {email}</p>

                <div className="flex items-center justify-between my-4">
                    <p className="mr-2">Role:</p>
                    <select
                        className="border px-4 py-1"
                        value={selectedRole}
                        onChange={handleRoleChange}
                    >
                        <option value="">Select Role</option>
                        {Object.values(ROLE).map((role) => (
                            <option value={role} key={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
                    onClick={updateUserRole}
                    disabled={!selectedRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
