import React, { useState } from "react";
import axios from "axios";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import NavBar from "./components/NavBar";

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
    <div className="App ">
      <BackgroundGradientAnimation>
        <NavBar />
        <div className="flex absolute z-10 h-full flex-col inset-0 items-center justify-center ">
          <div className="">
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
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
}

export default App;
