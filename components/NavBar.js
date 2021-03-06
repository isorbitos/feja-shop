//TODO need to create react starter snipet
import React, { useContext } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'


function NavBar(){

    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const {auth, cart} = state

    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
        }
    }

    const logoutHandler = ()=>{
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({type: 'AUTH', payload: {} })
        dispatch({type: 'NOTIFY', payload: {success: 'Logged out'} })
    }

    const adminRouter = () =>{
        return(
            <>
            <Link href="/users">
                <li><a className="dropdown-item" >Users</a></li>
            </Link>
            <Link href="/create">
                <li><a className="dropdown-item" >Products</a></li>
            </Link>
            <Link href="/categories">
                <li><a className="dropdown-item" >Categories</a></li>
            </Link>
            </>
        )
    }

    const loggedRouter =()=>{
        return(
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={auth.user.avatar}  alt={auth.user.name}
                style={{
                    borderRadius: '50%', width: '35px', height: '35px', marginRight:"3px",
                    transform:'translateY(-3px)'
                }}
                />
                {auth.user.name}
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link href="/profile">
                <li><a className="dropdown-item" >Profile</a></li>
                </Link>
                {
                    auth.user.role === 'admin' && adminRouter()
                }
                <div className="dropdown-divider"></div>
                <li><button className="dropdown-item" onClick={logoutHandler}>Logout</button></li>
            </ul>
        </li>
        )
        
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link href="/">
                <a className="navbar-brand" >??oli?? F??ja</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav p-1">
                        <li className="nav-item">
                            {/* TOTO sutvarkyt css'a */}
                            <Link href="/cart">
                                <a className={"nav-link" + isActive('/cart')} aria-current="page">
                                    <i aria-hidden className="fas fa-shopping-cart position-relative">
                                    <span className="position-absolute" style={{
                                        padding: '3px 5px',
                                        background: 'pink',
                                        borderRadius: "50%",
                                        top:'-10px',
                                        right: '-10px',
                                        color: 'white',
                                        fontSize: '12px',
                                    }}>
                                        {cart.length}
                                        </span></i> Cart
                                </a>
                            </Link>
                        </li>
                        {
                            Object.keys(auth).length === 0 ?
                            <li className="nav-item">
                                <Link href="/signin">
                                    <a className={"nav-link" + isActive('/signin')} aria-current="page"><i aria-hidden className="fas fa-user"></i> Sign in</a>
                                </Link>
                            </li>
                            : loggedRouter()
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar