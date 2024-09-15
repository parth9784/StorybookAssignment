import React,{ useState} from 'react';
import Product from './Product';

function ProductList({products}) {
   return(
     <div className="grid md:grid-cols-3 gap-2 md:gap-4 md:mx-32 my-14 bg-white px-10 py-20 grid-cols-2 md:max-w-4.5xl min-w-sm mx-16">
      {products.map(function (item){
      return(
        <Product 
          key = {item.id}
          {...item}
          />
      );
      })}
      </div>
   );
}
export default ProductList;