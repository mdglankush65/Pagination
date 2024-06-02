"use client"
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  "ID": number,
  "JobTitle": string,
  "EmailAddress": string,
  "FirstNameLastName": string,
  "Email": string,
  "Phone": number,
  "Company": string
}

export default function Home() {
  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const arr = [-2, -1, 0, 1, 2, 3];

  useEffect(() => {
    const controller = new AbortController();
    const settingData = async () => {
      try {
        const response: any = await axios.get(`https://give-me-users-forever.vercel.app/api/users/${(page - 1) * 10}/next`, { signal: controller.signal });
        const res = response.data.users.splice(0, 10);
        setData(res);
      } catch (error: any) {
        return new Error(error.message);
      }
    }
    settingData();
    return ()=> controller.abort();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="m-6 rounded-md text-black">
      <table className="min-w-full border-collapse block md:table rounded-lg">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell rounded-tl-lg">ID</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Job Title</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Phone</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell rounded-tr-lg">Company</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.map((user, index) => (
            <tr key={user.ID} className={`bg-gray-300 border border-grey-500 md:border-none block md:table-row transition-all duration-300 ease-in-out ${index === data.length - 1 ? 'rounded-b-lg' : ''}`}>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{user.ID}</td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{user.FirstNameLastName}</td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{user.JobTitle}</td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{user.EmailAddress}</td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{user.Phone}</td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{user.Company}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <button
          className={`px-4 py-2 mx-2 rounded ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white transition duration-300 ease-in-out'}`}
          disabled={page === 1}
          onClick={() => { setPage(page - 1); }}
        >
          Prev
        </button>
        {arr.map(item => {
          const targetPage = page + item;
          return (targetPage > 0 && targetPage <= 2000) && (
            <button key={targetPage}
              className={`px-4 py-2 mx-2 rounded ${targetPage === page ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white transition duration-300 ease-in-out'}`}
              disabled={targetPage === page}
              onClick={() => { setPage(targetPage); }}
            >
              {targetPage}
            </button>
          );
        })}
        <button
          className={`px-4 py-2 mx-2 rounded ${page > 1999 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white transition duration-300 ease-in-out'}`}
          disabled={page > 1999}
          onClick={() => { setPage(page + 1); }}
        >
          Next
        </button>
      </div>
    </div>
  );
}