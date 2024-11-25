import ProtectedRoute from "../auth/ProtectedRoute";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import ProductDetailsPage from "../pages/ProductDetails";
import ProductsPage from "../pages/Products";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import cookieService from "../services/cookieService";

/* _________________ Cookies _________________ */
const token = cookieService.get("jwt");

const router = createBrowserRouter(
    createRoutesFromElements(
        <>  
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />} >
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:productId" element={<ProductDetailsPage />} />
            </Route>
            <Route 
                path="login" 
                element={
                    <ProtectedRoute isAuthenticated={token} redirectPath="/" >
                        <LoginPage />
                    </ProtectedRoute>
                } 
            />



            {/* <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
                <Route
                    index
                    element={
                        <ProtectedRoute
                            isAllowed={userData}
                            redirectPath="/login"
                            data={userData}
                        >
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/todos"
                    element={
                        <ProtectedRoute
                            isAllowed={userData}
                            redirectPath="/login"
                            data={userData}
                        >
                            <TodosPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="login"
                    element={
                        <ProtectedRoute
                            isAllowed={!userData}
                            redirectPath="/"
                            data={userData}
                        >
                            <LoginPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="register"
                    element={
                        <ProtectedRoute
                            isAllowed={!userData}
                            redirectPath="/login"
                            data={userData}
                        >
                            <RegisterPage />
                        </ProtectedRoute>
                    }
                />
            </Route> */}
        </>
    )
)

export default router;