import UsersTbl from "../components/tables/UsersTbl";
import { useSidebar } from "../hooks/useSidebar";

const Users = () => {
    const { isSidebarSmall } = useSidebar();
    return (
        <main className={`mt-[85px] mr-[15px] mb-[15px] ml-[255px] max-[800px]:mx-[15px] ${isSidebarSmall && "ml-[80px]"}`}>
            <section className="bg-white rounded-[15px] py-5 px-4">
                <h3 className="text-[20px] font-medium mb-10">Users Record</h3>
                <UsersTbl />
            </section>
        </main>
    )
}

export default Users