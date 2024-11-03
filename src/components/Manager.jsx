import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwordArray;
        let passwords = localStorage.getItem('password')
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const ref = useRef()
    const showPassword = () => {
        if (ref.current.src.includes('icons/eyecross.png')) {
            ref.current.src = "icons/eye.png"
        } else {
            ref.current.src = "icons/eyecross.png"
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length >3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('Saved', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, draggable: true, pauseOnHover: true, theme: "dark", progress: undefined })
        }
        toast("Can't save empty", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, draggable: true, pauseOnHover: true, theme: "dark", progress: undefined })

    }
    const editPassword = (id) => {
        console.log(`edit pass ${id}`);
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePassword = (id) => {
        console.log(`deleting pass ${id}`);
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }

    const copyText = (text) => {
        toast('Copied', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, draggable: true, pauseOnHover: true, theme: "dark", progress: undefined })
        navigator.clipboard.writeText(text)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" >
            </ToastContainer>
            <div className="container mx-auto bg-blue-200 p-4 mt-2">
                <div className='p-4'>
                    <h1 className='text-xl '>Password Manager</h1>
                    <p className='text-xs'>Managing password easy</p>
                </div>
                <div className='flex flex-col p-4'>
                    <input type="text" name="site" onChange={handleChange} value={form.site} className='rounded-sm input-style p-2 w-sm' placeholder='Enter sitename or url' />
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <input type="text" name="username" onChange={handleChange} value={form.username} className='rounded-sm input-style p-2 ' placeholder='username' />
                        <input type="password" name="password" onChange={handleChange} value={form.password} className='rounded-sm input-style p-2' placeholder='password' />
                    </div>
                </div>
                <button className='buttons w-fit' onClick={savePassword}>Save</button>
            </div>

            <div className="passwords container mx-auto mt-5 p-4 bg-green-200">
                <h2 className="text-xl mb-2">Your Passwords</h2>

                {passwordArray.length === 0 && <div className="text-xl text-center p-4">No Passwords Saved</div>}

                <table className="table-auto w-full">
                    <thead className="bg-green-500">
                        <tr>
                            <th className='py-2'>Sitename</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className='py-2'><a href={item.site} target="_blank">{item.site} <span onClick={() => copyText(item.site)} className='cursor-pointer text-white text-xs p-2 rounded-md bg-green-800'>copy</span></a></td>

                                <td>{item.username} <span onClick={() => copyText(item.username)} className='cursor-pointer text-white text-xs p-2 rounded-md bg-green-800'>copy</span></td>
                                <td>{item.password} <span onClick={() => copyText(item.password)} className='cursor-pointer text-white text-xs p-2 rounded-md bg-green-800'>copy</span></td>
                                <td onClick={() => editPassword(item.id)} className='cursor-pointer'>Edit</td>
                                <td onClick={() => deletePassword(item.id)} className='cursor-pointer'>Delete</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Manager
