import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Components/home/Home.jsx'
import Registration from './Components/Registration/Registration.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children: [
      {path: '/', element:<Home/>},
      {path: '/account-activation-form', element:<Registration/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
