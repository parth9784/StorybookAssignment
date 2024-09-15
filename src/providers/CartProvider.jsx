import React,{ useState,useCallback,useMemo,useEffect } from "react";
import { CartContext } from "../Contexts";
import { withUser } from '../withProvider';
import { saveCart,getCart,getProductsByIds } from '../api';

function CartProvider({user,isLoggedIn,children}){
    
    const [changedCart,setChangedCart] = useState([]);
    const [cart,setCart] = useState({});


    useEffect(()=>{
        if(!isLoggedIn){
            const savedData = localStorage.getItem("added-item") || "{}";
            const convertData = JSON.parse(savedData);
            const keys = Object.keys(convertData);

            getProductsByIds(keys).then((product)=>{
                const carts = [];
                for(let i = 0;i<product.length;i++){
                    carts.push({product: product[i],quantity: convertData[product[i].id]})
                }
                setChangedCart(carts);
                setCart(convertData);
            })
        }
        if(isLoggedIn){
            getCart().then((response)=>{
                const d= {};
            for(let i = 0;i<response.length;i++){
                d[response[i].product.id] = response[i].quantity;
            }
            setChangedCart(response);
            setCart(d);
            })

        }
    },[isLoggedIn])

  
    function addToCart(productId,count){
        const old = cart[productId] || 0;
        setCart({...cart,[productId]:old+count})
        if(!user){
            localStorage.setItem("added-item",JSON.stringify({...cart,[productId]:old+count}));
        }
        else{
          setCart({...cart,[productId]:old+count});
          saveCart({...cart,[productId]:old+count});
        }
      }
  
      function updateCart(update_cart){
        const a = {...update_cart}
        setCart({...a});
        if(!user){
            localStorage.setItem("added-item",JSON.stringify({...a}))
        }
        else{
            saveCart({...a});
        }
      }
  
      const totalCount =  useMemo(function(){
        return (Object.keys(cart).reduce(function(previous,current){
        return previous + cart[current];
      },0))
    },[cart,user])
    console.log(cart);
    console.log(changedCart);
    return (
        <CartContext.Provider value={{addToCart,cart,updateCart,totalCount,changedCart}}>
          {children}
        </CartContext.Provider>
    )
}
export default CartProvider;