import React from 'react'

export default function page({params}:{
    params:{postid:String}
}) {
  return (
    <div>
      <h1> Details page{params.postid}</h1>
    </div>
  )
}
