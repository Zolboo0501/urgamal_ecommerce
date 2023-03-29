import Image from 'next/image'
import GlobalLayout from '../../components/GlobalLayout/GlobalLayout';
import { Button, TextInput } from '@mantine/core';
import ProfileTabs from '../../components/ProfileTab';
import { useEffect, useState } from 'react';
import $ from "jquery";
import ProfileInfo from './tabs/ProfileInfo';
import EmailPhone from './tabs/EmailPhone';
import UserLocation from './tabs/UserLocation'
import SavedOrder from './tabs/SavedOrder';
import MyOrder from './tabs/MyOrder';
import PurchaseHistory from './tabs/PurchaseHistory';
import BottomFooter from '../../components/Footer';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
const Profile = () => {
    const router = useRouter()
    const [tabs, setTabs] = useState(1)
    const onClickTabs = (e) => {
        setTabs(e)
    }

    useEffect(() => {
        window.dispatchEvent(new Event('storage'))
    }, [])

    return (
        <div>
            <GlobalLayout />
            <div className='bg-grey-back w-full px-32 py-8'>
                <div className='w-full h-56 bg-white rounded-md relative'>
                    <div className='absolute left-14 w-36 h-36 top-12'>
                        <Image src={"/profile.jpg"} width={150} height={150} style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "100%", border: "3px solid #EBEFEE" }} />
                        <div className='absolute bottom-0 left-28 w-8 h-8 flex justify-center items-center bg-grey-back rounded-full' style={{ border: "3px solid white" }}  >
                            <Image width={20} height={20} src={"/icons/change-pic.svg"} />
                        </div>
                    </div>
                    <div className='w-full' style={{ height: "50%" }}>
                        <Image src={"/profile-back.jpg"} height={1000} width={100} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className='w-full bg-white pl-56 pt-0 flex flex-row justify-between items-center -mt-2' style={{ height: "50%", }}>
                        <div className='flex flex-col'>
                            <p className='text-2xl'>Г.Цэцгээ</p>
                            <p className='text-base'>Цэцэгчин</p>
                        </div>
                        <Button leftIcon={<Image src={"/icons/logout-icon.svg"} width={20} height={20} />} variant="outline" color="red" className='mr-16' onClick={() => { setCookie("token", ""), setCookie("number", ""), router.push("/home") }}>
                            Системээс гарах
                        </Button>
                    </div>
                </div>
                <div className=' mt-6 flex flex-row'>
                    <div className='bg-white rounded-md w-3/12 py-6 h-fit'>
                        {tabs === 1 ? <ProfileTabs image={"/icons/profile-tab-icon.svg"} text={"Хувийн мэдээлэл"} onClickTabs={() => onClickTabs(1)} id={1} first={true} /> : <ProfileTabs image={"/icons/profile-tab-icon.svg"} text={"Хувийн мэдээлэл"} onClickTabs={() => onClickTabs(1)} id={1} />}
                        {tabs === 2 ? <ProfileTabs image={"/icons/profile-tab2-icon.svg"} text={"Хувийн тохиргоо"} onClickTabs={() => onClickTabs(2)} id={2} first={true} /> : <ProfileTabs image={"/icons/profile-tab2-icon.svg"} text={"Хувийн тохиргоо"} onClickTabs={() => onClickTabs(2)} id={2} />}
                        {tabs === 3 ? <ProfileTabs image={"/icons/hearth.svg"} text={"Хаяг"} onClickTabs={() => onClickTabs(3)} id={3} first={true} /> : <ProfileTabs image={"/icons/hearth.svg"} text={"Хаяг"} onClickTabs={() => onClickTabs(3)} id={3} />}
                        {tabs === 4 ? <ProfileTabs image={"/icons/profile-tab4-icon.svg"} text={"Хадгалсан"} onClickTabs={() => onClickTabs(4)} id={4} first={true} /> : <ProfileTabs image={"/icons/profile-tab4-icon.svg"} text={"Хадгалсан"} onClickTabs={() => onClickTabs(4)} id={4} />}
                        {tabs === 5 ? <ProfileTabs image={"/icons/profile-tab5-icon.svg"} text={"Захиалга"} onClickTabs={() => onClickTabs(5)} id={5} first={true} /> : <ProfileTabs image={"/icons/profile-tab5-icon.svg"} text={"Захиалга"} onClickTabs={() => onClickTabs(5)} id={5} />}
                        {tabs === 6 ? <ProfileTabs image={"/icons/profile-tab3-icon.svg"} text={"Худалдан авсан түүх"} onClickTabs={() => onClickTabs(6)} id={6} first={true} /> : <ProfileTabs image={"/icons/profile-tab3-icon.svg"} text={"Худалдан авсан түүх"} onClickTabs={() => onClickTabs(6)} id={6} />}
                    </div>
                    {tabs === 1 && <ProfileInfo />}
                    {tabs === 2 && <EmailPhone />}
                    {tabs === 3 && <UserLocation />}
                    {tabs === 4 && <SavedOrder />}
                    {tabs === 5 && <MyOrder />}
                    {tabs === 6 && <PurchaseHistory />}
                </div>
            </div>

            <BottomFooter />
        </div >
    )
}

export default Profile;