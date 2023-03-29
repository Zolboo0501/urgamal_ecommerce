import Image from 'next/image'
import GlobalLayout from '../../components/GlobalLayout/GlobalLayout'
import Category from '@/components/category'
import ProductCard from '../../components/product-card'
import { Footer } from '@mantine/core'
import BottomFooter from '../../components/Footer'
import ProductCardExample from '../../components/ProductCardExample'
import { useEffect, useState } from 'react'

const CategoryPage = () => {

    const [main, setMain] = useState()
    const [parent, setParent] = useState()
    const [child, setChild] = useState()
    useEffect(() => {
        window.dispatchEvent(new Event('storage'))
        getLocalCat()

    }, [])
    const getLocalCat = () => {
        const data = JSON.parse(localStorage.getItem("main"))
        setMain(data)
        const data2 = JSON.parse(localStorage.getItem("parent"))
        setParent(data2)
        const data3 = JSON.parse(localStorage.getItem("child"))
        setChild(data3)
    }
    return (
        <div>
            <GlobalLayout />
            <div className=' px-32 bg-nav-background h-full flex flex-col'>
                <div className='flex flex-row py-12 w-full  '>
                    <div style={{ width: "28%", height: "80%" }}>
                        <Category parent={parent} main={main} child={child} />
                    </div>
                    <div className='flex flex-col ml-6' style={{ width: "70%" }}>
                        <div className='flex flex-row justify-between w-full'>
                            <div className='flex flex-row items-center'>
                                <p className='text-sm text-grey'>Нүүр</p>
                                <Image width={18} height={18} src={"/icons/arrow-right-outline.svg"} />
                                <p className='text-sm  text-grey'>Бордоо</p>
                                <Image width={18} height={18} src={"/icons/arrow-right-outline.svg"} />
                                <p className='text-sm'>Өсөлт Дэмжигч</p>
                            </div>
                            <div className='flex justify-center items-center bg-white flex-row  px-4 py-2'>
                                <p className='font-semibold text-sm text-[#3E503C]'>Эрэмбэлэх</p>
                                <Image width={13} height={13} src={'/icons/arrow-down-outline.svg'} className="ml-2 mt-1" />
                            </div>
                        </div>
                        <div
                            style={{ width: "100%", gap: "30px", flexWrap: "wrap" }}
                            className="flex flex-row mt-12"
                        >
                            <div style={{ width: "22.3%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.4%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.4%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.4%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.3%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.4%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.4%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.4%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.4%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.3%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.4%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                            <div style={{ width: "22.4%" }}>
                                <ProductCardExample
                                    src={"/bundle-1.svg"}
                                    name={"Энерген Экстра"}
                                    count={"50ш"}
                                    price={"15’000"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomFooter />
        </div>
    )
}

export default CategoryPage