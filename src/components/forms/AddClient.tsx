
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../fields/Input';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../Toast';
import type { ClientTypes } from '../../types/Client.types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { addClient, fetchClients } from '../../store/slices/clientsSlice';

type AddClientProps = {
    closeModal: () => void;
    formBtnText: string;
}

export const AddClient = ({ closeModal, formBtnText }: AddClientProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
    const [toastDetail, setToastDetail] = useState<string>("");
    const { user } = useAuth();
    const form = useForm<ClientTypes>({ mode: "onTouched" });
    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitting } = formState;
    const dispatch = useDispatch<AppDispatch>();
    const { data: clients } = useSelector((state: RootState) => state.clients);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const handleHideToast = useCallback(() => {
        setIsOpen(false);
    }, [])

    const handleOpenToast = () => {
        setIsOpen(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 2000);
    };

    const onSubmitForm = async (data: ClientTypes) => {
        try {
            const newClient: ClientTypes = {
                id: clients.length + 1,
                name: data.name,
                email: data.email,
                phone: data.phone,
                company: data.company,
                addedBy: user ? user.name : '',
                dateAdded: new Date().toISOString().split("T")[0],
            };

            dispatch(addClient(newClient));

            // Toast success
            setFormStatus("success");
            setToastDetail("New client added successfully!");
            handleOpenToast();

            setTimeout(() => closeModal(), 2000);
        } catch (error) {
            setFormStatus("error");
            setToastDetail("Error adding new client");
            handleOpenToast();
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Toast isVisible={isOpen} status={formStatus} detail={toastDetail} hideToast={handleHideToast} />
            <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
                <div className="grid grid-cols-12 gap-4 p-3">
                    <Input
                        label="Name"
                        disabled={false}
                        isRequired={true}
                        placeholder="Enter your name"
                        id="name_input"
                        type="text"
                        classes="col-span-12 md:col-span-6 "
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Field is required"
                            }
                        })}
                        error={!!errors.name}
                        errorMsg={errors.name?.message}
                    />
                    <Input
                        label="Email"
                        disabled={false}
                        isRequired={true}
                        placeholder="Enter your email"
                        id="email_input"
                        type="email"
                        classes="col-span-12 md:col-span-6 "
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Field is required"
                            }
                        })}
                        error={!!errors.email}
                        errorMsg={errors.email?.message}
                    />
                    <Input
                        label="Phone"
                        disabled={false}
                        isRequired={true}
                        placeholder="Enter your phone"
                        id="phone_input"
                        type="tel"
                        classes="col-span-12 md:col-span-6 "
                        {...register("phone", {
                            required: {
                                value: true,
                                message: "Field is required"
                            }
                        })}
                        error={!!errors.phone}
                        errorMsg={errors.phone?.message}
                    />
                    <Input
                        label="Company"
                        disabled={false}
                        isRequired={true}
                        placeholder="Enter your company"
                        id="company_input"
                        type="text"
                        classes="col-span-12 md:col-span-6 "
                        {...register("company", {
                            required: {
                                value: true,
                                message: "Field is required"
                            }
                        })}
                        error={!!errors.company}
                        errorMsg={errors.company?.message}
                    />
                </div>
                <div className="flex justify-end items-center my-5 px-2">
                    <button
                        type="button"
                        onClick={() => { closeModal(); reset(); }}
                        className="btn bg-gray-200 text-gray-700 text-[16px] px-4 py-2 btn-shadow hover:opacity-90"
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary text-[16px] px-4 py-2 btn-shadow hover:opacity-90 ml-3"
                        id="confirmLoginBtn"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {formBtnText}
                    </button>
                </div>
            </form>
        </>
    );
};
