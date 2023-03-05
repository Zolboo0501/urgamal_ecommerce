import Image from 'next/image'
import backImage from '../../../public/plant.jpg'
const Login = () => {
    return (
        <div className='w-full h-full flex flex-row absolute'>
            <div style={{ width: "65%", height: "100%", position: "relative" }}>
                <Image
                    fill
                    src={"/plant.jpg"}
                />
            </div>
            <div className='flex flex-col' style={{ marginLeft: "65%", width: "35%", justifyItems: "center" }}>
                <div>
                    <Image src="/logo.png" width={200} height={200} />
                </div>
                dsadasd
            </div>
        </div>
    )
}

export default Login