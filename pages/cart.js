import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import Link from 'next/link'
import { getData } from '../utils/fetchData';
import PaypalBtn from './paypallBtn';

const Cart = () =>{
    const {state, dispatch} = useContext(DataContext)
    const { cart, auth } = state

    const [total, setTotal] = useState(0)

    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [payment, setPayment] = useState(false)

    useEffect(()=>{
        const getTotal =() => {
          const res = cart.reduce((prev, item)=>{
            return prev + (item.price * item.quantity)
          }, 0)
          setTotal(res)
        }
        getTotal()
    }, [cart])

    useEffect(() =>{
      const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__devat'))
      if(cartLocal && cartLocal.length >0){
        let newArr = []
        const updateCart = async () => {
          for (const item of cartLocal){
            const res = await getData(`product/${item._id}`)
            const { _id, title, images, price, inStock } = res.product
            if(inStock > 0 ){
              newArr.push({ _id, title, images, price, inStock,
              quantity: item.quantity > inStock  ?  1 : item.quantity })
            }
          }
         dispatch({type: 'ADD_CART', payload: newArr })
        }
        updateCart()
      }
    },[])

    const handlePayment = () =>{
      if(!address || !mobile) return dispatch({type: 'NOTIFY', payload:{error: 'Plese add your addres or phone'}})

      setPayment(true)
    }

    if(cart.length===0) return <img className="img-fluid rounded" src="/maxresdefault.jpg" alt="empty cart!!!"/>

    return(
      <div className="row mx-auto">
        <Head>
          <title>Žolių fėja - Cart</title>
        </Head>
        <div className="col-md-8 text-secondary table-responsive my-3">
          <h2 className="text-uppercase">Shopping cart</h2>
          <table>
            <tbody>
              {cart.map(item =>(
                <CartItem key={item._id}  item={item} dispatch={dispatch} cart={cart}/>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 my-3 text-end text-uppercase text-secondary">
                <form>
                  <h3>shipping</h3>
                  <label htmlFor="address">Address</label>
                  <input type="text" name="address" id="address" value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="form-control mb-2" />

                  <label htmlFor="mobile">Mobile</label>
                  <input type="text" name="mobile" id="mobile" value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  className="form-control mb-2" />
                </form>
                <h3>Total: <span className="text-info" >€{total}</span></h3>

                {
                payment ? <PaypalBtn  
                  total={total}
                  address={address}
                  mobile={mobile}
                  state={state}
                  dispatch={dispatch}
                  /> : 
                <Link href={auth.user ? '#!' : '/signin'}>
                  <a className="btn btn-dark" onClick={handlePayment}>Procced with payment</a>
                </Link>
                }
                
                
            
        </div>
      </div>
    )
  }
  
export default Cart;