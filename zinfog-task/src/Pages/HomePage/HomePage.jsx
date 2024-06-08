import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { IoClose, IoSearch } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import axios from "axios";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const HomePage = () => {
  const [report, setReport] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    referBy: "",
    patientName: "",
    hospitalId: "",
    status: "",
    billNo: "",
  });

  const handleGetReport = async () => {
    try {
      const response = await axios.get("http://localhost:7000/reports", {
        withCredentials: true,
      });
      setReport(response.data);
      setFilteredData(response.data);  // Set filteredData here
      console.log("Reports", response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetReport();
  }, []);

  console.log("data", filteredData);

  const handleFilter = () => {
    setFilter((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const filtered = report.filter((report) => {
      const fromDateMatch =
        !filters.fromDate || new Date(report.date) === new Date(filters.fromDate);
      const toDateMatch =
        !filters.toDate || new Date(report.date) === new Date(filters.toDate);
      const referByMatch =
        !filters.referBy ||
        report.doctorName.toLowerCase().includes(filters.referBy.toLowerCase());
      const patientNameMatch =
        !filters.patientName ||
        report.patientName.toLowerCase().includes(filters.patientName.toLowerCase());
      const hospitalIdMatch =
        !filters.hospitalId ||
        report.hospitalId.toLowerCase().includes(filters.hospitalId.toLowerCase());
      const statusMatch =
        !filters.status ||
        report.status.toLowerCase().includes(filters.status.toLowerCase());
      const billNoMatch =
        !filters.billNo ||
        report.orderNo.toLowerCase().includes(filters.billNo.toLowerCase());

      return (
        fromDateMatch &&
        toDateMatch &&
        referByMatch &&
        patientNameMatch &&
        hospitalIdMatch &&
        statusMatch &&
        billNoMatch
      );
    });

    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      referBy: "",
      patientName: "",
      hospitalId: "",
      status: "",
      billNo: "",
    });
    setFilteredData(report);
  };

  const handleMsg = (index) => {
    setSelectedMessage((prev) => (prev === index ? null : index));
  };

  const uniqueDoctorNames = [...new Set(report.map(item => item.doctorName))];
  const uniqueStatuses = [...new Set(report.map(item => item.status))];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-fluid d-flex flex-column justify-content-between align-items-center p-0 home">
      <div className="container-fluid home-nav d-flex align-items-center justify-content-between px-5">
        <img
          className="nav-zinfog img-fluid"
          src={require("../../images/Group 366.png")}
          alt=""
        />

        <div className="d-flex justify-content-between align-items-center col-2 p-2 profile">
          <span>Username</span>
          <img src={require("../../images/Frame 338 (1).png")} alt="" />
          <img src={require("../../images/sign-out.png")} alt="" />
        </div>
      </div>

      <div className="container d-flex justify-content-between p-3">
        <span className="report-span">Patient Reports</span>

        <div className="d-flex justify-content-evenly align-items-center col-6 p-2">
          <button
            className="d-flex justify-content-evenly align-items-center p-1 filter"
            onClick={handleFilter}
          >
            Apply Filter
            <img src={require("../../images/Vector.png")} alt="" />
          </button>

          <div className="col-8 p-1 d-flex justify-content-evenly align-items-center search">
            <input
              type="text"
              placeholder="Search by Doctor Name/ Patient Name/ Test Name..."
            />
            <IoSearch className="search-icon" />
          </div>
        </div>
      </div>

      <div className="container-fluid table-container d-flex flex-column justify-content-between pb-2">
        {filter && (
          <div className="container-fluid p-2">
            <div className="container-fluid p-0 d-flex justify-content-between">
              <div className="form-item d-flex justify-content-between align-items-center p-1">
                From Date{" "}
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item d-flex justify-content-between align-items-center p-1">
                To Date{" "}
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item d-flex justify-content-between align-items-center p-1">
                Refer by
                <select
                  name="referBy"
                  value={filters.referBy}
                  onChange={handleInputChange}
                >
                  <option value="">Select Doctor Name</option>
                  {uniqueDoctorNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="container-fluid p-0 d-flex justify-content-between">
              <div className="form-item d-flex justify-content-between align-items-center p-1">
                Patient Name{" "}
                <input
                  type="text"
                  name="patientName"
                  value={filters.patientName}
                  placeholder="Patient Name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item d-flex justify-content-between align-items-center p-1">
                Hospital ID{" "}
                <input
                  type="text"
                  name="hospitalId"
                  value={filters.hospitalId}
                  placeholder="Hospital ID"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-item d-flex justify-content-between align-items-center p-1">
                Status
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleInputChange}
                >
                  <option value="">Choose</option>
                  {uniqueStatuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-item d-flex justify-content-between align-items-center p-1">
              Bill No{" "}
              <input
                type="text"
                name="billNo"
                value={filters.billNo}
                onChange={handleInputChange}
              />
            </div>
            <div
              className=" content container-fluid p-1 d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#E4FBFB" }}
            >
              <span>Please provide search criteria and hit search button.</span>
              <div className="col-3 ">
                <div className="d-flex justify-content-evenly align-items-center col-10 gap-2 p-0">
                  <button
                    className="d-flex justify-content-evenly align-items-center p-2 filter1"
                    onClick={applyFilters}
                  >
                    <RiSearchLine />
                    Search
                  </button>
                  <button
                    className="d-flex justify-content-evenly align-items-center p-2 filter2"
                    onClick={clearFilters}
                  >
                    <IoClose />
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <table className="custom-table">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Date</th>
              <th>Patient Name</th>
              <th>Hospital ID</th>
              <th>Test Name</th>
              <th>Doctor Name</th>
              <th>ETA</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length === 0 ? (
              <tr>
                <td colSpan="9">No Data Found</td>
              </tr>
            ) : (
              displayedData.map((report, index) => (
                <tr key={index}>
                  <td>{report.orderNo}</td>
                  <td>{report.date}</td>
                  <td>{report.patientName}</td>
                  <td>{report.hospitalId}</td>
                  <td>{report.testName}</td>
                  <td>{report.doctorName}</td>
                  <td>{report.eta}</td>
                  <td><p
                     className="status"
                     style={{
                      backgroundColor:
                        report.status === "Ready"
                          ? "#89FFAA"
                          : report.status === "Partial Report"
                          ? "#E7F880"
                          : report.status === "Pending"
                          ? "rgb(228,251,251)"
                          : report.status === "Lab dropped"
                          ? "#F2A38A"
                          : "transparent", // Default background color if status doesn't match
                      color: report.status === "partial" ? "black" : "white", // To ensure text is readable on yellow background
                    }}
                  >{report.status}</p></td>
                  <td>
                    <div className="w-100 p-1 action-col">
                      <img
                        className="action"
                        src={require("../../images/Vector (1).png")}
                        alt=""
                      />
                      <img
                        className="action"
                        src={require("../../images/Vector (2).png")}
                        alt=""
                        onClick={() => handleMsg(index)}
                      />
                      {selectedMessage === index && (
                        <div className="col-2 msg-box p-1 gap-1 msg-div">
                          <span>{report.orderNo}</span>
                          <div className="container-fluid p-0 bg-info ">
                            <textarea
                              className="msg-txt"
                              type="text"
                              placeholder="Text Message"
                            />
                          </div>
                          <button
                            className="d-flex justify-content-evenly align-items-center p-2 filter1"
                            style={{ width: "10px", height: "30px" }}
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className="container p-4 d-flex justify-content-between align-items-center home-footer">
        <span>Copyright © 2023 Access Home Lab Solutions</span>
        <div className="phone">
          <HiOutlinePhone className="phone" /> (+91)9288008801
        </div>
        <span>
          All Rights Reserved |{" "}
          <Link className="home-footer-link">Terms and Conditions</Link> |{" "}
          <Link className="home-footer-link">Privacy Policy</Link>
        </span>
      </div>
    </div>
  );
};

export default HomePage;
