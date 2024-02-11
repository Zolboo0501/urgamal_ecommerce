const SliderWithText = (data) => {
    const sectionStyle = {
        width: "100%",
        height: "400px",
        objectFit: "contains",
        backgroundImage: "url(https://htmlcolorcodes.com/assets/images/colors/dark-gray-color-solid-background-1920x1080.png)"
    };
    return (
        <div>
            {JSON.stringify(data.data)}
            <div className=" flex-row">
                <div className="w-1/2" style={sectionStyle}>
                    <h1>{data?.data?.content}</h1>
                </div>
            </div>
        </div>
    );
}

export default SliderWithText;