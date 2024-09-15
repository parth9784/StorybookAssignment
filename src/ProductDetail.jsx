import React,{ useState,useEffect} from 'react';
import {Routes, Route, Link,useParams} from "react-router-dom";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import {getProductList, getProductData} from './api';
import Loading from './Loading';
import NoProductFound from './NoProductFound';
import { withCart } from './withProvider';

function ProductDetail({ addToCart }){  

  let id = +useParams().id;

  const [product,setProduct] = useState(null);
  const [loading,setLoading] = useState(true);
  const [count,setCount] = useState(1);
  
  useEffect(function(){
    const data = getProductData(id);
    setCount(1);
    data.then(function(product){
      const x = product;
      setProduct(x);
      setLoading(false);
    }).catch(function(error){
      console.log(error);
      setLoading(false);
    });
  },[id]);

  function handleCount(event){
    setCount(event.target.value);
  }
  function handleButtonClick(){
    addToCart(id,+count);
  }
  
  if(loading){
    return <Loading />
  }
  
  if(!product){
    return <NoProductFound />
  }
  
  return (<>
    <div className="flex flex-col p-5 bg-white gap-x-6 mt-4 ml-6 mr-8 md:flex-row">
      <Link to="/">
        <HiArrowUturnLeft className="text-2xl"/>
      </Link>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSvId9ySl-OGP2RQpHH4OOeHelOMCqPP35Xw&s" alt="coffee mug" className="max-w-[300px] ml-2.5" />
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-1">
          <h1 className="mr-2 text-2xl">{product.title}</h1>
          <h2 className="font-bold">${product.price}</h2>
          <p>{product.description} </p>
          </div>
          <div className="flex max-h gap-x-1">
            <input value={count} 
              min="0"
              onChange={handleCount} 
              className="border-solid border-2 border-gray-300 w-16" 
              type="number"
              />
            <button onClick={handleButtonClick} className="bg-primary-light hover:bg-primary-default text-white rounded-md px-7 py-1">Add to Cart</button>
          </div>
      </div>
    </div>
    <div className="flex justify-between px-5 mt-4">
        <div className="flex">
        {id > 1 && (
          <Link to={"/ProductDetail/"+(id-1)} className="text-xl px-6 py-2 bg-primary-light hover:bg-primary-default text-white rounded-lg items-center"><HiArrowNarrowLeft className="text-2xl" /> Previous</Link>
        )}
        </div>
        <Link to={"/ProductDetail/"+(id+1)} className="text-xl px-6 py-2 bg-primary-light hover:bg-primary-default text-white items-center rounded-lg self-end"><HiArrowNarrowRight className="text-2xl" /> Next</Link>

    </div>
  </>);
}
export default withCart(ProductDetail);