import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "https://fooddelivery-frontend-t8w2.onrender.com/";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    const line_items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 50 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Stripe session error: ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
    const {orderId,success} = req.body;
  try {
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({ success: true, message: "Payment successful and order verified." });
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Not Paid"})
    }   
  }catch (error) {
    console.log("Error verifying order: ");
    res.json({ success: false, message: error.message });
  }
}

//user order for frontend
const userOrders = async (req,res) =>{
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log("error");
    res.json({success:false,message:"error"})
  }
}

export { placeOrder , verifyOrder, userOrders };
