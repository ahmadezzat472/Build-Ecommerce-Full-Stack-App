import ProtectedRoute from "../components/auth/ProtectedRoute";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import ProductDetailsPage from "../pages/ProductDetails";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import cookieService from "../services/CookieService";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardProducts from "../pages/dashboard/Products";
import Dashboard from "../pages/dashboard";
import About from "../pages/About";
import CategoryLists from "../components/CategoryLists";

/* _________________ Cookies _________________ */
const token = cookieService.get("jwt");

const router = createBrowserRouter(
    createRoutesFromElements(
        <>  
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />} >
                <Route index element={<HomePage />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<CategoryLists />} />
                <Route path="products/:productId" element={<ProductDetailsPage />} />
            </Route>

            {/* Dashboard Layout */}
            <Route path="/dashboard" element={<DashboardLayout />} >
                <Route index element={<Dashboard />} />
                <Route path="products" element={<DashboardProducts />} />
                <Route path="categories" element={<h1>home</h1>} />
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