import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { patchData } from "../utils/fetchData";
import { ImageUpload } from "../utils/imageUpload";
import valid from '../utils/valid'
import Link from 'next/link'

const Profile = () =>{

    const initialState = {
        avatar: '',
        name: '',
        password: '',
        cf_password: ''
    }

    const [data, setData] =useState(initialState)
    const {avatar, name, password, cf_password} = data

    const {state, dispatch} = useContext(DataContext)
    const { auth, notify, orders } = state


    useEffect(()=>{
        if(auth.user) setData({...data, name: auth.user.name})
    }, [auth.user])


    const handleChange = (e) =>{
        const {name, value} = e.target
        setData({ ...data, [name]:value })
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const hadleUpdateProfile = e =>{
        e.preventDefault()
        if(password){
            const errMsg = valid(name, auth.user.email, password, cf_password)
            if(errMsg) return dispatch({type: "NOTIFY", payload: {error: errMsg}})
            updatePassword()
        }

        if(name !== auth.user.name || avatar) updateInfo()

    }

    const updatePassword = () =>{
        dispatch({type:"NOTIFY", payload: {loading:true}})
        patchData('user/resetPassword', {password}, auth.token)
        .then(res=> {
            if(res.err) return dispatch({type:"NOTIFY", payload: {error:res.err}})
            return dispatch({type:"NOTIFY", payload: {success:res.msg}})
        })
    }

    const changeAvatar =(e) =>{
        const file = e.target.files[0]
        if(!file) return dispatch({type: 'NOTIFY', payload:{error: "No file found!"}})

        if(file>1024*1024*5) return dispatch({type: 'NOTIFY', payload:{error: "File to big!!!"}})

        if(file.type !== 'image/jpeg' && file.type !== 'image/png') return dispatch({type: 'NOTIFY', payload:{error: "Incorrect image format!"}})

        setData({...data, avatar:file})
    }

    const  updateInfo = async () =>{
        let media;
        dispatch({type: 'NOTIFY', payload: {loading:true}})

        if(avatar) media = await ImageUpload([avatar])
        console.log(media)
        patchData('user',{
            name, avatar: avatar? media[0].url : auth.user.avatar
        }, auth.token).then(res=>{
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error:res.err}})

            dispatch({type: 'AUTH', payload:{
                token: auth.token,
                user:res.user
            }})
            return dispatch({type: 'NOTIFY', payload: {success:res.msg}})
        })

    }

    if(!auth.user) return null;

    return(
        <div className="profile_page">
            <Head>
                <title>Profile</title>
            </Head>
        
            <section className= "row text-secondary my-3">
                <div className="col-md-4">
                    <h4 className="text-center text-uppercase">
                        {auth.user.role === 'user' ? 'User Profile' : 'Admin profile'}
                    </h4>

                    <div className="avatar" >
                        <img src={avatar ? URL.createObjectURL(avatar): auth.user.avatar} alt="User Avatar"></img>
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" accept="image/*"
                            onChange={changeAvatar} />
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" 
                        name="name" 
                        value={name}
                        className="form-control" 
                        placeholder="Your name"
                        onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" 
                            name="email" 
                            defaultValue={auth.user.email}
                            className="form-control"
                            placeholder="Your email"
                            disabled={true}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" 
                        name="password" 
                        value={password}
                        className="form-control" 
                        placeholder="Your Password"
                        onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_password">Confirm New Password</label>
                        <input type="password" 
                        name="cf_password" 
                        value={cf_password}
                        className="form-control" 
                        placeholder="Confirm Password"
                        onChange={handleChange}/>
                    </div>

                    <button className="btn btn-info" disabled={notify.loading} onClick={hadleUpdateProfile} >Update</button>

                </div>
                <div className="col-md-8 ">
                <h4 className="text-uppercase">Orders</h4>
                <div className="my-3 table-responsive">
                    <table className="table-bordered table-hover w-100 text-uppercase"
                    style={{minWidth: '600px', cursor:'pointer'}} >
                        <thead className="bg-light font-weight-bold">
                            <tr>
                                <td className="p-2">id</td>
                                <td className="p-2">date</td>
                                <td className="p-2">total</td>
                                <td className="p-2">delivered</td>
                                <td className="p-2">paid</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                orders.map(order=>(
                                    <tr key={order._id}>
                                        <td className="p-2">
                                        <Link href={`/order/${order._id}`}>
                                                <a>{order._id}</a>
                                            </Link>
                                            </td>
                                        <td className="p-2">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-2">{order.total}</td>
                                        <td className="p-2">
                                            {
                                                order.delivered ?
                                                <i className="fas fa-check text-success"></i> :
                                                <i className="fas fa-times text-danger"></i>
                                            }
                                        </td>
                                        <td className="p-2">
                                        {
                                                order.paid ?
                                                <i className="fas fa-check text-success"></i> :
                                                <i className="fas fa-times text-danger"></i>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>

                </div>
                </div>
            </section>

        </div>
    )
  }
  
  export default Profile;