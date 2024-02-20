import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function Home() {
  var url = "https://main--courageous-conkies-0aba18.netlify.app/";

  function submitform(event) {
    event.preventDefault();
    var data = new FormData(event.currentTarget);
    var nameInput = data.get("nameInput");
    var contactInput = data.get("contactInput");
    var emailInput = data.get("emailInput");
    axios
      .post(url + "datainsert", {
        Name: nameInput,
        Contact: Number(contactInput),
        Email: emailInput,
      })
      .then((data_Insert) => {
          fetchformdata()
        alert("Added Successfully");
        event.target.reset();
        event.target.nameInput.focus();
      });
  }

  const [listData, setlistData] = useState([]);
  const [search, setsearch] = useState('')

  function fetchformdata() {
    axios.post(url + "finddata", {
    Searchs : search
    }).then((fetch_Data) => {
      setlistData(fetch_Data.data);
    });
  }

  useEffect(() => {
    fetchformdata();
  });

  function deleteuser(x) {
    axios
      .post(url + "deletedata", {
        id: x,
      })
      .then((delete_User) => {
        fetchformdata();
        alert("Deleted Successfully");
      });
  }

   function submitmodaldata(event) {
   event.preventDefault();
   var data = new FormData(event.currentTarget);
   var idinput = data.get("idInput");
   var nameInput = data.get("nameInput");
   var contactInput = data.get("contactInput");
   var emailInput = data.get("emailInput");
   axios.post(url + "editdata", {
    id : idinput,
    Name : nameInput,
    Contact : contactInput,
    Email : emailInput
   }).then((edit_Data) => {
     fetchformdata();
   alert("Edit Successfully");
   event.target.reset();
   event.target.nameInput.focus();
   })
   }

   


  
  return (
    <>
      <Navbar />

      <div className="row m-0 justify-content-center mt-5">
      <div className="col-lg-6 offset-lg-1">
          <div className="input-group">
          <input onKeyUp={(event) => setsearch(event.target.value)} type="search" className="form-control" ></input>
         <button type="submit" className="btn btn-primary">Search</button>
          
     
          </div>
   
      </div>
      </div>
    
      <div className="row m-0 p-0">
        <div className="col-lg-4 mt-5 ">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Contact Mangement System</h4>
            </div>
            <div className="card-body">
              <form onSubmit={submitform}>
                <input
                  type="text"
                  className="form-control my-2"
                  name="nameInput"
                  placeholder="Fill Your Name"
                  title="Fill Name"
                  required
                ></input>
                <input
                  type="number"
                  className="form-control my-2"
                  name="contactInput"
                  placeholder="Fill Your Contact"
                  title="Fill Contact"
                  required
                ></input>
                <input
                  type="email"
                  className="form-control my-2"
                  name="emailInput"
                  placeholder="Fill Your Email"
                  title="Fill Email"
                  required
                ></input>

                <button type="submit" className="btn btn-danger my-2">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8 mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((list_users) => (
                <tr>
                  <td>{list_users.Name}</td>
                  <td>{list_users.Email}</td>
                  <td>{list_users.Contact}</td>
                  <td>
                    <button
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target={"#mymod" + list_users._id}
                      type="button"
                    >
                      <FaEdit className="text-primary" />
                    </button>
                    <div
                      className="modal modal-fade"
                      id={"mymod" + list_users._id}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="text-center">
                              {list_users.Name}
                            </h4>
                          </div>
                          <div className="modal-body">
                            <form  onSubmit={submitmodaldata}>
                              <input name="idInput" type="hidden" className="form-control my-3" placeholder="Fill Id" defaultValue={list_users._id}></input>
                              <input
                                type="text"
                                className="form-control my-2"
                                name="nameInput"
                                defaultValue={list_users.Name}
                                required
                                title="Fill Name"
                              ></input>
                              <input
                                type="number"
                                className="form-control my-2"
                                name="contactInput"
                                defaultValue={list_users.Contact}
                                title="Fill Contact"
                                required
                              ></input>
                              <input
                                type="email"
                                className="form-control my-2"
                                name="emailInput"
                                defaultValue={list_users.Email}
                                title="Fill Email"
                                required
                              ></input>

                              <button
                                type="submit"
                                className="btn btn-danger my-2"
                              >
                                Edit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteuser(list_users._id)}
                      className="btn"
                      type="button"
                    >
                      <FaTrash className="text-danger" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
