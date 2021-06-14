import Head from 'next/head'
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';

const Cart = () =>{
    const {state, dispatch} = useContext(DataContext)
    const { cart } = state

    if(cart.length===0) return <img className="img-fluid rounded" src="/maxresdefault.jpg" alt="empty cart!!!"/>

    return(
      <div>
        <Head>
          <title>Žolių fėja - Cart</title>
        </Head>
        Cart Page
      </div>
    )
  }
  
export default Cart;