import HousePic from "../images/bernard-hermant-KqOLr8OiQLU-unsplash 1.png";
import "../styles/Home.css";

function Home() {
    return(
        <div>
            <h1 id="Title"> Invest in Long Term Rental Properties</h1>
            <div>
                <img className="HousePic" src={HousePic} alt="Picture of a house" />
            </div>
        </div>
    )

}


export default Home;