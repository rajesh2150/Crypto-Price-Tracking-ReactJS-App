import { createContext, useContext, useReducer } from "react";
import "./App.css";
import UseCallback from "./Hooks/UseCallback/UseCallback";
import UseContext from "./Hooks/UseContext/UseContext";
import UseHistory from "./Hooks/UseHistory/UseHistory";
import UseMemo from "./Hooks/UseMemo/UseMemo";
import UseReducerHook from "./Hooks/UseReducerHook/UseReducerHook";
import UseReducer_Example2 from "./Hooks/UseReducerHook/UseReducer_Example2";
import CartList from "./addToCart/CartPage/CartList";
import CartPage from "./addToCart/CartPage/CartPage";
import DetailsPage from "./components/DetailsPage";
import Home from "./components/Home";
import Search from "./components/search/Search";
import { BrowserRouter, Routes, Route, Switch, Link, NavLink } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Products from "./addToCart/AppCartContext/Products";
import CartApp from "./addToCart/AppCartContext/CartApp";
import UseTransition from "./Hooks/UseTransition/UseTransition";
import AboutUs from "./Hooks/UseTransition/AboutUs";
import ContactUs from "./Hooks/UseTransition/ContactUs";
export const MyCartContext = createContext();
function App() {
  const initialState = [];
  function reducer(state, action) {
    switch (action.type) {
      case "ADD":
        const ispresent=state.find(item=>item.name === action.payload.name)
        if(ispresent){
          alert('already in cart')
          return state
        }
        else
         return [...state, { id: state.length, name: action.payload.name,price:action.payload.price }];
      case "REMOVE":
        return state.filter(p => p.name !== action.payload);
      case 'PRICE':
        let total=0;
       let amount= state.forEach((item)=>item.price+total)
       console.log(amount)
        return amount
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const data={state,dispatch,name:'Rajesh'}
 
  return (
    <div className="App">
      {/* <Search/>  */}
      <BrowserRouter>
       
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/coins/:id' element={<DetailsPage/>} />
        </Routes>
      </BrowserRouter>
      {/* <UseReducerHook/> */}
      {/* <UseReducer_Example2/> */}
      {/* <UseContext/> */}
      {/* <MyCartContext.Provider value={data}>
    
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<CartApp />} />
          </Routes>
        </BrowserRouter>
      </MyCartContext.Provider>
      <input onChange={(e)=>console.log(e.target.value)} type="range" min={10}  max={10000}/> */}

      {/* <UseMemo/> */}
      {/* <UseCallback/> */}
      {/* <UseHistory/> */}
     {/* <UseTransition/> */}
    </div>
  );
}

export default App;

{
  /* <FBContext.Posts />
<IGContext.Posts/>

<FBContext.Reels/> */
}
