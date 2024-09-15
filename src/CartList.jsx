import React from 'react';
import CartRow from './CartRow';

function CartList({ quantityMap,cart,remove,change,update}){

  return(
    <>
        {cart.map(function (item){
          return (
            <CartRow 
              key={item.product.id}
              product={item.product} quantity={quantityMap[item.product.id]} remove={remove} change={change} update={update} />
          );
        })
        }
    </>
    
  );

}

export default CartList;