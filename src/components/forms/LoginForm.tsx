
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { LoginTypes } from '../../types/User.types';
import { Input } from '../fields/Input';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../Toast';

export const LoginForm = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
    const [toastDetail, setToastDetail] = useState<string>("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const form = useForm<LoginTypes>({ mode: "onTouched" });
    const { register, handleSubmit, formState } = form;
    const { errors, isSubmitting } = formState;

    const handleHideToast = useCallback(() => {
        setIsOpen(false);
    }, [])

    const handleOpenToast = () => {
        setIsOpen(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    };

    const onSubmitForm = async (data: LoginTypes) => {
        try {
            await login(data.email, data.password);
            setFormStatus("success");
            setToastDetail("You have successfully logged in!");
            handleOpenToast();
            setTimeout(() => navigate('/', { replace: true }), 2000);
        } catch (error) {
            setFormStatus("error");
            setToastDetail("Invalid credentials");
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
                        label="Email"
                        disabled={false}
                        isRequired={true}
                        placeholder="Enter your email"
                        id="email_input"
                        type="email"
                        classes="col-span-12 mb-3"
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
                        label="Password"
                        isRequired={true}
                        placeholder="Enter your password"
                        id="passwordUser_input"
                        type="password"
                        autoComplete="current-password"
                        classes="col-span-12 mb-3 relative"
                        {...register("password", {
                            required: "Field is required",
                        })}
                        error={!!errors.password}
                        errorMsg={errors.password?.message}
                    />
                </div>
                <div className="!justify-center my-5">
                    <button
                        className='btn btn-primary !text-[18px] w-[50%] h-[50px]'
                        id="confirmLoginBtn"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Login
                    </button>
                </div>
            </form>
        </>
    );
};
