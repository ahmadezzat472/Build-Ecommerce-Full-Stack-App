import CartDrawer from '../components/CartDrawer'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div>
            <CartDrawer />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout;