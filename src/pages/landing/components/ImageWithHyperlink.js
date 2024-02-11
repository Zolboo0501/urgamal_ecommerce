const ImageWithHyperlink = () => {
    return (
        <div className={'h-400px bg-cover bg-center'} style={{ height: '400px', backgroundImage: "url(https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <a style={{ margin: '100px', color: 'white', border: 'solid 4px black' }} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                GO
            </a>
        </div>
    );
}
export default ImageWithHyperlink;