import connectDB from "../../../../utils/connectDB";
import Orders from '../../../../models/orderModel';
import auth from "../../../../middleware/auth";

connectDB()

export default async (req, res) =>{
    switch(req.method){
        case "PATCH":
            await delivereOrder(req, res)
            break;
        
    }
}

const delivereOrder = async(req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err : "Authentication is not valid!!!"})
        const {id} = req.query

        const order = await Orders.findOne({_id:id})
        if(order.paid){
            await Orders.findOneAndUpdate({_id: id},{
                delivered: true
            })
            res.json({
                msg:'Update success!',
                result:{
                    delivered: true 
                }
            })
        }else{
            await Orders.findOneAndUpdate({_id: id},{
                paid:true, dateOfPayment: new Date().toISOString(), 
                method: 'Cash', delivered: true
            })

            res.json({
                msg:'Update success!',
                result:{
                    paid:true, dateOfPayment: new Date().toISOString(), 
                    method: 'Cash', delivered: true 
                }
            })
        }

        
    } catch (error) {
        return res.status(500).json({err:error.message})
    }
}