import { useSidebar } from "../hooks/useSidebar";

type Error = {
    type: "404" | "403";
}

const ErrorPage = ({ type }: Error) => {
    const { isSidebarSmall } = useSidebar();
    
    return (
        <main className={`mr-[15px] ${type === "403" && "ml-[255px]"} max-[800px]:mx-[15px] ${(type === "403" &&isSidebarSmall) && "ml-[80px]"}`}>
            <section className="flex flex-col items-end justify-center text-center h-full min-h-[100vh] p-5">
                <h1 className="w-full text-[50px] md:text-[80px] text-primary mb-2">
                    {type === "404" ? "Error 404!" : "403 Forbidden!"}
                </h1>
                <h5 className="w-full text-[18px] md:text-[20px]">
                    {type === "404" ? "Page not found" : "You do not have permission to access this page"}
                </h5>
            </section>
        </main>
    )
}

export default ErrorPage