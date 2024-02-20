import { Link } from "react-router-dom";

export default function Navbar() {
return(

       <>

         <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
       <div className="navbar-brand">
      <h5>ContactMangement</h5>
       </div>
       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navclick">
      <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navclick">
       <ul className="navbar-nav ms-auto">
       <li className="nav-item">
       <Link className="nav-link text-light" to="/">
        Home
       </Link>
       </li>
       </ul>
       </div>
        </div>
         </nav>
       
       
       </>
)
     
}