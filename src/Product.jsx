import React from 'react';
import {Link} from "react-router-dom";

function Product({thumbnail, category, title, rating, price, id}){
  return(
    <Link to={"/ProductDetail/"+id} className="max-w-xs flex flex-col border-b-2 border-black md:border-none py-2 md:py-0">
        <div className="w-30 h-30 md:w-40 md:h-40 aspect-square">
          <img className="h-full w-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSvId9ySl-OGP2RQpHH4OOeHelOMCqPP35Xw&s" />
        </div>
        <span className="grow"></span>
        <h2 className="text-gray-500 text-xs">{category}</h2>
        <h1>{title}</h1>
        <h2 className="text-red-500 text-xs">{rating}</h2>
        <p className="text-sm font-semibold">${price}</p>
    </Link>
  );
}
export default Product;