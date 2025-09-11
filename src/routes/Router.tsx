import { Route, Routes } from "react-router-dom";
import {
    Login,
    ErrorPage,
    Dashboard,
    Clients,
    Users,
    UserProfile
} from "./index";

import ProtectedRoute from "./ProtectedRoute";
import { Layout } from "../layout/Layout";
import { AuthProvider } from "../context/AuthProvider";
import { adminRoles, clientsRoles, usersRoles } from "../constants/roles";
import SidebarProvider from "../context/SidebarProvider";

const Router = () => {
    return (
        <AuthProvider>
            <SidebarProvider>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route element={<Layout><ProtectedRoute allowedRoles={adminRoles} /></Layout>}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="profile/:userId" element={<UserProfile />} />
                    </Route>
                    <Route element={<Layout><ProtectedRoute allowedRoles={usersRoles} /></Layout>}>
                        <Route path="users" element={<Users />} />
                    </Route>
                    <Route element={<Layout><ProtectedRoute allowedRoles={clientsRoles} /></Layout>}>
                        <Route path="clients" element={<Clients />} />
                    </Route>
                    <Route path="*" element={<ErrorPage type="404" />} />
                </Routes>
            </SidebarProvider>
        </AuthProvider>
    )
}

export default Router
