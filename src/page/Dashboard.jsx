import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/Context';

export default function Dashboard() {
  const [addUser, setAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const { user } = useAuth();
  const [students, setStudents] = useState([])

  async function fetchStudent() {
    let data = await fetch('https://babycode-lzje.onrender.com/api/students')
    let response = await data.json()
    setStudents(response)
  }

  useEffect(() => {
    fetchStudent()
  }, [])

  function handleFormSubmit(e) {
    e.preventDefault();
    setAddUser(!addUser)

    const formData = new FormData(e.target);

    const newStudent = {
      id: formData.get("id"),
      name: formData.get("name"),
      email: formData.get("email"),
      course: formData.get("course"),
      enrolledOn: formData.get("enrolledOn")
    };

    console.log(newStudent);

    setStudents([...students, newStudent])

  }


  const handleAddUserButton = () => setAddUser(!addUser);

  const filteredStudents = students.filter(student => {
    const matchName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCourse = filterCourse ? student.course === filterCourse : true;
    const matchYear = filterYear ? student.enrolledOn.startsWith(filterYear) : true;
    return matchName && matchCourse && matchYear;
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Dashboard</h1>
      {!user && <p className="text-center text-gray-500 mt-4">Login to add students.</p>}
      {user ? (
        <div className="mb-4 text-right">
          <button
            onClick={handleAddUserButton}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {addUser ? 'Cancel' : 'Add Student'}
          </button>
        </div>
      ) :
        <div className="mb-4 text-right">
          <button
            onClick={() => { alert("Please Login First") }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {addUser ? 'Cancel' : 'Add Student'}
          </button>
        </div>

      }

      {addUser && user && (
        <form onSubmit={handleFormSubmit} className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input name='id' type="number" placeholder="Student ID" className="border p-2 rounded" required />
          <input name='name' type="text" placeholder="Name" className="border p-2 rounded" required />
          <input name='email' type="email" placeholder="Email" className="border p-2 rounded" required />
          <input name='course' type="text" placeholder="Course" className="border p-2 rounded" required />
          <input name='enrolledOn' type="date" className="border p-2 rounded" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={filterCourse}
          onChange={e => setFilterCourse(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">All Courses</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electronics">Electronics</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
        </select>
        <select
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">All Years</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       { students.length > 0 ? filteredStudents.map(student => (
          <div key={student.id} className="border p-4 rounded shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold">{student.name}</h2>
            <p>Email: {student.email}</p>
            <p>Course: {student.course}</p>
            <p>Enrolled: {student.enrolledOn}</p>
          </div>
        )) : <div className='text-center col-span-full'><h3 className=''>Loading...</h3><p>Usually Server take long time to load Please wait</p></div>
      }
      </div>


    </div>
  );
}