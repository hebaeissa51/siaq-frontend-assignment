import React from "react";
import { showPassword } from "../../utils/helpers";

type InputProps = {
    label?: string;
    id: string;
    type: string;
    placeholder?: string;
    disabled?: boolean;
    isRequired?: boolean;
    classes?: string;
    errorMsg?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    pattern?: string;
    onBeforeInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            id,
            type,
            placeholder,
            disabled = false,
            isRequired,
            classes,
            errorMsg,
            inputMode,
            pattern,
            onBeforeInput,
            autoComplete,
            error,
            ...rest
        },
        ref
    ) => {
        // Function to prevent non-numeric characters
        const handleBeforeInput = (event: React.FormEvent<HTMLInputElement>) => {
            if (inputMode === "numeric" && event.nativeEvent instanceof InputEvent) {
                const char = event.nativeEvent.data;
                if (char && !/[0-9]/.test(char)) {
                    event.preventDefault();
                }
            }
            if (onBeforeInput) onBeforeInput(event);
        };

        return (
            <div className={classes}>
                {label && (
                    <label htmlFor={id} className="block text-start mb-1">
                        {label}{" "}
                        {isRequired && (
                            <span className="text-[#e62121] text-[16px]">*</span>
                        )}{" "}
                    </label>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`input font-family 
                        ${error && "border-[#d32f2f] hover:border-[#d32f2f] focus:border-[#d32f2f] placeholder-[#d32f2f]"}
                        ${type === "password" && "pr-16"}`}
                    data-password={type === "password" ? "true" : undefined}
                    id={id}
                    disabled={disabled}
                    {...(inputMode && { inputMode })}
                    {...(pattern && { pattern })}
                    onBeforeInput={handleBeforeInput}
                    {...(autoComplete && { autoComplete })}
                    ref={ref}
                    {...rest}
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="absolute right-[3px] top-[36px] w-[40px] h-[40px] hover:bg-[#0000000a] rounded-full centered text-[#757575] text-[18px] transition-3s"
                        id={`${id}_btn`}
                        onClick={() => showPassword(id)}
                    >
                        <i className="fas fa-eye-slash"></i>
                    </button>
                )}
                <p className="error-msg">{errorMsg}</p>
            </div>
        );
    }
);

Input.displayName = "Input";
