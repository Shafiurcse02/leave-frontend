import { motion } from 'framer-motion';
import { useMemo, useState } from "react";
import Pagination from "../components/Pagination1";


const generateData = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `This is description for item ${i + 1}`,
  }));

const About = () => {
  const data = useMemo(() => generateData(500), []); // ৫০০ আইটেমের ডাটা
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const updatenoPerPage = (e) => {
    const n = parseInt(e.target.value);
    if (!isNaN(n) && n > 0) {
      setitemsPerPage(n);
    }
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [currentPage, data, itemsPerPage]);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Large Table Pagination</h1>
      <select name="noPerPage" id="noPerPage" onChange={updatenoPerPage}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
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
              <td className="px-4 py-2 border">{user.id}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.description}</td>

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


export default About;