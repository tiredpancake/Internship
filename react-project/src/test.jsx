import React from 'react'

const Test = () => {
  const name ='jafar';
  const x=5;
  const y=50; 
  const names=['Brad', 'MAry','Joe','Sara']
  const loggedIn =true;
  //  if (loggedIn)
  //  {
  //   return "hello user";
  //  }
  const styles={
    color:'red',
    fontSize :'55px'
  }


  return (
    <div className='text-5xl text-red-500'>
     <p style={styles}>Hello {name}</p> 
     <p>The sum of {x} and {y}  is {x+y}</p>
    <ul> 
      {names.map((name,index)=>(
      <li key={index}>{name}</li>
      ))}
      
    </ul>
      {loggedIn ? <h1>Hello member</h1> : <h2>HEllo Guest </h2>}
    </div>
  )
}

export default Test

