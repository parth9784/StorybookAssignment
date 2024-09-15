import React,{ useState,useEffect, useCallback,useMemo }from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import {getProductList} from './api';
import NoProductPage from './NoProductPage';
import Loading from './Loading';
import { range } from 'lodash';
import { Link,useSearchParams } from 'react-router-dom';

function ProductListPage() {

  const [productData,setProductData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [query,setQuery] = useState('');
  const [sort,setSort] = useState('default');

  let [ searchParams ] = useSearchParams();
  let page = +searchParams.get("page") || 1;
  console.log("page ",page);
  
  useEffect(function(){

    let sortBy;
    let sortType;

    if(sort == "title"){
      sortBy = "title";
    }else if(sort == "priceLtoH"){
      sortBy = "price";
      sortType="asc";
    }else if(sort == "priceHtoL"){
      sortBy = "price";
      sortType = "desc";
    }
    getProductList(sortBy,query,page,sortType).then(function(response){
      setProductData(response);
      setLoading(false);
    })
  },[sort,query,page]);

  const handleChange = useCallback(function (event){
    setQuery(event.target.value);
  })

  const handleSort = useCallback(function (event){
    setSort(event.target.value);
  })

  if(loading){
    return(<Loading />);
  }
 
  return (
    <div>
      <div className="flex gap-1 flex-wrap p-4 justify-end max-w-6xl mx-auto">
        <input
          value = {query}
          className="border border-gray-400 rounded-md px-4 py-2 w-40"
          placeholder="Search"
          onChange = {handleChange} />
        <select className="border border-gray-400 rounded-md px-4 py-2 w-40" value={sort} onChange={handleSort}> 
            <option value="default">Default</option>
            <option value="priceHtoL">Sort by Price(high to low)</option>
            <option value="priceLtoH">Sort by Price(low to high)</option>
            <option value="title">Sort by Name</option>
        </ select>
      </div>


      {productData.data.length > 0 && <ProductList products={productData.data} />} 
      {productData.data.length == 0 && <NoProductPage>No Results!!! Search for different words.</NoProductPage>}
      {range(1,productData.meta.last_page+1).map((pageNo) => (
        <Link 
          key={pageNo}
          to={"?page="+pageNo}
          className={"p-1 px-2 rounded-md mx-1 " + (pageNo === page ? "bg-primary-dark" : "bg-primary-lightest" )}
          >{pageNo}
        </Link>
      ))}
    </div>
  );
}
export default ProductListPage;