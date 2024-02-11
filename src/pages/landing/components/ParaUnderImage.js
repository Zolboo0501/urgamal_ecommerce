
const ParaUnderImage = () => {
    const mockdata = {
        banners: [
            'https://icon-library.com/images/icon-categories/icon-categories-10.jpg'
        ],
        content: 'This is a test content'
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>{mockdata.content}</h1>
            <img src={mockdata.banners[0]} alt="banner" />
        </div>
    )
}

export default ParaUnderImage;