import {useRoutes, BrowserRouter, Navigate} from 'react-router-dom'
import { ShoppingCartContext, ShoppingCartProvider, initializelocalStorage } from '../../Context'
import Home from '../Home/'
import MyOrder from '../MyOrder/'
import MyOrders from '../MyOrders/'
import MyAccount from '../MyAccount/'
import SignIn from '../Sign-in/'
import { Navbar } from '../../Components/Navbar'
import './App.css'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import { useContext } from 'react'




const AppRoutes = () => {
    const context = useContext(ShoppingCartContext)
    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = Object.keys(context.account).length === 0
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
    const isUserSignOut = context.signOut || parsedSignOut

    let routes = useRoutes([
        { path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
        { path: '/clothes', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
        { path: '/electronics', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
        { path: '/furnitures', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
        { path: '/toys', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
        { path: '/others', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} /> },
        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/my-orders/last', element: <MyOrder /> },
        { path: '/my-orders/:id', element: <MyOrder /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/*', element: <Home /> },
    ])
    return routes
}

const App = () => {
    initializelocalStorage()

    return (
        <ShoppingCartProvider>
            <BrowserRouter>
                <AppRoutes/>
                <Navbar/>
                <CheckoutSideMenu/>
            </BrowserRouter>
        </ShoppingCartProvider>
    )
}

export default App 