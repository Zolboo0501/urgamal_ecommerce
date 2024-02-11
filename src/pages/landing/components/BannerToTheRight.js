import { Carousel } from "@mantine/carousel";

const BannerToTheRight = () => {
    const mockdata = {
        banners: [
            'https://www.shutterstock.com/image-photo/green-leaves-tropical-plants-bush-260nw-2321384137.jpg',
            'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg'
        ],
        content: 'This is a test content'
    }
    return (
        <div>
            <Carousel
                withIndicators
                height="400px"
                sx={{ flex: 1 }}
                slideSize="100%"
                breakpoints={[
                    { maxWidth: "md", slideSize: "100%" },
                    { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                ]}
                slideGap="md"
                loop
                align="center"
                slidesToScroll={1}
                draggable={true}
                styles={{
                    control: {
                        "&[data-inactive]": {
                            opacity: 0,
                            cursor: "default",
                        },
                    },
                }}>
                <Carousel.Slide>
                    <div className="relative w-full h-full rounded-lg">
                        <img
                            alt="banner2"
                            src={mockdata.banners[0]}
                            className="rounded object-fill md:object-cover  max-h-full"
                            draggable={false}
                        />
                    </div>
                </Carousel.Slide>
                <Carousel.Slide>
                    <div className="relative w-full h-full rounded-lg">
                        <img
                            alt="banner2"
                            src={mockdata.banners[1]}
                            className="rounded object-fill md:object-cover  max-h-full"
                            draggable={false}
                        />
                    </div>
                </Carousel.Slide>

            </Carousel>
        </div>
    )
}

export default BannerToTheRight;