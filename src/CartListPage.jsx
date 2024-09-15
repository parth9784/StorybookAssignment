import react,{ useState,useEffect } from 'react';
import CartRow from './CartRow';
import { getProductData } from './api';
import Loading from './Loading';
import { ImSpinner6 } from "react-icons/im";
import { getProductsByIds } from "./api";
import { withCart } from "./withProvider";
import { Link } from "react-router-dom";


function CartListPage({cart,updateCart,changedCart}){

    const [carts,setCart] = useState(cart);
    const [cart_products,setCarts] = useState(changedCart);

    useEffect(()=>{
        setCarts(changedCart)
    },[changedCart]);

    const totalCount =  cart_products.reduce(function(previous,current){
        if(current){
          return previous + current.quantity*current.product.price;
        }
    },0)

   function handle_count(id,temp_count){
    const a = [...cart_products];
    const b = {...cart};
    b[id] = temp_count;
    for(let i=0;i<a.length;i++){
        if(a[i]){
          if(a[i].product.id==id){
              delete a[i];
              // setCarts(a);
          }
        }
    }
    setCart(b);
    setCarts(a);
   }
  
   function handle_cart(){
    const m = {...carts};
    const keys_array = Object.keys(m);
    for(let i=0;i<keys_array.length;i++){
        if(m[keys_array[i]]==0){
            delete m[keys_array[i]];
        }
    }
    updateCart(m);
   }
  if(Object.keys(cart).length==0){
    return (
        <div className="flex flex-col gap-6 items-center">
        <h1 className="bold text-3xl">Your Cart Is Empty</h1>
        <Link to="/">
          <button className="bg-primary-light hover:bg-primary-dark">
            Back To Homepage
          </button>
        </Link>
        </div>
    )
  }
  return (
      <div className="bg-white max-w-6xl mx-auto mt-8 mb-8 p-8">

        <div className="flex flex-col">
          <div className="flex w-2/3 mx-auto px-4 py-2 space-x-4">
              <h2 className="font-bold ml-28 grow">Product</h2>
              <h2 className="font-bold w-18">Price</h2>
              <h2 className="font-bold w-16">Quantity</h2>
              <h2 className="font-bold w-22">Subtotal</h2>
          </div>
  
          
          <div className="w-2/3 bg-white mx-auto" >
          {cart_products.length==0 && <ImSpinner6 className="text-5xl mx-auto animate-spin"/>}
             {cart_products.length>0 && cart_products.map(function(item){
                if(item){
                  return(
                      <div key={item.product.id}>
                          <CartRow  cart={item.product} quant={item.quantity} dummy_quan={handle_count}/>
                      </div>
                  )
                }else{
                  return <></>
                }
              })}
          </div>
          
          <div className="border p-2 flex w-2/3 mx-auto justify-between">
            
            <div className="space-x-2">
              <input className="border py-2 px-2 text-center" type="text" placeholder="Coupon Code" />
              <button className="font-semibold border hover:bg-primary-dark bg-primary-default py-2 px-6 text-white rounded-md">APPLY COUPON</button>
            </div>
            
            <button onClick={handle_cart} className="border bg-primary-lightest hover:bg-primary-default py-2 px-6 text-gray-500 rounded-md">UPDATE CART</button>
            
          </div>
        </div>

        <div className="w-2/3 flex mx-auto justify-end mt-8">
          <div className="w-1/2 ">
            <h1 className="bg-gray-100 border font-bold p-2">Cart totals</h1>
            <div className="border p-1">
              <div className="flex border-b-2 mx-2 mt-2 gap-x-4 md:gap-x-12">
                <h2 className="font-bold w-[70%]">Subtotal</h2>
                <h2>${totalCount.toFixed(2)}</h2>
              </div>
              <div className="flex border-b-2 mx-2 mt-2 gap-x-4 md:gap-x-12">
                <h2 className="font-bold w-[70%]">Total</h2>
                <h2>${totalCount.toFixed(2)}</h2>
              </div>
              <div className="mx-2 mt-6">
                <button className="w-full bg-primary-default hover:bg-primay-dark text-white font-bold rounded-md px-6 py-2">PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
  );
}

export default withCart(CartListPage);