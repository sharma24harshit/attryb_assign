import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react'
import  { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import axios from "axios";
import { useToast } from '@chakra-ui/react'

const Home = () => {
  const [obj, setObj] = useState({km_odoMeter:"", major_scratches:"", 
  original_paint:"", accidents_reported:"", previous_buyers:"", registration_place:"",dealer_price:""});
    const [carModel, setCarModel] = useState("");
    const [carData, setCarData] = useState([]);
const [OEMSepcs, setOEMSpecs] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
const nav = useNavigate();
const toast = useToast()

useEffect(()=>{
let token  = localStorage.getItem("buyCarToken");
console.log(token)
if(token==undefined || token==null){
  nav("/login")
}
},[])

const handleSubmit = async()=>{
  if(obj.km_odoMeter==""|| obj.major_scratches==""|| obj.original_paint=="" || obj.accidents_reported==""|| obj.previous_buyers==""||
  obj.registration_place == "" || obj.dealer_price == ""){
    toast({
      title: 'Please fill all fields.',
      description: "All fields mandatory",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
   }
   else{
    let newObj = {...obj,car_data:OEMSepcs._id}
    try {
     const response  = await axios.post(`https://chambray-quixotic-badge.glitch.me/marketplace/add`,newObj,{
      headers:{
       Authorization:`Barrier ${localStorage.getItem("buyCarToken")}`
      }
     }); 
     console.log(response)
     onClose()
    } catch (error) {
      console.log(error)
    }
     
   }
}

const handleDetails = (e)=>{
  setObj({ ...obj, [e.target.name]: e.target.value });
}

const handleCarModel = (e)=>{
  
  setCarModel( e.target.value );
  
}

const SearchCarModel = async()=>{
  if(carModel!=""){
    try {
      const car = await axios.get(`https://chambray-quixotic-badge.glitch.me/oemspecs?q=${carModel}`);
      setCarData(car.data)    
    } catch (error) {
      console.log(error)
    }
    
  }
}

const addOEM = (el)=>{
  setOEMSpecs(el)
  setCarData([])
}

  return (
    <div>
      <Box className='add_car' ><Button style={{backgroundColor:"rgb(5, 51, 94)",color:"white"}}
      onClick={onOpen}> Add Car </Button></Box>
      <Heading className='Heading' >Home Page</Heading>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Box>
          
        <label>Enter KMs on Odometer</label>
          <br />
          <input
            type="number"
            value={obj.km_odoMeter}
            placeholder="Enter KMs on Odometer"
            name="km_odoMeter"
            onChange={handleDetails}
          />
          <br />
          <label>No. of Major Scratches</label>
          <br />
          <input
            type="number"
            value={obj.major_scratches}
            placeholder="Enter email"
            name="major_scratches"
            onChange={handleDetails}
          />
          <br />
          <label>Original Paint</label>
          <br />
          <input
            type="text"
            value={obj.original_paint}
            name="original_paint"
            placeholder="Original Paint"
            onChange={handleDetails}
          />
          <br />
          <label>Number of accidents reported</label>
          <br />
          <input
            type="number"
            value={obj.accidents_reported}
            name="accidents_reported"
            placeholder="Enter Number of accidents reported"
            onChange={handleDetails}
          />
          <br />
          <label>Number of previous buyers</label>
          <br />
          <input
            type="number"
            value={obj.previous_buyers}
            name="previous_buyers"
            placeholder="Number of previous buyers"
            onChange={handleDetails}
          />
          <br />
          <label>Registration Place</label>
          <br />
          <input
            type="text"
            value={obj.registration_place}
            name="registration_place"
            placeholder="Enter Registration Place"
            onChange={handleDetails}
          />
          <br />
          <label>Enter Price</label>
          <br />
          <input
            type="number"
            value={obj.dealer_price}
            name="dealer_price"
            placeholder="Enter car Price"
            onChange={handleDetails}
          />
          <br />
          <label>Enter Car Model</label> <br />
          <input  type="text"
            value={carModel}
            name="dealer_price"
            onChange={handleCarModel}
            placeholder='Search car OEM' /> <input type="button" value="Search" onClick={SearchCarModel} /> <br />
            {carData && carData.map((el)=>(
              <div key={el._id} onClick={()=>addOEM(el)} >
                  <p>{el.name}</p>
              </div>
             
            ))}
            {OEMSepcs &&
            <div>
               <label>Model Name</label>
            <br />
            <input
              value={OEMSepcs.name} readOnly
            />
            <br />
              <label>Max Speed</label>
            <br />
            <input
              value={OEMSepcs.max_speed} readOnly
            />
            <br />
            <label>Manuf. Year</label>
            <br />
            <input
              value={OEMSepcs.mfg_year} readOnly
            /> 
            <br />
            <label>Mileage</label>
            <br />
            <input
              value={OEMSepcs.mileage}   readOnly
            />
            <br />
            <label>Model</label>
            <br />
            <input
              value={OEMSepcs.model}  readOnly
            />
            <br />
            <label>Original Price</label>
            <br />
            <input
              value={OEMSepcs.og_price}  readOnly
            />
            <br />
            <label>Power(BHP)</label>
            <br />
            <input
              value={OEMSepcs.power}  readOnly
            />
            <br />

            </div>
            }
      
           </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={handleSubmit} >Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Home