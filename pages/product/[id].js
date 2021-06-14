import Head from 'next/head'
import { useContext, useState } from 'react'
import { addToCart } from '../../store/Actions'
import { DataContext } from '../../store/GlobalState'
import { getData } from '../../utils/fetchData'

const DetailProduct = (props) =>{
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const {state, dispatch} = useContext(DataContext)
    const { cart } = state

    // const imgRef = useRef()
    //norint panaudot:
    //<div className="row mx-0" style={{cursor: 'pointer'}} ref={imgRef}>

    const isActive = (index) =>{
        if(tab === index) return " active"
        return ""
    }

    // useEffect(()=>{
    //     const images = imgRef.current.children;
    //     for(let i=0; i<images.length; i++){
    //         images[i].className = images[i].className.replace("active", "")
    //     }
    //     images[tab].className = "img-thumbnail rounded active";
    // }, [tab])

    return (
        <div className="row detail_page">
            <Head>
                <title>Product name</title>
            </Head>

            <div className="col-md-6">
                <img src={product.images[tab].url}  alt={product.title}
                className="d-block img-thumbnail rounded mt-4 w-100"
                style={{height: '350px'}} />

                <div className="row mx-0" style={{cursor: 'pointer'}}>
                    {product.images.map((img, index)=>{
                        return <img key={index} src={img.url}  alt={img.url}
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        style={{height: "80px", width: '25%'}}
                        onClick={()=>setTab(index)}/>
                    })}
                </div>
            </div>
            
                    {/* mt -> margin top boostrapine sintakse */}
            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{product.title}</h2>
                <h5 className="text-danger">€{product.price}</h5>
                {/* TODO: neina i ta pacia eilute h5 ir h6 paleist */}
                {/* flex-nowrap nekristu i newline!!! */}
                <div className="row  justify-content-between" >
                    {
                        product.inStock > 0 ?
                        <h5 className="text-danger " style={{maxWidth: "200px"}}>In stock: {product.inStock} </h5>
                        : <h5 className="text-danger">Out stock!</h5>
                    }
                    <h6 className="text-danger " style={{maxWidth: "150px"}}>Sold: {product.sold}</h6>
                    <div className="my-2" >{product.description}</div>
                    <div className="my-2" >{product.content}{product.content}{product.content}</div>
                    {/* style={{maxWidth: "100px"}} */}
                    <button type="button" class="btn btn-dark d-block my-4" 
                    onClick={()=> dispatch(addToCart(product, cart))}
                    >Buy</button>
                </div>
            </div>
            
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`product/${id}`)
    console.log(res)
  
    return {
      props: {
         product: res.product,
        // result: res.result
      }, // will be passed to the page component as props
    }
  }

export default DetailProduct;