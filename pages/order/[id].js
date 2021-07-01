import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/GlobalState";
import {useRouter} from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

// TODO need to fix sime order items css
const DetailOrder = () => {

    const {state, dispatch} = useContext(DataContext);
    const {orders, auth} = state

    const router = useRouter()

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() =>{
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    },[orders])

    return (
        <div className="my-3">
            <Head>
                <title>Detail order</title>
            </Head>
            <div>
                <button className="btn btn-dark" onClick={()=> router.back()}> 
                    <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i>Go Back!!!
                </button>
            </div>
            

            <div style={{maxWidth:'600px', margin: '20px auto'}}>
                {
                    orderDetail.map(order =>(
                        <div key={order._id} className="text-uppercase my-3">
                            <h3 className="text-break">Order {order._id}</h3>
                            <div>
                                <h4>Shipping</h4>
                                <p>Name: {order.user.name}</p>
                                <p>Email: {order.user.email}</p>
                                <p>Address: {order.address}</p>
                                <p>Mobile: {order.mobile}</p>
                                <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'} 
                                d-flex justify-content-between align-items-center`} role="alert"> 
                                    {
                                        order.delivered ? `Delivered at ${new Date(order.createdAt).toLocaleDateString()}` : 'Delivering...'
                                    }
                                </div>
                                    <div>
                                        <h4>Order Items</h4>
                                        {
                                            order.cart.map(item =>(
                                                <div key={item._id} className="row border-bottom mx-0 p-2 justify-content-betwen align-items-center" style={{maxWidth: "550px"}}>
                                                    <div className='col'>
                                                        <img src={item.images[0].url} alt="image"  
                                                        style={{width:'50px', height:'45px', objectFit:'cover' }} />
                                                    </div>
                                                    
                                                    <div className='col'>
                                                        <h5 className="flex-fill text-secondary px-3 m-0">
                                                            <Link href={`/product/${item._id}`}>
                                                                <a>{item.title}</a>
                                                            </Link>
                                                        </h5>
                                                    </div>
                                                    <div className='col'>
                                                    <span className="text-info text-lowercase m-0">
                                                        {item.quantity} x €{item.price} = €{item.price * item.quantity}
                                                    </span>
                                                    </div>
                                                    
                                                </div>
                                            ))
                                        }
                                    </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default DetailOrder;