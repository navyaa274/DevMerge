import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, Gauge} from "@mui/x-charts";
// import Stack from '@mui/material/Stack';
// import { Gauge } from '@mui/x-charts/Gauge';
import "../../styles/analysis.css";

export function ChartsOverviewDemo() {
  let pieLabel = ["python", "java", "txt", "cpp", "javascipt"];
  const [chartData, setChartData] = useState({ data: [], xAxis: [] });
  const [Data, setPieData] = useState({ data: [], Axis: [] });

  useEffect(() => {
    axios
      .get("http://localhost:6005/api/v1/user/user-analysis/:id")
      .then((response) => {
        let temp_Xaxis = [];
        let temp_Data = [];

        response.data.forEach((item) => {
          temp_Xaxis.push(item._id);
          temp_Data.push(item.count);
        });
        setChartData({
          data: temp_Data,
          xAxis: temp_Xaxis,
        });
        setPieData({
          data: temp_Data,
          Axis: pieLabel,
        });
      })
      .catch((error) =>
        console.error("Error fetching user analysis data:", error)
      );
  }, []);

  if (!chartData.data.length) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h2 className="chart-title">User Registration Analysis</h2>
      <LineChart
        className="chart LineChart"
        xAxis={[{ dataKey: "data", data: chartData.xAxis, scaleType: "point" }]}
        series={[{ data: chartData.data }]}
        width={500}
        height={300}
      />
      <h2 className="chart-title">File Type Distribution</h2>
      <PieChart
        className="chart PieChart"
        colors={["red", "blue", "green", "pink", "black"]}
        series={[
          {
            data: Data.Axis.map((label, index) => ({
              id: index,
              value: Data.data[index-1],
              // label: FileType ${index + 1}
              label,
            })),
          },
        ]}
        width={500}
        height={300}
      />

      <h2 className="chart-title">No. of Files Created</h2>
      <BarChart
        className="chart BarChart"
        series={[{ data: chartData.data }]}
        xAxis={[{ data: chartData.xAxis, scaleType: "band" }]}
        height={290}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />

      {/* <h2 className="chart-title">Users with Mobile Number</h2> */}
      <h2 className="chart-title">File Type Distribution</h2>
      {/* <Gauge className="Chart" */}
                 <Gauge className="chart" width={400} height={400} value={60}
                  />
            {/* /> */}
    </div>
  );
}

// export function UserAnalysisChart() {
//     const [chartData, setChartData] = useState({ data: [], xAxis: [] });

//     useEffect(() => {
//         axios.get("http://localhost:6005/api/v1/user/user-analysis/:id")
//             .then((response) => {
//                 let temp_Xaxis = [];
//                 let temp_Data = [];

//                 response.data.forEach((item) => {
//                     temp_Xaxis.push(item._id);
//                     temp_Data.push(item.count);
//                 });
//                 setChartData({
//                     data: temp_Data,
//                     xAxis: temp_Xaxis,
//                 });
//             })
//             .catch((error) =>
//                 console.error("Error fetching user analysis data:", error)
//             );
//     }, []);

//     if (!chartData.data.length) return <div className="loading">Loading...</div>;

//     return (
//         <div className="container">
//             <h2>User Registration Analysis</h2>
//             <LineChart
//                 xAxis={[{ dataKey: "data", data: chartData.xAxis, scaleType: "point" }]}
//                 series={[{ data: chartData.data }]}
//                 width={500}
//                 height={300}
//             />
//         </div>
//     );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { LineChart } from "@mui/x-charts";

export function UserAnalysisChart() {
  const [chartData, setChartData] = useState({ data: [], xAxis: [] });
  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:6005/api/v1/user/user-analysis/:id")
      .then((response) => {
        // Transform data for the chart
        let temp_Xaxis = [];
        let temp_Data = [];

        response.data.forEach((item) => {
          temp_Xaxis.push(item._id);
          temp_Data.push(item.count);
        });
        setChartData({
          data: temp_Data,
          xAxis: temp_Xaxis,
        });
      })
      .catch((error) =>
        console.error("Error fetching user analysis data:", error)
      );
  }, []);
  //   console.log(chartData);

  if (!chartData.data.length) return <div>lol Loading...</div>;

  return (
    <>
      <div>
        <h2>User Registration Analysis</h2>
        <LineChart
          xAxis={[
            { dataKey: "data", data: chartData.xAxis, scaleType: "point" },
          ]}
          series={[
            {
              data: chartData.data,
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </>
  );
}

// export default UserAnalysisChart;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { LineChart, BarChart } from "@mui/x-charts";
// import "../../styles/analysis.css"

// function UserAnalysisChart() {
//     const [userChartData, setUserChartData] = useState({ data: [], xAxis: [] });
//     // const [loggedInChartData, setLoggedInChartData] = useState({ data: [], xAxis: [] });
//     const [fileChartData, setFileChartData] = useState({ data: [], xAxis: [] });
//     const [chartData, setChartData] = useState({ data: [], xAxis: [] });

//     console.log(" y", chartData);
//     // Fetch User Registration Data
//     useEffect(() => {
//         axios
//             .get("http://localhost:6005/api/v1/user/user-analysis/:id", { withCredentials: false })
//             .then((response) => {
//                 const temp_Xaxis = [];
//                 const temp_Data = [];

//                 response.data.forEach((item) => {
//                     temp_Xaxis.push(item._id);
//                     temp_Data.push(item.count);
//                 });

//                 setUserChartData({
//                     data: temp_Data,
//                     xAxis: temp_Xaxis,
//                 });
//             })
//             .catch((error) => console.error("Error fetching user analysis data:", error));
//     }, []);
//     // console.log(userChartData);
//     // Fetch Logged-In Time Data
//     // useEffect(() => {
//     //     axios
//     //         .get("http://localhost:6005/api/v1/user/user-analysis/:id", { withCredentials: false })
//     //         .then((response) => {
//     //             const tem_Xaxis = [];
//     //             const tem_Data = [];

//     //             response.data.userData.forEach((user) => {
//     //                 tem_Xaxis.push(user.name);
//     //                 tem_Data.push((user.totalLoggedInTime / 3600).toFixed(2)); // Convert seconds to hours
//     //             });

//     //             setLoggedInChartData({
//     //                 data: tem_Data,
//     //                 xAxis: tem_Xaxis,
//     //             });
//     //         })
//     //         .catch((error) => console.error("Error fetching logged-in time data:", error));
//     // }, []);

//     useEffect(() => {
//         axios
//             .get("http://localhost:6005/api/v1/user/user-analysis/:id", { withCredentials: false })
//             .then((response) => {
//                 const temp_Xaxis = [];
//                 const temp_Data = [];

//                 response.data.forEach((item) => {
//                     temp_Xaxis.push(item._id);
//                     temp_Data.push(item.count);
//                 });

//                 setFileChartData({
//                     data: temp_Data,
//                     xAxis: temp_Xaxis,
//                 });
//             })
//             .catch((error) => console.error("Error fetching file analysis data:", error));
//     }, []);

//     useEffect(() => {
//         // Use an IIFE to fetch data asynchronously
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("http://localhost:6005/api/v1/user/user-analysis/:id", { withCredentials: false })
//                 const { percentageWithMobile } = response.data;

//                 // Update state with fetched data
//                 console.log("hey",percentageWithMobile);
//                 setChartData({
//                     data: [percentageWithMobile, 100 - percentageWithMobile],
//                     xAxis: ["Users with Mobile", "Users without Mobile"],
//                 });
//             } catch (error) {
//                 console.error("Error fetching mobile entry data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     // console.log(loggedInChartData, userChartData);

//     // if (!userChartData.data.length || !fileChartData.data.length ) {
//     //     return <div>Loading...</div>;
//     // }

//     return (
//         <div style={{ width: "100%", padding: "20px" }}>
//             {/* User Registration Analysis */}
//             <div style={{ marginBottom: "40px" }}>
//                 <h2>User Registration Analysis</h2>
//                 <LineChart
//                     xAxis={[
//                         {
//                             dataKey: "data",
//                             data: userChartData.xAxis,
//                             scaleType: "point",
//                             label: "Dates",
//                         },
//                     ]}
//                     series={[
//                         {
//                             data: userChartData.data,
//                             label: "User Registrations",
//                         },
//                     ]}
//                     width={600}
//                     height={300}
//                 />
//             </div>

//             {/* Logged-In Time Analysis */}
//             {/* <div>
//                 <h2>User Logged-In Time Analysis</h2>
//                 <BarChart
//                     xAxis={[
//                         {
//                             data: loggedInChartData.xAxis,
//                             label: "Users",
//                         },
//                     ]}
//                     series={[
//                         {
//                             data: loggedInChartData.data.map((time) => parseFloat(time)),
//                             label: "Logged-In Time (Hours)",
//                         },
//                     ]}
//                     width={600}
//                     height={300}
//                 />
//             </div> */}

// <div style={{ width: "100%", padding: "20px" }}>
//             <div style={{ marginBottom: "40px" }}>
//                 <h2>File Creation Analysis</h2>
//                 <LineChart
//                     xAxis={[
//                         {
//                             dataKey: "data",
//                             data: fileChartData.xAxis,
//                             scaleType: "point",
//                             label: "Dates",
//                         },
//                     ]}
//                     series={[
//                         {
//                             data: fileChartData.data,
//                             label: "File Creation Count",
//                         },
//                     ]}
//                     width={600}
//                     height={300}
//                 />
//             </div>
//         </div>
//         <div style={{ width: "100%", padding: "20px" }}>
//             <h2>Mobile Number Entry Percentage</h2>
//             <BarChart
//                 xAxis={[
//                     {
//                         data: chartData.xAxis,
//                         scaleType: "band",
//                         label: "User Categories",
//                     },
//                 ]}
//                 series={[
//                     {
//                         data: chartData.data,
//                         label: "Percentage (%)",
//                         color: ["#4caf50", "#f44336"],
//                     },
//                 ]}
//                 width={600}
//                 height={300}
//             />
//         </div>
//         </div>
//     );
// }

// export default UserAnalysisChart;