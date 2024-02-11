const ParaRight = (data) => {
    const mockdata = {
        banners: [
            'https://www.shutterstock.com/image-photo/green-leaves-tropical-plants-bush-260nw-2321384137.jpg',
            'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg'
        ],
        content: 'This is a test content'
    }
    return (
        <div className="flex">
            <div className="w-1/2">
                <img src={mockdata.banners[0]} alt="banner" />
            </div>
            <div className="w-1/2">
                <h1>{mockdata.content}</h1>
            </div>
        </div>
    );
}

export default ParaRight;