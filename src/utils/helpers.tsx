import { useEffect } from "react";

// Helper function to generate token
export function generateToken(length: number = 64): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

// Show password in login form
export const showPassword = (id: string): void => {
    const passwordField = document.getElementById(id) as HTMLInputElement | null;
    const btn = document.getElementById(`${id}_btn`);
    const icon = btn?.querySelector("i") as HTMLElement | null;

    if (!passwordField || !icon) return;

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.className = "fas fa-eye";
    } else {
        passwordField.type = "password";
        icon.className = "fas fa-eye-slash";
    }
};

// Event listener for document click
export const useSidebarHandler = (
    sidenavRef: React.RefObject<HTMLElement | null>,
    overlayRef: React.RefObject<HTMLDivElement | null>
) => {
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (window.innerWidth <= 800) {
                const target = e.target as HTMLElement;

                const isSidenavClick = sidenavRef.current?.contains(target);
                const isToggleClick = target.closest('.toggle_button');

                if (!isSidenavClick && !isToggleClick) {
                    sidenavRef.current?.classList.remove('opened');
                    overlayRef.current?.classList.remove('activeBG');
                }
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => document.removeEventListener('click', handleDocumentClick);
    }, [sidenavRef, overlayRef]);
};

// close sidebar
export const closeSidebar = (
    sidenavRef: React.RefObject<HTMLElement | null>,
    overlayRef: React.RefObject<HTMLDivElement | null>
) => {
    if (sidenavRef.current?.classList.contains('opened')) {
        sidenavRef.current.classList.remove('opened');
    }
    overlayRef.current?.classList.remove('activeBG');
};

// sidebar toggle
export const sidebarToggle = () => {
    if (window.innerWidth <= 800) {
        document.querySelector("#sideNav")?.classList.remove('sm');
        document.querySelector("#sideNav")?.classList.add('opened');
        document.querySelector("#background_overlay")?.classList.add('activeBG');
    } else {
        document.querySelector("#sideNav")?.classList.remove('opened');
        document.querySelector("#background_overlay")?.classList.remove('activeBG');
    }
};