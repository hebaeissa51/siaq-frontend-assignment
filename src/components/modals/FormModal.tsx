import { AddClient } from "../forms/AddClient";

type FormModalProps = {
    isVisible: boolean;
    closeModal: () => void;
    type: string;
    modalTitle: string;
    formBtnText: string;
}

const FormModal = ({ isVisible, closeModal, type, modalTitle, formBtnText }: FormModalProps) => {
    return (
        <div className={`fixed top-0 bottom-0 left-0 right-0 centered w-full h-full bg-[#0000007d] transition-opacity duration-[0.3s] ${isVisible ? 'opacity-100 z-[1090]' : 'opacity-0 bg-transparent z-[-20]'}`}>
            <div className={`max-w-[700px] w-full m-5 bg-white rounded-[4px] shadow-modal transform transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <h5 className="text-[23px] py-[16px] px-[24px] capitalize font-medium">{modalTitle}</h5>
                <hr />
                <div className="p-4">
                    {type === "add-client" &&
                        <AddClient
                            closeModal={closeModal}
                            formBtnText={formBtnText}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default FormModal