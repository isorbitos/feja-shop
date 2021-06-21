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
    }
}

const createOrder = async(req, res) =>{
    try {
        const result = await auth(req, res)
        const {address, mobile, cart, total} = req.body

        const newOrder = new Orders({
            user: result.id, address, mobile, cart, total
        })

        res.json({result})
    } catch (error) {
        return res.status(500).json({error:error.mesage})
    }
}