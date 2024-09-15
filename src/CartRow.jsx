import React,{ useEffect,useState,memo }  from "react";
import { RxCrossCircled } from "react-icons/rx";


function CartRow({cart,quant,dummy_quan}){
  const [quantity,setQuantity] = useState(quant);

  function handleChange(event){
      if(+event.target.value<0){
          dummy_quan(cart.id,0);
          setQuantity(0);
      }
      else{
          dummy_quan(cart.id,+event.target.value);
          setQuantity(+event.target.value);
      }
  }
  function handleRemove(){
      dummy_quan(cart.id,0);
      setQuantity(0);
      }

  
  
  return(
    <div className="flex space-x-4 items-center border border-gray-300 p-4">
      
        <button onClick={handleRemove}>
          <RxCrossCircled />
        </button>
        <div className="h-10 w-10">
          <img className="h-full w-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSvId9ySl-OGP2RQpHH4OOeHelOMCqPP35Xw&s" />
        </div>

        <h1 className="font-bold grow text-primary-default">{cart.title}</h1>
      
        <p className="w-22">${cart.price.toFixed(2)}</p>
        <input value={quantity} onChange={handleChange} type="number" className="w-16 mx-2 border py-2 px-2 text-center rounded-md" />
        <h3 className="w-22">${(cart.price*quantity).toFixed(2)}</h3>


    </div>
  );
}

export default memo(CartRow);