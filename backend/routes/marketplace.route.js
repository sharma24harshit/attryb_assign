const express = require("express")
const MarketPlace = require("../model/Marketplace_Inventory.model")
const  marketplaceRoute=express.Router()

marketplaceRoute.post("/add",async(req,res)=>{
    try{
        const newCar = new MarketPlace(req.body)
        let data = await newCar.save()
        res.status(200).send({message:"car added successfully",data})
    }catch(err){
        res.status(400).send("someting went wrong")
    }
})
marketplaceRoute.get("/",async(req,res)=>{
    try{    
        const allData = await MarketPlace.find().populate({
            path:"author",
            select:"name _id"
        }).populate({
            path:"car_data",
        })
        res.status(200).send(allData)
    }catch(err){
        res.status(400).send("someting went wrong")
    }
})

module.exports = marketplaceRoute;