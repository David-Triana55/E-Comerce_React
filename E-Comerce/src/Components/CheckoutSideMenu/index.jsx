import {XMarkIcon} from '@heroicons/react/24/solid'
import { ShoppingCartContext } from "../../Context"
import OrderCard from '../OrderCard'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { totalPrice } from '../../utils'
import './styles.css'
const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)

    const handleDelete = (id) => {
        const removeProductIndex = context.cartProducts.findIndex(product => product.id === id)

        if(removeProductIndex !== -1){
            context.cartProducts.splice(removeProductIndex, 1)
            context.setCount(context.count - 1)
        }
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: '01.03.24',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setCount(0)
    }
    return (
        <aside className={` ${context.isOpenCheckoutSideMenu ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6 '>
                <h2 className='font-medium text-xl'>Checkout</h2>
                <div>
                    <XMarkIcon 
                        className='h-6 w-6 text-black-500 cursor-pointer'
                        onClick={context.closeCheckoutSideMenu}
                    />
                </div>
            </div>

            <div className='px-6 overflow-y-scroll flex-1'>
                {context.cartProducts.map(product=> (
                    <OrderCard 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.images}
                        price={product.price}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>

            <div className='px-6 mb-5'>
                <p className='flex justify-between items-center mb-2'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button 
                        className='w-full bg-black py-3 text-white rounded-lg' 
                        onClick={() => handleCheckout()}
                    >
                        Checkout
                    </button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu

