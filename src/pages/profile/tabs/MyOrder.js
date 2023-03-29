import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Button, TextInput } from '@mantine/core';
import Order from '../../../components/Profile/Order';
import { getCookie } from 'cookies-next';
const MyOrder = () => {

    const [tabs, setTabs] = useState(1)
    const [order, setOrder] = useState()

    useEffect(() => {
        getUserOrder()
    }, [])

    const getUserOrder = async () => {
        const token = getCookie("token")
        console.log(token, "token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append('Content-Type', 'application/json',);
        const requestOption = {
            method: 'GET',
            headers: myHeaders,
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/order`, requestOption)
        if (res.status === 200) {
            const data = await res.json()
            if (data.success === true) {
                setOrder(data.data)
            }
        }

    }
    const clickTabs = (id) => {
        setTabs(id)
    }

    return (
        <div style={{ width: "72.5%" }} className="flex flex-col">
            <div className='bg-white ml-8 w-full rounded-md py-4 px-6'>
                <p className='text-lg'>Хувийн мэдээлэл</p>
            </div>
            <div className='bg-white ml-8 w-full rounded-md px-6 mt-4 py-2'>
                <div className='flex flex-row justify-around items-center '>
                    {tabs === 1 ? <p className='text-base py-2 w-full text-center border-b-2 border-background-sort' id={1} onClick={() => clickTabs(1)}>Баталгаажсан</p> : <p className='text-base text-grey hover:bg-button-yellow hover:text-black w-full py-2 text-center' id={1} onClick={() => clickTabs(1)}>Баталгаажсан</p>}
                    {tabs === 2 ? <p className='text-base w-full py-2 text-center border-b-2 border-background-sort' id={2} onClick={() => clickTabs(2)}>Цуцлагдсан</p> : <p className='text-base text-grey hover:bg-button-yellow w-full py-2 text-center  hover:text-black' id={2} onClick={() => clickTabs(2)}>Цуцлагдсан</p>}
                    {tabs === 3 ? <p className='text-base  w-full py-2 text-center border-b-2 border-background-sort' id={3} onClick={() => clickTabs(3)} >Хүргэгдсэн</p> : <p className='text-base text-grey hover:bg-button-yellow w-full py-2 text-center  hover:text-black' id={3} onClick={() => clickTabs(3)}>Хүргэгдсэн</p>}
                    {tabs === 4 ? <p className='text-base w-full py-2 text-center border-b-2 border-background-sort' id={4} onClick={() => clickTabs(4)}>Баталгаажаагүй</p> : <p className='text-base text-grey hover:bg-button-yellow w-full py-2 text-center  hover:text-black' id={4} onClick={() => clickTabs(4)}>Баталгаажаагүй</p>}
                </div>
                {tabs === 1 && <div className='max-h-80 overflow-auto'>
                    {order !== undefined && order.map((e) => {
                        return (
                            <Order data={e} />
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}

export default MyOrder