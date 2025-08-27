import { Component } from "react";
import CellCards from "../Components/CellCards";

export default{
    title:"Cell",
    component:CellCards
}

export const temp = () => (
  <div style={{ backgroundColor: 'lightgreen' }}>
    <CellCards label="some data" heightClass="h-40" bgClass="bg-green-700" content="some data" hover="hover:bg-blue-100" />
  </div>
);