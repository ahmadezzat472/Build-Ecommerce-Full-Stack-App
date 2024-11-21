import RootLayout from "../layout/RootLayout";
import HomePage from "../pages";
import ProductDetailsPage from "../pages/ProductDetails";
import ProductsPage from "../pages/Products";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>  
            <Route path="/" element={<RootLayout />} >
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:productId" element={<ProductDetailsPage />} />
                {/* Root Layout */}
            </Route>
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