import React, { useEffect, useState } from "react";
import "./styled/Home.styled.css";
import { NavLink } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "1eDWq9mXF8+uFJRu/jEu6qh3lLJt8+ZE3uwXIM9vpb4=",
    },
  };
  useEffect(() => {
    fetch("https://openapiv1.coinstats.app/coins?limit=100", options)
      .then((response) => response.json())
      .then((data) => setCoins(data.result))
      .catch((err) => console.error(err));
  }, []);
  const handleDetails = (items) => {
  };
  const Loading=()=>{
    return(<div className="loadingDiv" style={{display:"flex",justifyContent: "space-evenly"}}>
        <Skeleton width={250} height={230} style={{margin: " 0px 20px",display: "flex"}} count={5}/>
        <Skeleton width={250} height={230} style={{margin: "0px 20px",display: "flex"}} count={5}/>
        <Skeleton width={250} height={230} style={{margin: "0px 20px",display: "flex"}} count={5}/>
        <Skeleton width={250} height={230} style={{margin: "0px 20px",display: "flex"}} count={5}/>
        <Skeleton width={250} height={230} style={{margin: "0px 20px",display: "flex"}} count={5}/>
       
      </div>
    )
  }





  return (
    <div className="mainDiv">
      <div className="header">
        <h2>Crypto App</h2>
        <input className="searchBar" placeholder="Ex Bitcoin"  type="text" onChange={(e) => {setSearch(e.target.value);console.log(e.target.value)}}/>
        <hr/>
      </div>
      <div className="outerCoinDiv">

        {coins.length>1 ? coins
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((items, ind) => (
            <div className="coinDiv" key={ind}>
              {" "}
              <img src={items.icon}  alt={"cryptoimage"} width={100} />
              <b>{items.name}</b>
              <p>Rank: {items.rank}</p>
              <p>price $:{items.price}</p>
              <NavLink to={`/coins/${items.id}`}>
                <button className="detailsBtn" onClick={() => handleDetails(items)}>Details</button>
              </NavLink>
            </div>
          )):<Loading/>}
      </div>
    </div>
  );
};

export default Home;
