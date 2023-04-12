import "../styles/About.css";
import Brandon from "../images/Brandon_website_pic.jpg";
import Cason from "../images/Cason_website_pic.jpg";
import Hannah from "../images/Hannah_website_pic.jpg";
function About() {
    return (
        <div>
            <h1>About Page</h1>
            <div>
                <figure className="image is-128x128">
                    <img className="is-rounded" src={Brandon} alt="a picture of Brandon" />
                    <img className="is-rounded" src={Cason} alt="a picture of Cason" />
                    <img className="is-rounded" src={Hannah} alt="a picture of Hannah" />
                </figure>
            </div>
        </div>
)

}

export default About;