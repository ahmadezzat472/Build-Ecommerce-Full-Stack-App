import CartDrawer from '../components/CartDrawer'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div>
            <CartDrawer />
            <Navbar />
            <Outlet />
        </div>
    )
}

export default RootLayout