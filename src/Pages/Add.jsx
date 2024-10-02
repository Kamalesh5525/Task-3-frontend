import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header'

function Add() {

    const [title,setTitle]=useState("")
    const [dep,setDep]=useState("")
    const [record,setRecord]=useState([])

    useEffect(()=>{
        let data=JSON.parse(localStorage.getItem('course')) || [];
        setRecord(data);
    },[])

    const hanlde = (e) =>{
        e.preventDefault()

        if(!title || !dep){
            toast.error("all fields required")
            return false;
        }

        let obj={
            id:Math.floor(Math.random()*10000),
            title,
            dep
        }

        let newrecord=[...record,obj];
        localStorage.setItem('course',JSON.stringify(newrecord));
        setRecord(newrecord);
        toast.success("successfully add...");
        setTitle("");
        setDep("");
    }
    return (
        <div>
            <Header />

            <div className="container" style={{margin:"80px 55px",color:"white"}}>
                <div className="row">
                    <div className="col-lg-6 mx-auto">

                        <form onSubmit={hanlde} className=' p-3 shadow' style={{border:"2px dashed black",borderRadius:"15px"}}>
                            <div className="mb-3">
                                <label  className="form-label" style={{fontSize:"20px",color:"black",fontWeight:700}}>Title</label>
                                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title}  />
                              
                            </div>
                            <div className="mb-3 mt-5">
                                <label  className="form-label" style={{fontSize:"20px",color:"black",fontWeight:700}}>Description</label>
                                <input type="text" className="form-control" onChange={(e) => setDep(e.target.value)} value={dep}  />
                            </div>
                        
                            <button type="submit" className="btn mx-auto d-block btn-primary mt-5">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
        </div>
    )
}

export default Add
