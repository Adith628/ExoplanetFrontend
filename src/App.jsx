import React, { useState } from "react";
import axios from "axios";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import NavBar from "./components/NavBar";
import Particles from "./components/ui/particles";
import Cursor from "./components/ui/cursor";
import { Link, Element } from "react-scroll";

function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log(formData);
      const response = await axios.post(
        "https://miniprojectbackend-2iul.onrender.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error predicting habitability:", error);
      setResults([]);
    }
  };

  return (
    <div className="App overflow-x-hidden overflow-y-auto ">
      <BackgroundGradientAnimation>
        <NavBar />
        <div className="flex  absolute z-20 h-full overflow-y-scroll flex-col inset-0 items-center justify-center ">
          {/* <div className="">
            <h1 className="flex p-10 text-7xl text-center text-white font-bold tracking-tighter">
              Exoplanet Habitability <br /> Prediction
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".csv"
                required
              />
              <button type="submit">Upload and Predict</button>
            </form>
            <div className="results">
              <h2>Prediction Results:</h2>
              <ul>
                {results.map((result, index) => (
                  <li key={index}>
                    <strong>{result.kepoi_name}</strong>: {result.habitable}
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          <section className=" text-white py-20">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-7xl text-center text-white font-bold tracking-tighter mb-6">
                Welcome to AstroNet
              </h1>
              <p className="text-lg mb-4">
                Discover the potential habitability of exoplanets using our
                advanced machine learning model.
              </p>
              <button className="bg-white text-purple-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
                <Link to="more" smooth={true} duration={1000}>
                  Learn More
                </Link>
              </button>
            </div>
          </section>
        </div>
        <Particles
          className="absolute overflow-hidden inset-0"
          quantity={100}
          ease={80}
          refresh
        />
      </BackgroundGradientAnimation>
      <Element
        id="more"
        name="more"
        className="h-screen relative flex justify-center items-center overflow-hidden  z-0 border-t border-gray-700 bg-gradient-to-b bg-opacity-0 from-black to-black"
      >
        <section className="w-full">
          <div className="flex flex-col p-10 gap-2">
            <div className="flex text-7xl text-left text-white font-bold ">
              Habitability Prediction
            </div>

            <p>
              Dive into the mysteries of the cosmos with our Exoplanet
              Habitability Predictor. Using cutting-edge machine learning
              technology, our model sifts through vast amounts of exoplanet data
              to identify potentially habitable worlds.
            </p>
          </div>
        </section>
        <Particles
          className="absolute overflow-hidden inset-0"
          quantity={100}
          ease={80}
          refresh
        />
      </Element>
      <section className="min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
        <div className="max-w-lg p-8 rounded-lg shadow-lg mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Exoplanet Habitability <br /> Prediction
          </h1>
          <p className="text-lg mb-6">
            Upload a CSV file to predict habitability of exoplanets.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv"
              required
              className="block w-full p-2 bg-gray-700 text-white rounded-lg mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
            >
              Upload and Predict
            </button>
          </form>
        </div>
        <div className="w-full max-w-lg p-8 rounded-lg shadow-lg">
          {results.length > 0 && (
            <>
              <div className="text-xl border-b mb-4">Prediction Results</div>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {results.map((result, index) => (
                  <div key={index} className=" border-gray-700 rounded-lg">
                    <h2 className="text-md font-bold mb-2">
                      {result.kepoi_name}
                    </h2>
                    <p
                      className={`text-${
                        result.habitable ? "green" : "red"
                      }-500`}
                    >
                      {result.habitable}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Cursor />
    </div>
  );
}

export default App;
