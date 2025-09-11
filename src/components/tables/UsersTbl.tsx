import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import DeleteModal from "../modals/DeleteModal";
import Toast from "../Toast";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { deleteUser, fetchUsers } from "../../store/slices/usersSlice";

const UsersTbl = () => {
    const { user } = useAuth();
    const role = user?.role;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<null | number>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { data: users } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleHideToast = useCallback(() => {
        setIsToastOpen(false);
    }, [])

    const handleOpenToast = useCallback(() => {
        setIsToastOpen(true);
        setTimeout(() => {
            setIsToastOpen(false);
        }, 3000);
    }, [])

    const handleDelete = useCallback(() => {
        if (userId !== null) {
            dispatch(deleteUser(userId));
            setIsModalOpen(false);
            handleOpenToast();
        }
    }, [userId, handleOpenToast, dispatch])

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, [])

    return (
        <>
            <Toast isVisible={isToastOpen} status="success" detail="User deleted successfully!" hideToast={handleHideToast} />
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[50rem]">
                    <thead>
                        <tr className="bg-[#f9fafb] text-[#374151] capitalize">
                            <th className="p-4 w-[25%]">name</th>
                            <th className="p-4 w-[25%]">email</th>
                            <th className="p-4 w-[15%]">role</th>
                            <th className="p-4 w-[20%]">phone</th>
                            {role === "HR" && <th className="p-4 w-[15%]">actions</th>}
                        </tr>
                    </thead>
                    {users.length === 0 ?
                        <tbody>
                            <tr className="text-[#4b5563] bg-white">
                                <td colSpan={role === "HR" ? 5 : 4} className="p-4 text-center">No Records Found</td>
                            </tr>
                        </tbody> :
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={user.id} className={`text-[#4b5563] ${i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}`}>
                                    <td className="p-4 text-[14px]">
                                        <figure className="flex items-center">
                                            <img src={user.photo} className="w-[40px] h-[40px] rounded-full mr-2" alt="" />
                                            <h5 className="font-medium">{user.name}</h5>
                                        </figure>
                                    </td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className="p-4">{user.phone}</td>
                                    {role === "HR" &&
                                        <td className="p-4">
                                            <button
                                                className="btn btn-danger h-[30px] text-[12px] px-2 btn-shadow hover:opacity-90"
                                                onClick={() => { setIsModalOpen(true); setUserId(user.id) }}
                                            >
                                                <i className="fas fa-trash spacing"></i> Delete
                                            </button>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
            <DeleteModal isVisible={isModalOpen} closeModal={handleCloseModal} deleteItem={handleDelete} />
        </>
    )
}

export default UsersTbl