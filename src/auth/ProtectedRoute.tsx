import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
    isAuthenticated: boolean;
    redirectPath: string;
    children: ReactNode;
}

const ProtectedRoute = ({
    isAuthenticated,
    redirectPath,
    children,
}: IProps) => {
    if (isAuthenticated) return <Navigate to={redirectPath} replace />;
    return children;
};

export default ProtectedRoute;