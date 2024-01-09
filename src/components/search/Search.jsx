import React, { useState } from 'react'

const Search = () => {
    const [data,setData]=useState(['Rajesh','lokesh','jyothi','mahesh','vamsi','pandu'])
    const [search,setSearch]=useState('')
    const handleChange=(e)=>{
        setSearch(e)
        console.log(e)
    }
  return (
    <div> 
        <input type='text' placeholder='Enter any Name' onChange={(e)=>{handleChange(e.target.value)}}/>
        {data.filter((name)=>name.toLowerCase().includes(search.toLowerCase())).map((item,ind)=><p key={ind}>{item}</p>)}
      
    </div>
  )
}

export default Search
