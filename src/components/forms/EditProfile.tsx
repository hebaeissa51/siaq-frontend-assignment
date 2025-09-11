import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../fields/Input';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../Toast';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchUsers, updateUser } from '../../store/slices/usersSlice';

type FormTypes = {
    name: string;
    phone: string;
}

export const EditProfile = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
    const [toastDetail, setToastDetail] = useState<string>("");

    const { user } = useAuth();
    const form = useForm<FormTypes>({
        mode: "onTouched",
        defaultValues: {
            name: user?.name || "",
            phone: user?.phone || "",
        },
    });
    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitting } = formState;

    const dispatch = useDispatch<AppDispatch>();
    const { data: users } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (!users.length) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.length]);

    const handleHideToast = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleOpenToast = () => {
        setIsOpen(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 2000);
    };

    const onSubmitForm = async (data: FormTypes) => {
        try {
            if (!user) throw new Error("No user logged in");

            dispatch(updateUser({ id: user.id, name: data.name, phone: data.phone }));

            // Toast success
            setFormStatus("success");
            setToastDetail("Profile updated successfully!");
            handleOpenToast();
            reset(data);
        } catch (error) {
            setFormStatus("error");
            setToastDetail("Error updating profile");
            handleOpenToast();
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Toast
                isVisible={isOpen}
                status={formStatus}
                detail={toastDetail}
                hideToast={handleHideToast}
            />
            <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
                <div className="grid grid-cols-12 gap-4 p-3">
                    <Input
                        label="Name"
                        disabled={false}
                        isRequired={true}
                        placeholder="Enter your name"
                        id="name_input"
                        type="text"
                        classes="col-span-12"
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
                        label="Phone"
                        disabled={false}
                        isRequired={true}
                        placeholder="Enter your phone"
                        id="phone_input"
                        type="tel"
                        classes="col-span-12"
                        {...register("phone", {
                            required: {
                                value: true,
                                message: "Field is required"
                            }
                        })}
                        error={!!errors.phone}
                        errorMsg={errors.phone?.message}
                    />
                </div>
                <div className="flex justify-end items-center my-5 px-2">
                    <button
                        type="button"
                        onClick={() => reset()}
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
                        Save Changes
                    </button>
                </div>
            </form>
        </>
    );
};
