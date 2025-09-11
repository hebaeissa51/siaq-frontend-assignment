import { useDispatch, useSelector } from "react-redux";
import { clientsRoles, usersRoles } from "../constants/roles";
import { useAuth } from "../hooks/useAuth"
import { useSidebar } from "../hooks/useSidebar";
import StatisticsCard from "../modules/StatisticsCard";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchClients } from "../store/slices/clientsSlice";
import { fetchUsers } from "../store/slices/usersSlice";

const Dashboard = () => {
    const { user } = useAuth();
    const { isSidebarSmall } = useSidebar();
    const role = user?.role;
    const dispatch = useDispatch<AppDispatch>();
    const { data: usersData } = useSelector((state: RootState) => state.users);
    const { data: clientData } = useSelector((state: RootState) => state.clients);

    useEffect(() => {
        dispatch(fetchClients());
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <main className={`mt-[85px] mr-[15px] mb-[15px] ml-[255px] max-[800px]:mx-[15px] ${isSidebarSmall && "ml-[80px]"}`}>
            <section className="grid grid-cols-12 gap-4 p-3">
                {(role && usersData && usersRoles.includes(role)) && (
                    <StatisticsCard
                        count={usersData.length}
                        title="Users"
                        link="/users"
                        icon="fas fa-users"
                    />
                )}
                {(role && clientData && clientsRoles.includes(role)) && (
                    <StatisticsCard
                        count={clientData.length}
                        title="Clients"
                        link="/clients"
                        icon="fas fa-people-group"
                    />
                )}
            </section>
        </main>
    )
}

export default Dashboard