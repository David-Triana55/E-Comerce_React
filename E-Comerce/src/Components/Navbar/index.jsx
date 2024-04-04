import {ShoppingBagIcon} from '@heroicons/react/24/solid'
import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { ShoppingCartContext } from "../../Context"


const Navbar = ()=> {

    const context = useContext(ShoppingCartContext)

    const activeStyle = 'underline underline-offset-4'
    return (
        <nav className="bg-white flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-md font-light">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink to='/All'>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/' 
                    onClick={() => context.setSearchByCategory(null)}
                    className={({isActive}) =>
                    isActive ? activeStyle: undefined
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
                <li className="text-black/60">
                    DavidTriana976@gmail.com
                </li>
                <li>
                    <NavLink to='/my-orders'>
                        My orders
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/sign-in'
                    className={({isActive}) =>
                    isActive ? activeStyle: undefined
                    }>
                        Sign In
                    </NavLink>
                </li>
                
                <li className='flex items-center'>
                    <ShoppingBagIcon className='h-6'/>    
                    {context.count}
                </li>

            
            </ul>

        </nav>
    )
}

export { Navbar}