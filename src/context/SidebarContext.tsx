import { createContext } from 'react';

type SidebarContextTypes = {
    isSidebarSmall: boolean;
    toggleSidebar: () => void;
    isLargeScreen: boolean;
}

export const SidebarContext = createContext<SidebarContextTypes | undefined>(undefined);