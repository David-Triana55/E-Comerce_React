import { Link , Navigate} from "react-router-dom"
import Layout from "../../Components/Layout"
import { useState, useContext, useRef } from "react"
import { ShoppingCartContext } from "../../Context"

const SignIn = () => {

    const context = useContext(ShoppingCartContext)
    const [view, setView]  = useState('user-info')
    const form = useRef(null)

    console.log(view);
    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0: true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0: true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState


    const handleSignIn = () => {
        const stringifySignOut = JSON.stringify(false)
        localStorage.setItem('sign-out', stringifySignOut)
        context.setSignOut(false)

        return <Navigate replace to={'/'}  />
    }


    const createAnAccount = () => {
        const formData = new FormData(form.current)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        }
        console.log(data);
        const stringifiedAccount = JSON.stringify(data);
        localStorage.setItem('account', stringifiedAccount);
        context.setAccount(data)
        handleSignIn()
    }

    // create Account


    const renderLogIn = () =>{
        return(
            <div className="flex flex-col w-80">
                <p>
                    <span className="font-light text-sm">Email: </span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <p>
                    <span className="font-light text-sm">Password: </span>
                    <span>********</span>
                </p>
                <Link to='/' >
                    <button 
                        className="bg-black disabled:bg-black/40 text-white mb-3 mt-4 h-12 rounded-lg w-80"
                        disabled={!hasUserAnAccount}
                        onClick={() => handleSignIn()}
                    >
                            Log in
                    </button>
                </Link>
                <p className="text-center text-sm underline">Forgot my Password</p>
                <button 
                    className="border border-black disabled:text-black/40 disabled:border-black/40 mt-6 h-12 rounded-lg"
                    onClick={() => setView('create-user-info')}
                    disabled={hasUserAnAccount}
                >Sign up</button>
            </div>
        )
    }

    const renderCreateUserInfo = () => {
        return (
            <form ref={form} className="flex flex-col w-80 gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="mb-1" >Your name:</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        defaultValue={parsedAccount?.name}
                        placeholder="Peter"
                        className="w-full border border-black h-12 rounded-lg px-4 py-2 placeholder:font-light " 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="mb-1" >Your email:</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        defaultValue={parsedAccount?.email}
                        placeholder="hi@helloworld.com"
                        className="w-full border border-black h-12 rounded-lg px-4 py-2 placeholder:font-light " 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="mb-1" >Your password:</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        defaultValue={parsedAccount?.password}
                        placeholder="Peter"
                        className="w-full border border-black h-12 rounded-lg px-4 py-2 placeholder:font-light " 
                    />
                </div>
                <Link to='/'>
                    <button 
                        className="bg-black text-white w-full rounded-lg py-3"
                        onClick={() => createAnAccount()}
                    >
                        Create
                    </button>
                </Link>

            </form>
        )
    }

    
    const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

    return (
        <Layout>
            <h1 className="font-medium text-xl mb-8">WELCOME</h1>
                {renderView()}

        </Layout>
    )
}

export default SignIn