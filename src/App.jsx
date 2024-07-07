import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import NavBar from "./components/NavBar";
import Particles from "./components/ui/particles";
import Cursor from "./components/ui/cursor";
import { Link, Element } from "react-scroll"; // Import your loader component
import Loader from "./components/Loader";

function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const [totalPlanets, setTotalPlanets] = useState(0);
  const [habitablePlanets, setHabitablePlanets] = useState(0);
  const [nonHabitablePlanets, setNonHabitablePlanets] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true); // Start loading

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
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    setTotalPlanets(results.length);
    setHabitablePlanets(
      results.filter((result) => result.habitable === "Habitable").length
    );
    setNonHabitablePlanets(
      results.filter((result) => result.habitable === "Non-Habitable").length
    );
  }, [results]);

  const features = {
    koi_period: "Orbital Period",
    koi_ror: "Planet-Star Radius Ratio",
    koi_srho: "Fitted Stellar Density",
    koi_prad: "Planetary Radius",
    koi_sma: "Orbit Semi-Major Axis",
    koi_teq: "Equilibrium Temperature",
    koi_insol: "Insolation Flux",
    koi_dor: "Planet-Star Distance over Star Radius",
    koi_count: "Number of Planet",
    koi_steff: "Stellar Effective Temperature",
    koi_slogg: "Stellar Surface Gravity",
    koi_smet: "Stellar Metallicity",
    koi_srad: "Stellar Radius",
    koi_smass: "Stellar Mass",
  };

  return (
    <div className="App overflow-x-hidden overflow-y-auto ">
      <BackgroundGradientAnimation>
        <NavBar />
        <div className="flex  absolute z-20 h-full overflow-y-scroll flex-col inset-0 items-center justify-center ">
          <section className=" text-white py-20">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-7xl text-center text-white font-bold tracking-tighter mb-6">
                Welcome to AstroNet
              </h1>
              <p className="text-lg mb-4">
                Discover the potential habitability of exoplanets using our
                advanced machine learning model.
              </p>
              <div className="flex gap-2 justify-center">
                <button className="bg-white text-purple-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
                  <Link to="more" smooth={true} duration={1000}>
                    Learn More
                  </Link>
                </button>
                <button className="border px-6 py-3 rounded-full border-gray-600 bg-gray-800/10 hover:bg-gray-800/30">
                  <Link to="demo" smooth={true} duration={1000}>
                    Demo
                  </Link>
                </button>
              </div>
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
        className="h-screen relative flex justify-center px-5 items-center overflow-hidden  z-0 border-t border-gray-700 bg-gradient-to-b bg-opacity-0 from-black to-black"
      >
        <section className="w-full ">
          <div className="flex flex-col px-10 pt-20 pb-0 gap-2">
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
          <div className="p-10 flex flex-col gap-5">
            <h3 className="text-3xl font-semibold">
              Features selected for training
            </h3>
            <ul className="list-disc flex flex-col h-[350px] flex-wrap   list-inside text-lg space-y-2">
              {Object.entries(features).map(([key, value]) => (
                <li key={key} className="ml-4">
                  <span className="font-semibold">{value}</span>{" "}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Particles
          className="absolute overflow-hidden inset-0"
          quantity={100}
          ease={80}
          refresh
        />
      </Element>
      <Element
        id="demo"
        name="demo"
        className="min-h-screen bg-black text-white flex  gap-20 flex-col md:flex-row items-center justify-between p-10 md:p-20"
      >
        <div className="max-w-lg flex-1 p-8 rounded-lg shadow-lg mb-10 md:mb-0">
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
        <div
          className={`w-full flex flex-col flex-1   rounded-lg shadow-lg bg-gray-800/20 text-white `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center bg-black">
              <Loader /> {/* Replace with your actual loader component */}
            </div>
          ) : results.length !== 0 ? (
            <div className="p-8">
              <div className="text-2xl  font-semibold  border-b border-gray-700 mb-4 pb-4">
                Prediction Results
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>Total Planets</div>
                  <div>{totalPlanets}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>Habitable Planets</div>
                  <div>{habitablePlanets}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>Non-habitable Planets</div>
                  <div>{nonHabitablePlanets}</div>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="p-4 hover:scale-105 transition-all duration-200 bg-gray-900 rounded-lg w-full flex gap-2 whitespace-nowrap px-5 justify-between items-center"
                  >
                    <h2 className="text-md font-bold">{result.kepoi_name}</h2>
                    <p
                      className={`text-${
                        result.habitable === "Habitable" ? "green" : "red"
                      }-500`}
                    >
                      {result.habitable}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Element>
      <footer className="bg-black text-gray-500 py-4 border-t border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} AstroNet. All rights reserved.
          </p>
        </div>
      </footer>

      <Cursor />
    </div>
  );
}

export default App;
