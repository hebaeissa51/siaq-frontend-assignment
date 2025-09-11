type DeleteModalProps = {
    isVisible: boolean;
    closeModal: () => void;
    deleteItem: () => void;
}

const DeleteModal = ({ isVisible, closeModal, deleteItem }: DeleteModalProps) => {
    return (
        <div className={`fixed top-0 bottom-0 left-0 right-0 centered w-full h-full bg-[#0000007d] transition-opacity duration-[0.3s] ${isVisible ? 'opacity-100 z-[1090]' : 'opacity-0 bg-transparent z-[-20]'}`}>
            <div className={`max-w-[500px] w-full bg-white rounded-[4px] shadow-modal transform transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <h5 className="text-[20px] py-[16px] px-[24px]">Confirm</h5>
                <div className="flex items-center pb-[20px] px-[24px]">
                    <i className="fas fa-triangle-exclamation mr-3 text-[#dc3545] text-[2rem]"></i>
                    <p className="text-[#00000099]">Are you sure you want to delete this item?</p>
                </div>
                <div className="flex justify-end items-center p-[8px] mx-[12px] mb-[24px]">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="btn bg-gray-200 text-gray-700 text-[16px] px-4 py-2 btn-shadow hover:opacity-90"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={deleteItem}
                        className="btn btn-danger text-[16px] px-4 py-2 ml-2 btn-shadow hover:opacity-90"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal