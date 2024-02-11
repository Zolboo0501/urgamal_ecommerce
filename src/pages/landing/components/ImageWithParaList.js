const ImageWithParaList = (data) => {
    return (
        <div>
            <div className="flex flex-row">
                <div className="w-1/2" >
                    <img src='https://images.pexels.com/photos/4065133/pexels-photo-4065133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                </div>
                <div className="w-1/2">
                    <h1>{data?.data?.content}</h1>
                </div>
            </div>
        </div>
    );
}

export default ImageWithParaList;