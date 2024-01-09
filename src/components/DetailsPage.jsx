import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./styled/DetailsPage.styled.css";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { BiSolidLeftArrow } from "react-icons/bi";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);
const DetailsPage = ({ items }) => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const [GraphData, setGraphData] = useState([]);
  const [range, setRange] = useState("30");
  console.log('length',coin.length)
  const options1 = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "1eDWq9mXF8+uFJRu/jEu6qh3lLJt8+ZE3uwXIM9vpb4=",
    },
  };
  const getData = () => {
    fetch(`https://openapiv1.coinstats.app/coins/${id}`, options1)
      .then((response) => response.json())
      .then((data) => setCoin(data));
  };

  const graphData = () => {
    getData();
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${range}&${
        range === 1 ? `interval=hourly` : `interval=daily`
      }`
    )
      .then((res) => res.json())
      .then((data) => setGraphData(data.prices));
  };
  useEffect(() => {
    if (!range) return;
    graphData();
  }, [id, range]);
  console.log(coin);
  console.log(GraphData);

  const options = {
    pulgins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "MarketCap",
      },
    },
    scales: {
      y: {
        ticks: {
          color: "green",
        },
      },
      x: {
        ticks: {
          color: "blue",
        },
      },
    },
  };

  const labels = GraphData.map((price) => {
    return moment.unix(price[0] / 1000).format("DD-MM-YYYY");
  });
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: GraphData.map((price) => {
          return price[1];
        }),
        backgroundColor: "black",
        borderColor: "green",
      },
    ],
  };
  return (
    <div className="totalDiv">
      <NavLink className="NavLink" to={"/"}>
        <BiSolidLeftArrow className="BiSolidLeftArrow" size={25} />
      </NavLink>
      {coin ? (
        <div className="cryptoBox">
          <img src={coin.icon} width={100} />
          <br />
          <b>{coin.name}</b>
          <p>Rank :{coin.rank}</p>
          <p>Price $:{coin.price}</p>
          <p>MarketCap : {coin.marketCap}</p>
          <p>Select </p>{" "}
          <select
            onChange={(e) => {
              console.log(e.target.value);
              setRange(e.target.value);
            }}>
            <option value={30}>30 Days</option>
            <option value={7}>7 Days</option>
            <option value={1}>1 Day</option>
          </select>
        </div>
      ) : (
        "Loading..."
      )}
      <div className="outerLineDiv">
        <div className="linediv">
          <Line className="line" data={data} options={options} />
        </div>
      </div>
      <p className="discription">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quis quam
        deleniti. Error laborum, obcaecati, officiis architecto natus quaerat
        perferendis consectetur hic aperiam aut dolore praesentium ratione!
        Nobis, ab iure.
      </p>
    </div>
  );
};

export default DetailsPage;
