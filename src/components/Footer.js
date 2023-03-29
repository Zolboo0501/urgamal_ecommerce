import Image from 'next/image'
import { useRouter } from 'next/router'

const BottomFooter = () => {

    const router = useRouter()

    return (
        <div className="flex flex-row px-16 border-t-1 border-black  py-8 bg-green2 justify-between">
            <div className="flex flex-col items-center">
                <Image src="/logo.png" width={62} height={116} className="mx-4" />{" "}
                <p className="text-sm mt-2">“Таримал ургамал” ХХК</p>
                <div className="flex flex-row mt-4 gap-8">
                    <Image src={"/icons/call2.svg"} width={20} height={20} />
                    <Image src={"/icons/instagram.svg"} width={20} height={20} />
                    <Image src={"/icons/facebook.svg"} width={20} height={20} />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-sm">Бидний тухай</p>
                <p className="text-sm mt-2">Вэб үйлчилгээ</p>
                <p className="text-sm mt-2">Бүтээгдэхүүн үйлчилгээ</p>
            </div>
            <div className="flex flex-col">
                <p className="text-sm">Тусламж</p>
                <p className="text-sm mt-2">Хэрэглэх заавар</p>
                <p className="text-sm mt-2">Түгээмэл асуулт</p>
                <p className="text-sm mt-2">Үйлчилгээний нөхцөл</p>
                <p className="text-sm mt-2">Нууцлалын баталгаа</p>
            </div>
            <div className="flex flex-col" style={{ width: "30%" }}>
                <p className="text-sm mt-2">Холбоо барих</p>
                <div className="flex flex-row items-start mt-1 hover:text-white" onClick={() => router.push("/location")}>
                    <Image
                        className="m-1"
                        src={"/icons/location.svg"}
                        width={20}
                        height={20}
                    />
                    <p className="text-sm ml-2 ">
                        Хаяг: Улаанбаатар хот, Баянзүрх дүүрэг, 12-р хороолол, 1-р хороо
                        , 20/2 байр, Таримал ургамлын үрийн дэлгүүр
                    </p>
                </div>
                <div className="flex flex-row items-center mt-2">
                    <Image
                        className="m-1"
                        src={"/icons/call.svg"}
                        width={18}
                        height={18}
                    />
                    <p className="text-sm ml-2">Утас: 72720808</p>
                </div>
                <div className="flex flex-row items-start mt-1">
                    <Image
                        className="m-1"
                        src={"/icons/mail.svg"}
                        width={20}
                        height={20}
                    />
                    <p className="text-sm ml-2">
                        И-мэйл хаяг: tarimalurgamal2016@gmail.com
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BottomFooter