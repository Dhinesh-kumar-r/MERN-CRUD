import { useEffect, useState } from "react";
import "../components/css/dashboard.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import "./css/adddata.css";

function Dashboard() {
  const [students, setStudents] = useState([]); // For get a data
  const [filteredStudents, setFilteredStudents] = useState([]); // For Search the data
  const [isModalOpen, setIsModalOpen] = useState(false); // For Modal
  const [studentsData, setStudentsData] = useState({
    name: "",
    email: "",
    phone: "",
    enrollno: "",
    admissiondate: "",
  });

  //All students lsit
  const getAllStudents = async () => {
    await axios
      .get("http://localhost:5000/api/v1/get")
      .then((res) => {
        setStudents(res.data.studentsData);
        setFilteredStudents(res.data.studentsData);
      })
      .catch((err) => {
        console.log("get", err);
      });
  };
  useEffect(() => {
    getAllStudents();
  }, []);


  //post and Update Data
  const PostData = async (e) => {
    e.preventDefault();
    if (studentsData._id) {
      await axios
        .patch(`http://localhost:5000/api/v1/update/${studentsData._id}`)

        .then((res) => {
          if (res.data.msg === "data_updated") {
            alert("Student's Details updated Successfully");
            getAllStudents();
          }
        })
        .catch((error) => {
          console.error("There was an error adding the student!", error);
        });
    } else {
      axios
        .post("http://localhost:5000/api/v1/add", studentsData)
        .then((res) => {
          if (res.data.msg === "added") {
            alert("Student's Details Added Successfully");

            getAllStudents();
          } else if (res.data.msg === "Data_Already_Exist") {
            alert("Student Data Already Exists");
          }
        })

        .catch((error) => {
          console.error("There was an error adding the student!", error);
        });
    }

    closeModal();
    setStudentsData({
      name: "",
      email: "",
      phone: "",
      enrollno: "",
      admissiondate: "",
    });
  };

    //handle delete
    const handleDelete = async (_id) => {
      const isConfirmed = window.confirm("Are you sure to delete this student ?");
      if (isConfirmed) {
        await axios
          .delete(`http://localhost:5000/api/v1/delete/${_id}`)
          .then(() => {
            console.log("deleted");
            getAllStudents();
          });
      }
    };
  
        //update
  const handleUpdate = async (studentsData) => {
    setStudentsData(studentsData);
    setIsModalOpen(true);
  };



  //search Function
  const handleSearch = (e) => {
    const userInput = e.target.value.toLowerCase();
    const filteredList = students.filter((students) =>
      students.name.toLowerCase().includes(userInput)
    );
    setFilteredStudents(filteredList);
  };


  const addData = (e) => {
    setStudentsData({ ...studentsData, [e.target.name]: e.target.value });
  };

  // Add Data Window
  const handleAddRecord = () => {
    setStudentsData({
      name: "",
      email: "",
      phone: "",
      enrollno: "",
      admissiondate: "",
    });
    setIsModalOpen(true);
  };

  //close Winow
  const closeModal = () => {
    setIsModalOpen(false);
    getAllStudents();
  };







  return (
    <>
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="side-content">
            <img
              className="sidebar-image"
              src="https://scontent.fmaa9-1.fna.fbcdn.net/v/t39.30808-1/283696085_111032748282719_7528344326789470948_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=WQsbgta0j7UQ7kNvgED5_wQ&_nc_ht=scontent.fmaa9-1.fna&oh=00_AYC1auUckpdbzd74935YphWJHjeQwd7jAHUK7S2tOCB9BA&oe=664FE4FF"
              alt="logo"
            ></img>
          </div>
          <div className="side">
            <span className="head">Yellow Owl</span>
            <span>Admin</span>
          </div>
        </div>
        <div className="main-content">
          <div className="header">
            <span>Students</span>
          </div>
          <div className="body">
            <div className="second-header">
              <span className="second-head">Students</span>
              <div>
                <input
                  type="search"
                  placeholder="Search"
                  onChange={handleSearch}
                />
                <input
                  type="button"
                  value={"ADD NEW STUDENT"}
                  onClick={handleAddRecord}
                />
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>ENROLL NUMBER</th>
                  <th>DATE OF ADMISSION</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents &&
                  filteredStudents.map((e, index) => {
                    return (
                      <tr key={e._id}>
                        <td>{index + 1}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.phone}</td>
                        <td>{e.enrollno}</td>
                        <td>{e.admissiondate}</td>
                        <td>
                          <FiEdit
                            className="edit"
                            id="modal-2"
                            onClick={() => handleUpdate(e)}
                          />
                        </td>
                        <td>
                          <RiDeleteBin6Line
                            className="delete"
                            onClick={() => handleDelete(e._id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="model-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <div className="add-container">
              <div className="add-data">
                <span className="add-head">Add New Student</span>
                <form onSubmit={PostData}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={studentsData.name}
                    onChange={addData}
                    required
                    name="name"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={studentsData.email}
                    onChange={addData}
                    required
                    name="email"
                  />
                  <input
                    type="number"
                    placeholder="Number"
                    value={studentsData.phone}
                    onChange={addData}
                    name="phone"
                  />
                  <input
                    type="text"
                    placeholder="Enroll Number"
                    value={studentsData.enrollno}
                    onChange={addData}
                    name="enrollno"
                  />
                  <input
                    type="date"
                    placeholder="Date Of Admission"
                    value={studentsData.admissiondate}
                    onChange={addData}
                    name="admissiondate"
                  />
                  <input
                    type="submit"
                    value={"Submit"}
                    className="submit-button"
                  />
                  <input
                    type="button"
                    value={"Cancel"}
                    className="cancel-button"
                    onClick={closeModal}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
