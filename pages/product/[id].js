import Head from 'next/head'
import { useState } from 'react'
import { getData } from '../../utils/fetchData'

const DetailProduct = (props) =>{
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)
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
                        className="img-thumbnail rounded"
                        style={{height: "80px", width: '25%'}}
                        onClick={()=>setTab(index)}/>
                    })}
                </div>
            </div>
            <div className="col-md-6">
                <h1>{product.title}</h1>
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