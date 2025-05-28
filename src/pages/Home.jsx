import { useState } from "react";
import Pagination from "../components/Pagination";

import { motion } from 'framer-motion';

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `ইউজার ${i + 1}`,
  email: `user${i + 1}@example.com`
}));




const Home = () => {
  const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(10)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const updatenoPerPage = (e) => {
    const n = parseInt(e.target.value);
    if (!isNaN(n) && n > 0) {
      setITEMS_PER_PAGE(n);
    }
  }
  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">ইউজার টেবিল</h1>
      <select name="noPerPage" id="noPerPage" onChange={updatenoPerPage}>
        <option value="2" >2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <motion.table
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-w-full text-sm border border-gray-300"
      >
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">আইডি</th>
            <th className="p-2 border">নাম</th>
            <th className="p-2 border">ইমেইল</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user) => (
            <motion.tr
              key={user.id}
              whileHover={{ scale: 1.01, backgroundColor: "#f1f5f9" }}
              className="text-center"
            >
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
};

export default Home