const TextSandwich = (data) => {
    const mockdata1 = {
        banners: [
            'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg'
        ],
        content: 'This is a test content 1'
    }
    const mockdata2 = {
        content: 'This is a test content 2'
    }
    return (
        <div className="flex-col">
            <div className="flex justify-center">
                <h1>{mockdata1.content}</h1>
            </div>
            <div>
                <img src={mockdata1.banners[0]} alt="banner" />
            </div>
            <div className="flex justify-center">
                <h1>{mockdata2.content}</h1>
            </div>
        </div>
    );
}

export default TextSandwich;