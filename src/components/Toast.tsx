type ToastTypes = {
    isVisible: boolean;
    status: "success" | "error" | null;
    detail: string;
    hideToast: () => void;
}

const Toast = ({ isVisible, status, detail, hideToast }: ToastTypes) => {
    return (
        <div className={`fixed top-[20px] right-[20px] max-w-[25rem] w-full flex justify-between items-start rounded-[6px] p-4 border-l-[6px] backdrop-blur-[10px] shadow-[0_2px_12px_0_rgba(0,0,0,0.1)] transition-opacity duration-[0.3s] ${isVisible ? 'opacity-100 z-[2000]' : 'opacity-0 bg-transparent z-[-20]'}
            ${status === "success" ? "bg-[#edf7ed] text-[#2e7d32] border-[#2e7d32]" : "bg-[#fdeded] text-[#5f2120] border-[#d32f2f]"}
        `}>
            <figure className="flex">
                <div className={`w-[28px] h-[28px] text-[16px] centered rounded-full border-[2px] mr-[12px] ${status === "success" ? "text-[#2e7d32] border-[#2e7d32]" : "text-[#d32f2f] border-[#d32f2f]"}`}>
                    <i className={`fas fa-${status === "success"? "check" : "xmark"}`}></i>
                </div>
                <figcaption className="text-start">
                    <h4 className="text-[14px] font-semibold ">{status === "success" ? "Success" : "Failed"}</h4>
                    <p className="text-[14px]">{detail}</p>
                </figcaption>
            </figure>
            <button
                type="button"
                className="w-[28px] h-[28px] text-[14px] centered rounded-full hover:bg-[#ffffff80] transition-3s"
                onClick={hideToast}
            >
                <i className="fas fa-xmark"></i>
            </button>
        </div>
    )
}

export default Toast