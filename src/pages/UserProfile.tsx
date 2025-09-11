import { EditProfile } from "../components/forms/EditProfile";
import { useSidebar } from "../hooks/useSidebar";
import UserInfoSec from "../modules/UserInfoSec";

const UserProfile = () => {
    const { isSidebarSmall } = useSidebar();
    return (
        <main className={`grid grid-cols-12 gap-5 mt-[85px] mr-[25px] mb-[25px] ml-[265px] max-[800px]:mx-[15px] ${isSidebarSmall && "ml-[80px]"}`}>
            <UserInfoSec />
            <section className="bg-white rounded-[15px] card-shadow py-5 px-4 col-span-12">
                <h3 className="text-[20px] font-medium mb-5">Edit Profile</h3>
                <EditProfile />
            </section>
        </main>
    )
}

export default UserProfile