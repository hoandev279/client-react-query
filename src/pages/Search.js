import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchProducts } from "../api/productAPI";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
// import useInfinityQuery from '../hooks/useInfinityQuery';
import { useInfiniteQuery } from "react-query";
import useInView from "../hooks/useInView";

const Search = () => {
  const limit = 2;
  const { value } = useParams();
  const { sort } = useMyContext();

  // const [products, setProducts] = useState([])
  // const [stop, setStop] = useState(false)

  // const { pushQuery } = useCustomRouter()

  // const url = searchProducts(value, sort)
  // const {
  //   btnRender, data, loading, error
  // } = useInfinityQuery(url, [value, sort], {
  //   limit: limit,
  //   stop: stop
  // })
  const { ref, inView } = useInView()
  const key = `/products?search=${value}&sort=${sort}&limit=${limit}`;
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(key, searchProducts, {
    getNextPageParam: (lastPage, pages) => {
      const { products} = lastPage;
      if(products.length >= limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  // useEffect(() => {
  //   if(!data) return;
  //   setProducts(prev => [...prev, ...data.products])

  //   if(data.products.length < limit)
  //     return setStop(true)
  // },[data, limit])

  // useEffect(() => {
  //   setProducts([])
  //   setStop(false)
  // }, [value, sort])
  useEffect(() => {
    // console.log(inView, isFetchingNextPage)
    setTimeout(() => {
      if(inView && !isFetchingNextPage) {
        fetchNextPage() 
      }
    },1000)
  }, [inView])
  return (
    <div>
      {/* <Sorting sort={sort} /> */}
      <div>
        {data?.pages?.map((page, i) => (
          <Products key={i} data={page.products} />
        ))}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        ref={ref}
      >
        Load more
      </button>
      {/* { btnRender() } */}
    </div>
  );
};

export default Search;
