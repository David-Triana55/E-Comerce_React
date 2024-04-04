import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
    // Shopping Cart * Increment quality
    const [count, setCount] = useState(0)

    // Product Detail * Open/Close
    const [isOpenProductDetail, setIsOpenProductDetail] = useState(false)
    const openProductDetail = () => setIsOpenProductDetail(true)
    const closeProductDetail = () => setIsOpenProductDetail(false)
    
    // Product Detail * Open/Close
    const [isOpenCheckoutSideMenu, setIsOpenCheckoutSideMenu] = useState(false)
    const openCheckoutSideMenu = () => setIsOpenCheckoutSideMenu(true)
    const closeCheckoutSideMenu = () => setIsOpenCheckoutSideMenu(false)
    
    // Product Detail . Show product 
    const [productToShow,setProductToShow] = useState({})

    // Shopping cart . Add products to cart

    const [cartProducts, setCartProducts] = useState([])

    //  Shopping Cart . order
    const [order, setOrder] = useState([])

    // Get Products
    const [items , setItems] = useState(null)
    const [filteredItems , setFilteredItems] = useState(null)

    // Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    const [searchByCategory , setSearchByCategory] = useState(null)


    useEffect(()=> {
        const fetchData =  async () => {
            try{
                const res = await fetch('https://api.escuelajs.co/api/v1/products')
                const data =  await res.json()
                console.log(data);
                setItems(data)
            } catch(err) {
                console.error(err);
            }
        }
        fetchData()
    }, [])


    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, SearchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(SearchByCategory.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
        return filteredItemsByTitle(items, searchByTitle)
    }

    if (searchType === 'BY_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory)
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if (!searchType) {
        return items
    }
    }

    useEffect(() => {
        if (searchByTitle && searchByCategory) {
            setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        }
        if (searchByTitle && !searchByCategory) {
            setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        }
        if (!searchByTitle && searchByCategory) {
            setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        }
        if (!searchByTitle && !searchByCategory) {
            setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
        }
    }, [items, searchByTitle, searchByCategory])


    useEffect(() => {
        if (!searchByTitle && !searchByCategory) {
            setFilteredItems(items); // Restablecer la lista completa de productos
        }
    }, [searchByTitle, searchByCategory]);

    console.log(searchByCategory, filteredItems);

    return (
        <ShoppingCartContext.Provider 
            value={{
                count,
                setCount,
                isOpenProductDetail,
                openProductDetail,
                closeProductDetail,
                productToShow,
                setProductToShow,
                cartProducts,
                setCartProducts,
                isOpenCheckoutSideMenu,
                setIsOpenCheckoutSideMenu,
                openCheckoutSideMenu,
                closeCheckoutSideMenu,
                order,
                setOrder,
                items,
                setItems,
                searchByTitle,
                setSearchByTitle,
                filteredItems,
                searchByCategory,
                setSearchByCategory
        
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}