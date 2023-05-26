import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup"
import OEM from "./OEM";
import AddCar from "./AddCar";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oem" element={<OEM />} />
        <Route path="/addcar" element={<AddCar />} />
      </Routes>
    </div>
  );
};

export default Allroutes;