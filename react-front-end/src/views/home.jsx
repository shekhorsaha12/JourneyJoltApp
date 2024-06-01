import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DemoCarousel from "./carousel";

const Home = () => {
    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3">
                            <strong>Tourist Attractions</strong>
                        </h1>

                        <div className="main-section">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src="./places/p1.jpg"
                                            alt="Place 1"
                                        />
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">
                                                Card with image and button
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">
                                                Lorem ipsum dolor sit amet
                                                consectetur, adipisicing elit.
                                                Maiores possimus voluptate
                                                aperiam quae commodi tempora
                                                voluptatum, magni veniam quidem.
                                                Necessitatibus reiciendis iusto
                                                autem ipsum ipsam eligendi ab
                                                architecto accusantium vel!
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit.
                                                Voluptatem, explicabo officia!
                                                Dolore, animi quam. Debitis
                                                minus laborum blanditiis, beatae
                                                vero impedit incidunt possimus
                                                maxime hic ipsam nesciunt
                                                veniam? Aliquid, totam! Lorem
                                                ipsum dolor, sit amet
                                                consectetur adipisicing elit. Id
                                                magni possimus quod aperiam
                                                assumenda libero aut facilis,
                                                sint quaerat, voluptate porro
                                                rem esse quia nulla iusto
                                                laboriosam odit nisi nobis!
                                            </p>
                                            <a
                                                href="#"
                                                className="btn btn-primary"
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DemoCarousel></DemoCarousel>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
