import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchClients } from "../../store/slices/clientsSlice";

const ClientsTbl = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: clients } = useSelector((state: RootState) => state.clients);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[50rem]">
                <thead>
                    <tr className="bg-[#f9fafb] text-[#374151] capitalize">
                        <th className="p-4">name</th>
                        <th className="p-4">email</th>
                        <th className="p-4">phone</th>
                        <th className="p-4">company</th>
                        <th className="p-4">added by</th>
                        <th className="p-4">date added</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, i) => (
                        <tr key={client.id} className={`text-[#4b5563] ${i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}`}>
                            <td className="p-4 text-[14px] font-medium">{client.name}</td>
                            <td className="p-4 text-[14px]">{client.email}</td>
                            <td className="p-4 text-[14px]">{client.phone}</td>
                            <td className="p-4 text-[14px]">{client.company}</td>
                            <td className="p-4 text-[14px]">{client.addedBy}</td>
                            <td className="p-4 text-[14px]">{client.dateAdded}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ClientsTbl