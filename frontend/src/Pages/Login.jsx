import { Heading, useToast } from "@chakra-ui/react";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {
  const [obj, setObj] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const toast = useToast()

  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( obj.email == "" || obj.password == "") {
        toast({
          title: 'Please fill all fields.',
          description: "All fields are mandatory",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
      } else {
         loginUser()
      }
  };

  const loginUser = async()=>{
  
    try {
     let res = await axios.post(`https://chambray-quixotic-badge.glitch.me/auth/login`,obj);
     console.log(res.data)
     if(res.data.message == "login Successful"){
       toast({
         title: 'Login Successfully',
         description: "Success",
         status: 'success',
         duration: 2000,
         isClosable: true,
       })
       localStorage.setItem("buyCarToken",res.data.token)
      nav("/")
     }
     else if(res.data.message == "Invalid Credentials"){
      toast({
        title: 'Login Failed',
        description: `${res.data.message}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
     }

    } catch (error) {
     toast({
       title: 'Login Failed.',
       description: "Login error",
       status: 'error',
       duration: 2000,
       isClosable: true,
     })
    }
   }

  return (
    <div>
      <Heading className="Heading">Login Page</Heading>
      <div className="formBox">
        <form onSubmit={handleSubmit}>
          <label>Enter Email</label>
          <br />
          <input
            type="email"
            value={obj.email}
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
          <br />
          <label>Enter Password</label>
          <br />
          <input
            type="password"
            value={obj.password}
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
          <br />
          <Link to="/signup" >{"Don't have account?"} <span className='login_link' >Click</span></Link>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;