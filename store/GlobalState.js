//TODO need to learn more about reducers
import {createContext, useEffect, useReducer} from 'react'
import { getData } from '../utils/fetchData'
import reducers from './Reducers'

export const DataContext = createContext()

export const DataProvider =({children}) =>{
    const initialState = { notify:{}, auth: {}, cart:[], modal: {}, orders: []}
    const [state, dispatch] = useReducer(reducers, initialState)
    const {cart, auth} = state

    useEffect(()=>{
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin){
            getData('auth/accessToken').then(res => {
                if(res.err) return localStorage.removeItem("firstLogin")
                dispatch({ 
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
        }
    }, [])

    useEffect(()=>{
        const __next__cart01__devat = JSON.parse(localStorage.getItem('__next__cart01__devat'))
        if(__next__cart01__devat) dispatch({type: 'ADD_CART', payload: __next__cart01__devat})
    }, [])


    useEffect(()=>{
        localStorage.setItem('__next__cart01__devat', JSON.stringify(cart))
    }, [cart])

    useEffect(()=>{
        if(auth.token){
            getData('order', auth.token)
            .then(res=> {
                if(res.err) return dispatch({type:"NOTIFY", payload:{error: res.err}})

                dispatch({type: 'ADD_ORDERS', payload: res.orders})
            })
        }
    },[auth.token])

    return(
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}