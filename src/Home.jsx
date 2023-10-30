import BlogList from "./BlogList";
import Filter from "./Filter";
import { useEffect } from "react";




const Home = ({  handleNewInfo,handleFiltered, data, isLoading, error,filterNames }) => {
  

  



  return (
    <>
      {filterNames &&<Filter filterNames={filterNames} handleFiltered={handleFiltered}  />}
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && <BlogList blogs={data} title="Blogs" />}
      
    </>
  );
};

export default Home;
