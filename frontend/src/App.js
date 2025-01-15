import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./App.css";

const App = () => {
  const dataMock = [
    { platform: "Twitter", likes: 120, comments: 34 },
    { platform: "Instagram", likes: 220, comments: 89 },
    { platform: "Facebook", likes: 95, comments: 15 },
  ];

  const chartData = {
    labels: dataMock.map((data) => data.platform),
    datasets: [
      {
        label: "Likes",
        data: dataMock.map((data) => data.likes),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Comments",
        data: dataMock.map((data) => data.comments),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <header>
        <h1>Social Media Dashboard</h1>
      </header>
      <main>
        <div className="chart-container">
          <h2>Engagement Overview</h2>
          <Bar data={chartData} />
        </div>

        <div className="table-container">
          <h2>Data Table</h2>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Likes</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {dataMock.map((data, index) => (
                <tr key={index}>
                  <td>{data.platform}</td>
                  <td>{data.likes}</td>
                  <td>{data.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default App;
