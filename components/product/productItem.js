import Link from 'next/link'
import { useContext } from 'react';
import { addToCart } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';

const ProductItem = ({product}) =>{

    const userLink =() =>{

        const {state, dispatch} = useContext(DataContext)
        const { cart } = state

        return(
            //TODO sutvarkyt tarpus tapt buttonu
            <>
            <Link href={`/product/${product._id}`}>
                <a className="btn btn-info mr-1  col-sm-6"
                style={{marginRight: '5x', flex:1}}>View</a>
            </Link>
            
            <button className="btn btn-success ml-1 col-sm-6" 
            style={{marginLeft: '5x', flex:1}}
            disabled={product.inStock ===0}
            onClick={()=> dispatch(addToCart(product, cart))} >
                Buy
            </button>
            </>
        )
    }

    return(
        <div className="card" style={{width: "18rem"}}>
            <img src={product.images[0].url} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={product.title}>
                    {product.title}
                </h5>
                <div className="row justify-content-between mx-0">
                    <div className="col-6"><h6 className="text-danger">{product.price} €</h6></div>
                    <div className="col-6">
                    {
                        product.inStock >0 ? <h6 className="text-success">In stock: {product.inStock}</h6> : <h6 className="text-danger">Out stock!</h6>
                    }
                    </div>
                    
                </div>
                <p className="card-text" title={product.description}>
                    {product.description}
                </p>
                <div className="row gx-5 justify-content-between mx-0">
                    {userLink()}
                </div>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
};

export default ProductItem;