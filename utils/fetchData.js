const baseUrl = process.env.BASE_URL
const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://feja-shop.vercel.app/';


export const getData = async (url, token) =>{
    const res =  await fetch(`${server}/api/${url}`, {
        method: 'GET',
        headers:{
            'Authorization':token
        }
    })
    const data = await res.json()
    return data
}

export const postData = async (url, post,  token) =>{
    const res =  await fetch(`${server}/api/${url}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify(post)
    })
    const data = await res.json()
    return data
}

export const putData = async (url, post,  token) =>{
    const res =  await fetch(`${server}/api/${url}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify(post)
    })
    const data = await res.json()
    return data
}

export const patchData = async (url, post,  token) =>{
    const res =  await fetch(`${server}/api/${url}`, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const deleteData = async (url, token) =>{
    const res =  await fetch(`${server}/api/${url}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':token
        },
    })
    const data = await res.json()
    return data
}