import react from 'react';
import { GrCart } from "react-icons/gr";
import {Link} from 'react-router-dom';
import { withUser,withCart } from './withProvider';

function Navbar( { totalCount,setUser,user,setCart } ){
  const Logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    localStorage.removeItem('cart');
    totalCount = 0;
    setCart({});
  }
  let attr = "";
  if(!user){
    attr= "hidden";
  }
  return(
    <div className="bg-white h-20 flex pl-16 w-[90%] mx-auto justify-between ">
      <Link to="/" className="h-10 self-center">
        <img src="https://cdn.pixabay.com/photo/2021/08/10/16/02/amazon-6536326_1280.png" alt="Amazon Logo" className="h-full w-full object-cover"/>
      </Link>
      <div className="flex">
        <Link to="/Cart" className="flex flex-col items-center">
          <GrCart className="items-center text-6xl text-primary-light mt-2" />
          <p className="-m-12 text-sm">{totalCount}</p>
        </Link>
        <button onClick={Logout} className={"mt-4 h-10 p-2 bg-primary-light hover:bg-primary-default rounded-md font-semibold "+attr}>Logout</button>
      </div>
    </div>
  );
}
export default withUser(withCart(Navbar));