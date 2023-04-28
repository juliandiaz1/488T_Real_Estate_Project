import "../styles/About.css";
import Brandon from "../images/Brandon_website_pic.jpg";
import Cason from "../images/Cason_website_pic.jpg";
import Hannah from "../images/Hannah_website_pic.jpg";
import Julian from "../images/Julian_website_pic.jpeg";
export default function About() {
    return (
        <div>
            <section className="hero">

            <div className="container is-fluid">
                <div className="hero-body has-text-centered">
                    <p className="is-size-5">The purpose of this project is to create a user-friendly website that customers can use to filter properties from the
                    MLS and Property Owners to determine what ones will provide the best ROI.</p>
                </div>
            </div>
            </section>
            <div className="columns">
                <div className="column">
                        <figure className="image">
                        <img className="is-rounded" src={Brandon} alt="Brandon" />
                        </figure>
                        <div className="subtitle has-text-centered has-text-weight-semibold">Brandon Soncarty</div>
                </div>

                <div className="column">
                        <figure className="image">
                        <img className="is-rounded"  src={Cason} alt="Cason" />
                        </figure>
                        <div className="subtitle has-text-centered has-text-weight-semibold">Cason Nichols</div>
                </div>

                <div className="column">
                        <figure className="image">
                        <img className="is-rounded"  src={Hannah} alt="Hannah" />
                        <div className="subtitle has-text-centered has-text-weight-semibold">Hannah Kosmicki</div>
                        </figure>
                </div>

                <div className="column">
                        <figure className="image">
                        <img className="is-rounded" src={Julian} alt="Julian" />
                        <div className="subtitle has-text-centered has-text-weight-semibold">Julian Diaz</div>
                        </figure>
                </div>
            </div>
        </div>
)

}

