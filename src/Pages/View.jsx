


import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { FaBook } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";   
import './view.css';

const View = () => {
    const [mdelete, setMdelete] = useState([]);
    const [record, setRecord] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('course')) || [];
        setRecord(data);
    }, []);

    const multipleDelete = (id, checked) => {
        let all = [...mdelete];
        if (checked) {
            all.push(id);
        } else {
            all = all.filter((val) => val !== id);
        }
        setMdelete(all);
    };

    const deleteCourse = (id) => {
        const d = record.filter((val) => val.id !== id);
        localStorage.setItem('course', JSON.stringify(d));
        setRecord(d);
        toast.error("Deleted successfully.");
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setTitle(item.title);
        setDescription(item.dep); 
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!title || !description) {
            toast.error('Both fields are required!');
            return;
        }

        const updatedItems = record.map(item => 
            item.id === editItem.id ? { ...item, title, dep: description } : item
        );

        localStorage.setItem('course', JSON.stringify(updatedItems));
        setRecord(updatedItems);
        setEditItem(null);
        setTitle('');
        setDescription('');
        toast.success('Item updated successfully!');
    };

    const allDelete = () => {
        if (mdelete.length === 0) {
            toast("At least 1 row must be selected.");
            return false;   
        }

        const all = record.filter((val) => !mdelete.includes(val.id));
        localStorage.setItem('course', JSON.stringify(all));
        setRecord(all);
        setMdelete([]);
    };

    return (
        <div>
            <Header />
            <div className="container mt-5 ">
                {editItem && (
                    <form onSubmit={handleUpdate} style={{margin:""}}>
                        <h3 style={{fontWeight:"bold", color:"black", textDecoration:"underline",marginBottom:"20px"}}>EDIT ITEM</h3>
                        <div className='py-2'>
                            <input className='py-2 rounded'
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                placeholder="Title" 
                            />
                            <input className='py-2 rounded'
                                
                                type="text" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                placeholder="Description" 
                            />
                            <button className='py-2 rounded bg-success text-white' type="submit">Update</button>
                            <button className='py-2 rounded bg-danger text-white'onClick={() => setEditItem(null)}>Cancel</button>
                        </div>
                    </form>
                )}
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <h2 style={{fontWeight:"bold", color:"black",marginLeft:"3px",marginBottom:"30px", textDecoration:"underline"}}>VIEW ITEMS</h2>
                        <table className="table">
                            
                            <thead>
                                <tr align="center" style={{ fontSize: "19px" }}>
                                    <th style={{ fontSize: "22px", width: "16.66%" }} scope="col"><FaBook /></th>
                                    <th style={{ width: "16.66%" }} scope="col">Title</th>
                                    <th style={{ width: "16.66%" }} scope="col">Description</th>
                                    <th style={{ width: "16.66%" }} scope="col">Action</th>
                                    <th style={{ fontSize: "30px", width: "16.66%", cursor: "pointer", color: "red" }} scope="col" onClick={() => allDelete()}>
                                        <MdDelete />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    record.map((val) => (
                                        <tr key={val.id} align="center" className='align-items-center'>
                                            <td className='pt-4'><FaBook /></td>
                                            <td className='pt-4'>{val.title}</td>
                                            <td className='pt-4'>{val.dep}</td>
                                            <td>
                                                <button className='btn mb-2' onClick={() => handleEdit(val)} style={{ fontSize: "25px", color: "green", display: "inline-block" }}>
                                                    <FaEdit />
                                                </button>
                                                <button className='btn mb-2' onClick={() => deleteCourse(val.id)} style={{ fontSize: "25px", color: "red", display: "inline-block" }}>
                                                    <MdDelete />
                                                </button>
                                            </td>
                                            <td>
                                                <input className='mt-4' type="checkbox" onChange={(e) => multipleDelete(val.id, e.target.checked)} />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default View;
