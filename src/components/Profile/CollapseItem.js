import Image from 'next/image'
import { Button } from '@mantine/core';
const CollapseItem = ({ data, total }) => {
    console.log(data, "data")
    return (
        <div className='divide-b-4 divide-slate-700 w-full' style={{ borderBottom: "2px solid #DADEDE" }}>
            <div className='flex flex-row p-4'>
                <Image src={"/bundle-1.svg"} width={90} height={90} />
                <div className='flex flex-col  ml-3 justify-between'>
                    <p className="text-sm mt-1">{data?.name}</p>
                    <div className='flex flex-row'>
                        <p className='text-grey text-xs'>Нийт : </p>
                        <p className='text-xs font-bold'>{total !== undefined && total}₮</p>
                        <p className='text-grey text-xs ml-4'>Ширхэг:</p>
                        <p className='text-xs'>{data?.instock}</p>
                        <p className='text-grey text-xs ml-4'>Нэгж үнэ:</p>
                        <p className='text-xs'>{data?.price}₮</p>
                    </div>
                    <div className='flex flex-row'>
                        <Button variant={"filled"} className="mr-4" style={{ backgroundColor: "#F9BC60", fontWeight: "normal", padding: "6px" }}>
                            Захиалга хянах
                        </Button>
                        {/* <Button variant={"outline"} color={"red"} style={{ fontWeight: "normal", padding: "6px" }}>
                            Арилгах
                        </Button> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollapseItem