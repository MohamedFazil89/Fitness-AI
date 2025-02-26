// import React, { createContext, useContext, useState } from "react";
// import { motion } from "framer-motion";
// import "tailwindcss/tailwind.css";

// // Context for managing data
// const DataContext = createContext();

// const Dashboard = () => {
//   const { data } = useContext(DataContext);
//   return (
//     <div className="bg-gray-900 min-h-screen flex justify-center items-center p-6">
//       <motion.div
//         className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-4xl"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-white text-2xl font-semibold text-center">Analytics</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//           <Card title="Mental Health" value={data.mentalHealth} max={25} />
//           <Card title="Physical Health" value={data.physicalHealth} max={25} />
//           <Card title="Sessions" value={data.sessions} max={25} />
//           <Card title="Challenge" value={data.challenge} max={25} />
//         </div>
//         <Graph data={data.graphData} />
//       </motion.div>
//     </div>
//   );
// };

// const Card = ({ title, value, max }) => {
//   return (
//     <motion.div
//       className="bg-gray-700 p-4 rounded-xl shadow-md text-white text-center"
//       whileHover={{ scale: 1.05 }}
//     >
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <p className="text-xl font-bold">{value}/{max}</p>
//     </motion.div>
//   );
// };

// const Graph = ({ data }) => {
//   return (
//     <motion.div
//       className="bg-gray-700 p-4 mt-4 rounded-xl shadow-md text-white"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       <h3 className="text-lg font-semibold text-center">Weekly Progress</h3>
//       <div className="flex justify-between items-end mt-4 h-40">
//         {data.map((value, index) => (
//           <motion.div
//             key={index}
//             className="bg-blue-500 w-8 rounded-md"
//             style={{ height: `${value * 4}px` }}
//             whileHover={{ scale: 1.1 }}
//           ></motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// const DataProvider = ({ children }) => {
//   const [data, setData] = useState({
//     mentalHealth: 13,
//     physicalHealth: 25,
//     sessions: 12,
//     challenge: 32,
//     graphData: [10, 20, 30, 25, 40, 15, 5],
//   });
//   return <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>;
// };

// const App = () => {
//   return (
//     <DataProvider>
//       <Dashboard />
//     </DataProvider>
//   );
// };

// export default App;
