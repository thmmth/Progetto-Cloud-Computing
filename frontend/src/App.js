import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Registra gli elementi di Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/social-data")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Errore nel recuperare i dati:", error));
  }, []);

  const chartData = {
    labels: data.map((item) => item.platform),
    datasets: [
      {
        label: "Likes",
        data: data.map((item) => item.likes),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Comments",
        data: data.map((item) => item.comments),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Social Media Dashboard</h1>
      <div style={{ width: "80%", margin: "auto" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default App;