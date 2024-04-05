import {ShoppingBagIcon} from '@heroicons/react/24/solid'
import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { ShoppingCartContext } from "../../Context"


const Navbar = ()=> {

    const context = useContext(ShoppingCartContext)

    const openShop = () => {
        context.setIsOpenCheckoutSideMenu(prev => !prev)
    }

    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut

    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const handleSignOut = () => {
        const stringifySignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifySignOut)
        context.setSignOut(true)

    }

    const renderView = () => {
        if(hasUserAnAccount && !isUserSignOut){
            return(
                <>
                    <li className="text-black/60">
                        {parsedAccount?.email}
                    </li>
                    <li>
                        <NavLink 
                            to='/my-orders'
                            className={({isActive}) =>isActive ? activeStyle: undefined}
                        >
                            My orders
                        </NavLink>
                    </li>            
                    <li>
                        <NavLink 
                            to='/my-account'
                            className={({isActive}) =>isActive ? activeStyle: undefined}
                            >
                            My Account
                        </NavLink>
                    </li>    
                    <li>
                        <NavLink 
                            to='/sign-in' 
                            onClick={handleSignOut}
                            className={({isActive}) =>isActive ? activeStyle: undefined}
                        >
                            Sign out
                        </NavLink>
                    </li>    
                </>
            )
        } else {
            return (
                <li>
                    <NavLink 
                        to='/sign-in' 
                        onClick={handleSignOut}
                        className={({isActive}) => isActive ? activeStyle : undefined }
                    >
                        Sign out
                    </NavLink>
                </li>
            )
        }
    }

    console.log(context.signOut);
    const activeStyle = 'underline underline-offset-4'
    return (
        <nav className="bg-white flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-md font-light">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/' 
                    onClick={() => context.setSearchByCategory(null)}
                    className={({isActive}) =>isActive ? activeStyle: undefined
                    }>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/Clothes'
                    onClick={() => context.setSearchByCategory('clothes')}
                    className={({isActive}) =>
                    isActive ? activeStyle: undefined
                    }>
                        Clothes
                    </NavLink>
                </li>
                
                <li>
                    <NavLink 
                    to='/Electronics'
                    onClick={() => context.setSearchByCategory('electronics')}
                    className={({isActive}) =>
                    isActive ? activeStyle: undefined
                    }>
                        Electronics
                    </NavLink>
                </li>  
                
                <li>
                    <NavLink 
                    to='/Furnitures'
                    onClick={() => context.setSearchByCategory('furniture')}
                    className={({isActive}) =>
                    isActive ? activeStyle: undefined
                    }>
                        Furnitures
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                    to='/Toys'
                    onClick={() => context.setSearchByCategory('toys')}
                    className={({isActive}) =>
                    isActive ? activeStyle: undefined
                    }>
                        Toys
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                    to='/Others'
                    onClick={() => context.setSearchByCategory('shoes')}
                    className={({isActive}) =>
                    isActive ? activeStyle: undefined
                    }>
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-3">
                {renderView()}
                <li className='flex items-center relative'>
                        <ShoppingBagIcon 
                            className='h-6 cursor-pointer'
                            onClick={openShop}
                        />    
                        <span >{context.cartProducts.length}</span>
                    </li>
            </ul>
        </nav>
    )
}

export { Navbar}