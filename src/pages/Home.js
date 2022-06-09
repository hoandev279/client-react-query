import React, { useState, useMemo } from "react";
import { getProducts } from "../api/productAPI";

import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
// import useCustomRouter from '../hooks/useCustomRouter';
// import useQuery from '../hooks/useQuery';
import { useQuery } from "react-query";
const Home = () => {
  const { refresh, page, limit, sort } = useMyContext();


  // const { pushQuery } = useCustomRouter()

  // const url = getProducts(limit, page, sort)
  // const { data, loading, error } = useQuery(url, [refresh], {
  //   saveCache: true
  // })
  const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;
  const { data, isFetching, error, isPreviousData } = useQuery({
    queryKey: key,
    queryFn: getProducts,
    // tu dong chay lai khi bi loi request 3 lan, truyen false neu khong muon retry khi loi
    keepPreviousData: true,
  });
  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.count / limit);
  }, [data?.count, limit]);
  return (
    <main>
      {/* <Sorting sort={sort}
    calback={(sort) => pushQuery({page, sort})} */}
      {/* /> */}
      {data && data.products && (
        <Products data={data.products} />
      )}
      {(isFetching && isPreviousData) && <h2 style={{ textAlign: "center" }}>Loading...</h2>}
      {error && <h2 style={{ textAlign: "center" }}>{error.message}</h2>}

      <Pagination totalPages={totalPages}/>
    </main>
  );
};

export default Home;
