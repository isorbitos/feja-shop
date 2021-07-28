import connectDB from "../../../utils/connectDB";
import Orders from '../../../models/orderModel';
import auth from "../../../middleware/auth";
import Products from "../../../models/productModel";

connectDB()

export default async (req, res) =>{
    switch(req.method){
        case "POST":
            await createOrder(req, res)
            break;
        case "GET":
            await getOrders(req, res)
            break;
    }
}

const getOrders = async(req, res)=>{
    try {
        const result = await auth(req, res)
        let orders;

        if(result.role !== 'admin'){
            orders = await Orders.find({user: result.id}).populate("user", "-password")
        }else{
            orders = await Orders.find().populate("user", "-password")
        }

        res.json({orders})
        
    } catch (error) {
        return res.status(500).json({error:error.mesage})
    }
}

const createOrder = async(req, res) =>{
    try {
        const result = await auth(req, res)
        const {address, mobile, cart, total} = req.body

        const newOrder = new Orders({
            user: result.id, address, mobile, cart, total
        })

        cart.filter(item =>{
            return sold(item._id, item.quantity, item.inStock, item.sold)
        })

        await newOrder.save()

        res.json(
            {
                msg: 'Order success!!! We will contact to confirm order.',
                newOrder}
            )
    } catch (error) {
        return res.status(500).json({error:error.mesage})
    }
}

const sold = async (id, quantity, oldInStock, oldSold) => {
    await Products.findOneAndUpdate({_id: id}, {
        inStock: oldInStock - quantity,
        sold: quantity + oldSold
    })
}