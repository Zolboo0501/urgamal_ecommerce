const MultipleArray = (data) => {
    const mockdata1 = {
        banners: [
            'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg',
            'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg',
            'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg',
            'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg'
        ],
    }
    return (
        <div className="flex flex-wrap justify-center">
            {mockdata1.banners.map((banner, index) => {
                return (
                    <div className="w-1/2 p-4">
                        <img src={banner} alt
                            ="banner" />
                    </div>
                )
            })
            }
        </div>
    );
}

export default MultipleArray;