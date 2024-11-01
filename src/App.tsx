import { Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import ProductsPage from "./pages/Products";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
            </Routes>
        </>
    )
}

export default App;
