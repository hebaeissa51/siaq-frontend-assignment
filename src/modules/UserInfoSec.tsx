import { useAuth } from "../hooks/useAuth";

const UserInfoSec = () => {
    const { user } = useAuth();

    return (
        <section className="rounded-[15px] py-5 px-4 col-span-12">
            <figure className="flex flex-col items-center px-3 py-2 relative">
                <div className="w-[120px] h-[120px] centered rounded-full overflow-hidden">
                    <img src={user?.photo} className="w-full h-full rounded-full" alt="user" />
                </div>
                <figcaption className="pl-2 mt-3 text-center ">
                    <h5 className="font-semibold text-[18px]">{user?.name}</h5>
                    <p className="text-[16px] text-gray-600 ">{user?.role}</p>
                </figcaption>
            </figure>
            {user &&
                <div className="centered flex-col sm:flex-row gap-5 mt-8">
                    <div className="max-w-[300px] w-full bg-white rounded-[15px] p-4 card-shadow hover:btn-shadow ">
                        <a href={`mailto:${user.email}`} className="block text-center">
                            <i className="far fa-envelope mb-3 text-primary text-[28px]"></i>
                            <p>{user.email}</p>
                        </a>
                    </div>
                    <div className="max-w-[300px] w-full bg-white rounded-[15px] p-4 card-shadow hover:btn-shadow ">
                        <a href={`tel:${user.phone}`} className="block text-center">
                            <i className="fas fa-phone mb-3 text-primary text-[28px]"></i>
                            <p>{user.phone}</p>
                        </a>
                    </div>
                </div>
            }
        </section>
    )
}

export default UserInfoSec