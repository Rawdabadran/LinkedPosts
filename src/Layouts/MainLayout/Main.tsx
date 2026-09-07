import { Outlet } from "react-router-dom"
import Nav from "../../Components/layout/Navbar/Nav"

export default function Main() {
  return (
    <div>
        <Nav/>
      <Outlet/>
   
    </div>
  )
}
