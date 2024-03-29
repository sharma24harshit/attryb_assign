const express = require("express")
const OEM_Data = require("../model/OEM_Specs.model")
const oemspecsRoute = express.Router()

oemspecsRoute.get("/",async(req,res)=>{
    const {q} = req.query
    try{
        const data = await OEM_Data.find({"name":{$regex:".*"+q+".*",$options:"i"}}).select("name image _id").exec()
        res.status(200).send(data)
    }catch(err){
        res.status(400).send("cannot find the data")
    }
})


// just for adding in backend 

oemspecsRoute.post("/add",async(req,res)=>{
    try{
        const newData = new OEM_Data(req.body)
        const data = await newData.save()
        console.log(data)
        res.send(data)
    }catch(err){
        res.status(400).send("cannot find the data")
    }
})

module.exports = oemspecsRoute