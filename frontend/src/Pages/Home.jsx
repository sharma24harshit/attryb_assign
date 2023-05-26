import { Box, Button, Heading } from '@chakra-ui/react'
import  { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import axios from "axios";

const Home = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(false);
const nav = useNavigate();

const addCarPage  =()=>{
  nav("/addcar")
}

useEffect(()=>{
fetchCarData()
},[])

const fetchCarData = async()=>{
  setLoading(true)
try {
  const response = await axios.get(`https://gold-elated-fossa.cyclic.app/marketplace`)
  const res = response.data;
  setCarData(res)
  setLoading(false)
} catch (error) {
  console.log(error)
  setLoading(false)
}
}
if(loading) return (<h2>...Loading</h2>)
  return (
    <div>
      <Box className='add_car' ><Button style={{backgroundColor:"rgb(5, 51, 94)",color:"white"}}
      onClick={addCarPage}> Add Car </Button></Box>
      <Heading className='Heading' >Home Page</Heading>
      <Box className='homePage_cars_container'>
        {carData && carData.map((el)=>(
          <div key={el._id} className='homePage_cars_div' >
            <img src={el.imgUrl} alt={el._id} />
            <p>{`No. of Kms driven :- ${el.km_odoMeter} Km`}</p>
            <p>{`Original Paint :- ${el.original_paint}`}</p>
            <p>{`Previous Buyers :- ${el.previous_buyers}`}</p>
            <p>{`Registration Place :- ${el.registration_place}`}</p>
            <p>{`Price :- ${el.dealer_price} Rs.`}</p>
            <div className='details_btn' ><button>See Details</button></div>
          </div>
        ))}
      </Box>
    </div>
  )
}

export default Home