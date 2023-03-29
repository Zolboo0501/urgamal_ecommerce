
import { Button, TextInput, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CollapseItem from './CollapseItem';

const Order = ({ data }) => {

    const [opened, { toggle }] = useDisclosure(false);

    return (
        <div>
            <div className='flex flex-row justify-between items-center p-2 hover:bg-grey-back' onClick={toggle} style={{ borderBottom: "1px solid rgba(0, 30, 29, 0.23)" }}>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <p className='text-base text-grey'>Захиалгын дугаар :</p>
                        <p className='text-base ml-1'>{data?.orderid}</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-base text-grey'>Баталгаажсан : </p>
                        <p className='text-base ml-1'>{data?.createdAt}</p>
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <Button variant="outline" color={"red"}>Захиалга цуцлах</Button>
                    <Button variant="outline" color={"dark"}>Захиалга дэлгэрэнгүй</Button>
                </div>
            </div>
            <Collapse in={opened}>
                <CollapseItem orderItems={data.order_items} total={data.total} />

                <div className='w-full py-2 flex flex-row justify-end items-center pr-9'>
                    <p className='text-grey'>Нийт үнийн дүн :</p>
                    <p className='ml-1'>{data.total}₮</p>
                </div>
            </Collapse>
        </div>
    )
}

export default Order