
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const DemoCarousel = () => {
    return (
        <Carousel>
            <div>
                <img src="../image/dargavs.jpg" alt="Slide 1" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="../image/gettyimages-840082022-1528992583.jpg" alt="Slide 2" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="../image/high-angle-view-of-buildings-in-city-1192824437-8af7e2970e064cebab79e2e52c4f419b.webp" alt="Slide 3" />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src="../image/kazan.jpg" alt="Slide 3" />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src="../image/kizhi_island.jpg" alt="Slide 3" />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src="../image/kizhi_pogost.webp" alt="Slide 3" />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src="../image/kul-sharif-mosque-in-kazan-kremlin.webp" alt="Slide 3" />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src="../image/lake-and-mountains-against-sky.webp" alt="Slide 3" />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
};

export default DemoCarousel;
