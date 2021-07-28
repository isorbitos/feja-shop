import Link from 'next/link'
import { patchData } from '../utils/fetchData'
import PaypalBtn from './paypallBtn'
import {updateItem} from '../store/Actions'

const OrderDetail = ({orderDetail, state, dispatch})=>{

    const {auth, orders} = state

    const handleDelivered = (order) =>{
        dispatch({type: 'NOTIFY', payload:{loading:true}})
        patchData(`order/delivered/${order._id}`, null, auth.token)
        .then(res=>{
            if(res.err) return dispatch({type: 'NOTIFY', payload:{error:res.err}})
            
        })
    }

    return (
        <>
                {
                    orderDetail.map(order =>(
                    <div key={order._id} style={{ margin: '20px auto'}} className="" >

                        <div  className="text-uppercase my-3" style={{maxWidth: '600px'}} >
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
                                    {
                                        auth.user.role ==='admin' && !order.delivered &&
                                        <button className="btn btn-dark text-uppercase" onClick= { ()=>handleDelivered(order)}>
                                            Mark as delivered
                                        </button>
                                    }
                                </div>
                                <h3>Payment</h3>
                                <h6>Method: {order.method}</h6>
                                <h6>PaymentId:{order.paymentId}</h6>
                                <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'} 
                                d-flex justify-content-between align-items-center`} role="alert"> 
                                    {
                                        order.paid ? `Paid at ${new Date(order.dateOfPayment).toLocaleDateString()}` : 'Not paid'
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
                        {
                            !order.paid && auth.user.role !== 'admin' &&
                            <div className="p-4" style={{maxWidth: '600px'}}>
                                <h2 className="text-uppercase"> Total: ${order.total} </h2>
                                <PaypalBtn order={order}/>
                        </div>

                        }
                        
                        
                        
                    </div>
                    ))
                }
            
        </>
    )
}

export default OrderDetail