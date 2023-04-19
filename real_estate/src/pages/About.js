import "../styles/About.css";
import Brandon from "../images/Brandon_website_pic.jpg";
import Cason from "../images/Cason_website_pic.jpg";
import Hannah from "../images/Hannah_website_pic.jpg";
import Julian from "../images/Julian_website_pic.jpeg";
function About() {
    return (
        <div>
            <div className="container is-fluid">
                <div className="notification">
                    The purpose of this project is to create a user-friendly website that customers can use to filter properties from the
                    MLS and Property Owners to determine what ones will provide the best ROI.
                </div>
            </div>
            <div className="columns">
                <div className="column">
                        <figure className="image">
                        <img className="is-rounded" src={Brandon} alt="Brandon" />
                        </figure>
                        <div className="subtitle has-text-centered">Brandon Soncarty</div>
                </div>

                <div className="column">
                        <figure className="image">
                        <img className="is-rounded"  src={Cason} alt="Cason" />
                        </figure>
                        <div className="subtitle has-text-centered">Cason Nichols</div>
                </div>

                <div className="column">
                        <figure className="image">
                        <img className="is-rounded"  src={Hannah} alt="Hannah" />
                        <div className="subtitle has-text-centered">Hannah Kosmicki</div>
                        </figure>
                </div>

                <div className="column">
                        <figure className="image">
                        <img className="is-rounded" src={Julian} alt="Julian" />
                        <div className="subtitle has-text-centered">Julian Diaz</div>
                        </figure>
                </div>
            </div>
        </div>
)

}

export default About;