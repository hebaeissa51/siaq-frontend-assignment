import { useCallback, useState } from "react";
import FormModal from "../components/modals/FormModal";
import ClientsTbl from "../components/tables/ClientsTbl";
import { useSidebar } from "../hooks/useSidebar";

const Clients = () => {
    const { isSidebarSmall } = useSidebar();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, [])

    return (
        <main className={`mt-[85px] mr-[15px] mb-[15px] ml-[255px] max-[800px]:mx-[15px] ${isSidebarSmall && "ml-[80px]"}`}>
            <section className="bg-white rounded-[15px] py-5 px-4">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-[20px] font-medium">Clients Record</h3>
                    <button
                        className="btn btn-primary px-3 py-2 btn-shadow hover:opacity-90"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <i className="fas fa-user-plus mr-3"></i>add client
                    </button>
                </div>
                <ClientsTbl />
            </section>
            <FormModal isVisible={isModalOpen} closeModal={handleCloseModal} type="add-client" modalTitle="Add new client" formBtnText="Add client" />
        </main>
    )
}

export default Clients