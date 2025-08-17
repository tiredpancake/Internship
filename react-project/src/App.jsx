import React from 'react'
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
}from 'react-router-dom'

import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage ,{jobLoader} from './pages/JobPage'
const router=createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path='/jobs' element={<JobsPage/>} loader={jobLoader}/>
    <Route path='*' element={<NotFoundPage/>}/>
    <Route path='/jobs/:id' element={<JobPage/>}/>

  </Route>
  )
)

const App = () => {
  return  <RouterProvider router={router}/>;
}

export default App
