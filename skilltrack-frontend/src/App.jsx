import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const STUDENT_API = "http://localhost:8080/api/students";
const CERTIFICATE_API = "http://localhost:8080/api/certificates";
const INTERNSHIP_API = "http://localhost:8080/api/internships";

function App() {
  /* =====================================================
     ACTIVE TAB
  ===================================================== */

  const [activeTab, setActiveTab] = useState("dashboard");

  /* =====================================================
     DATA
  ===================================================== */

  const [students, setStudents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [internships, setInternships] = useState([]);

  /* =====================================================
     EDIT IDS
  ===================================================== */

  const [studentEditId, setStudentEditId] = useState(null);
  const [certificateEditId, setCertificateEditId] = useState(null);
  const [internshipEditId, setInternshipEditId] = useState(null);

  /* =====================================================
     STUDENT FORM
  ===================================================== */

  const emptyStudent = {
    studentName: "",
    registerNumber: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    section: "",
    collegeName: "",
  };

  const [studentForm, setStudentForm] = useState(emptyStudent);

  /* =====================================================
     CERTIFICATE FORM
  ===================================================== */

  const emptyCertificate = {
    certificateName: "",
    studentName: "",
    issuingOrganization: "",
    issueDate: "",
    certificateImage: "",
  };

  const [certificateForm, setCertificateForm] =
    useState(emptyCertificate);

  /* =====================================================
     INTERNSHIP FORM
  ===================================================== */

  const emptyInternship = {
    companyName: "",
    studentName: "",
    role: "",
    startDate: "",
    endDate: "",
    status: "Applied",
    internshipUrl: "",
  };

  const [internshipForm, setInternshipForm] =
    useState(emptyInternship);

  /* =====================================================
     LOAD DATA
  ===================================================== */

  useEffect(() => {
    loadStudents();
    loadCertificates();
    loadInternships();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await axios.get(STUDENT_API);
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  const loadCertificates = async () => {
    try {
      const response = await axios.get(CERTIFICATE_API);
      setCertificates(response.data);
    } catch (error) {
      console.error("Error loading certificates:", error);
    }
  };

  const loadInternships = async () => {
    try {
      const response = await axios.get(INTERNSHIP_API);
      setInternships(response.data);
    } catch (error) {
      console.error("Error loading internships:", error);
    }
  };

  /* =====================================================
     STUDENT FUNCTIONS
  ===================================================== */

  const handleStudentChange = (e) => {
    setStudentForm({
      ...studentForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveStudent = async (e) => {
    e.preventDefault();

    try {
      if (studentEditId) {
        await axios.put(
          `${STUDENT_API}/${studentEditId}`,
          studentForm
        );

        alert("Student updated successfully!");
      } else {
        await axios.post(STUDENT_API, studentForm);

        alert("Student added successfully!");
      }

      setStudentForm(emptyStudent);
      setStudentEditId(null);

      loadStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to save student.");
    }
  };

  const editStudent = (student) => {
    setStudentEditId(student.id);

    setStudentForm({
      studentName: student.studentName || "",
      registerNumber: student.registerNumber || "",
      email: student.email || "",
      phone: student.phone || "",
      department: student.department || "",
      year: student.year || "",
      section: student.section || "",
      collegeName: student.collegeName || "",
    });

    setActiveTab("students");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {
      await axios.delete(`${STUDENT_API}/${id}`);

      loadStudents();

      alert("Student deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student.");
    }
  };

  /* =====================================================
     CERTIFICATE FUNCTIONS
  ===================================================== */

  const handleCertificateChange = (e) => {
    setCertificateForm({
      ...certificateForm,
      [e.target.name]: e.target.value,
    });
  };

  /* IMAGE UPLOAD */

  const handleCertificateImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setCertificateForm({
        ...certificateForm,
        certificateImage: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const saveCertificate = async (e) => {
    e.preventDefault();

    try {
      if (!certificateForm.certificateImage) {
        alert("Please upload certificate image.");
        return;
      }

      if (certificateEditId) {
        await axios.put(
          `${CERTIFICATE_API}/${certificateEditId}`,
          certificateForm
        );

        alert("Certificate updated successfully!");
      } else {
        await axios.post(
          CERTIFICATE_API,
          certificateForm
        );

        alert("Certificate added successfully!");
      }

      setCertificateForm(emptyCertificate);
      setCertificateEditId(null);

      loadCertificates();
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.data);
      }

      alert("Failed to save certificate.");
    }
  };

  const editCertificate = (certificate) => {
    setCertificateEditId(certificate.id);

    setCertificateForm({
      certificateName:
        certificate.certificateName || "",

      studentName:
        certificate.studentName || "",

      issuingOrganization:
        certificate.issuingOrganization || "",

      issueDate:
        certificate.issueDate || "",

      certificateImage:
        certificate.certificateImage || "",
    });

    setActiveTab("certificates");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteCertificate = async (id) => {
    if (!window.confirm("Delete this certificate?")) {
      return;
    }

    try {
      await axios.delete(
        `${CERTIFICATE_API}/${id}`
      );

      loadCertificates();

      alert("Certificate deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete certificate.");
    }
  };

  const openCertificate = (image) => {
    if (!image) {
      alert("No certificate image available.");
      return;
    }

    const newWindow = window.open();

    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Certificate</title>
            <style>
              body {
                margin: 0;
                background: #111827;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
              }

              img {
                max-width: 95%;
                max-height: 95vh;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="${image}" alt="Certificate" />
          </body>
        </html>
      `);

      newWindow.document.close();
    }
  };

  /* =====================================================
     INTERNSHIP FUNCTIONS
  ===================================================== */

  const handleInternshipChange = (e) => {
    setInternshipForm({
      ...internshipForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveInternship = async (e) => {
    e.preventDefault();

    try {
      if (internshipEditId) {
        await axios.put(
          `${INTERNSHIP_API}/${internshipEditId}`,
          internshipForm
        );

        alert("Internship updated successfully!");
      } else {
        await axios.post(
          INTERNSHIP_API,
          internshipForm
        );

        alert("Internship added successfully!");
      }

      setInternshipForm(emptyInternship);
      setInternshipEditId(null);

      loadInternships();
    } catch (error) {
      console.error(error);
      alert("Failed to save internship.");
    }
  };

  const editInternship = (internship) => {
    setInternshipEditId(internship.id);

    setInternshipForm({
      companyName: internship.companyName || "",
      studentName: internship.studentName || "",
      role: internship.role || "",
      startDate: internship.startDate || "",
      endDate: internship.endDate || "",
      status: internship.status || "Applied",
      internshipUrl: internship.internshipUrl || "",
    });

    setActiveTab("internships");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteInternship = async (id) => {
    if (!window.confirm("Delete this internship?")) {
      return;
    }

    try {
      await axios.delete(
        `${INTERNSHIP_API}/${id}`
      );

      loadInternships();

      alert("Internship deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete internship.");
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="app">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-logo">
            ST
          </div>

          <div>
            <h2>SkillTrack</h2>

            <span>
              Student Career Management
            </span>
          </div>

        </div>

      </header>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="navbar">

        <button
          className={
            activeTab === "dashboard"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={
            activeTab === "students"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>

        <button
          className={
            activeTab === "certificates"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() =>
            setActiveTab("certificates")
          }
        >
          Certificates
        </button>

        <button
          className={
            activeTab === "internships"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() =>
            setActiveTab("internships")
          }
        >
          Internships
        </button>

      </nav>

      {/* =================================================
          MAIN
      ================================================= */}

      <main>

        {/* =================================================
            DASHBOARD
        ================================================= */}

        {activeTab === "dashboard" && (

          <section className="page">

            <div className="hero">

              <div>

                <p className="eyebrow">
                  STUDENT CAREER MANAGEMENT
                </p>

                <h1>
                  SkillTrack
                </h1>

                <p>
                  Track Your Skills. Showcase Your Growth.
                </p>

              </div>

            </div>

            <div className="stats-grid">

              <div className="stat-card">

                <span>👨‍🎓</span>

                <h3>
                  {students.length}
                </h3>

                <p>
                  Total Students
                </p>

              </div>

              <div className="stat-card">

                <span>🏆</span>

                <h3>
                  {certificates.length}
                </h3>

                <p>
                  Certificates
                </p>

              </div>

              <div className="stat-card">

                <span>💼</span>

                <h3>
                  {internships.length}
                </h3>

                <p>
                  Internships
                </p>

              </div>

            </div>

            <div className="welcome-card">

              <h2>
                Welcome to SkillTrack
              </h2>

              <p>
                Manage student information,
                certificates and internship
                experiences from one simple
                platform.
              </p>

            </div>

          </section>

        )}

        {/* =================================================
            STUDENTS
        ================================================= */}

        {activeTab === "students" && (

          <section className="page">

            <div className="page-header">

              <div>

                <p className="eyebrow">
                  MANAGEMENT
                </p>

                <h1>
                  Students
                </h1>

              </div>

              <span className="count-badge">
                {students.length} Students
              </span>

            </div>

            {/* FORM */}

            <div className="form-card">

              <h2>
                {studentEditId
                  ? "Edit Student"
                  : "Add Student"}
              </h2>

              <form onSubmit={saveStudent}>

                <div className="form-grid">

                  <div className="input-group">

                    <label>
                      Student Name
                    </label>

                    <input
                      name="studentName"
                      value={
                        studentForm.studentName
                      }
                      onChange={
                        handleStudentChange
                      }
                      placeholder="Enter student name"
                      required
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Register Number
                    </label>

                    <input
                      name="registerNumber"
                      value={
                        studentForm.registerNumber
                      }
                      onChange={
                        handleStudentChange
                      }
                      placeholder="Enter register number"
                      required
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        studentForm.email
                      }
                      onChange={
                        handleStudentChange
                      }
                      placeholder="student@email.com"
                      required
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Phone
                    </label>

                    <input
                      name="phone"
                      value={
                        studentForm.phone
                      }
                      onChange={
                        handleStudentChange
                      }
                      placeholder="Enter phone number"
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Department
                    </label>

                    <input
                      name="department"
                      value={
                        studentForm.department
                      }
                      onChange={
                        handleStudentChange
                      }
                      placeholder="e.g. IT"
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Year
                    </label>

                    <select
                      name="year"
                      value={
                        studentForm.year
                      }
                      onChange={
                        handleStudentChange
                      }
                    >

                      <option value="">
                        Select Year
                      </option>

                      <option value="1">
                        1st Year
                      </option>

                      <option value="2">
                        2nd Year
                      </option>

                      <option value="3">
                        3rd Year
                      </option>

                      <option value="4">
                        4th Year
                      </option>

                    </select>

                  </div>

                  <div className="input-group">

                    <label>
                      Section
                    </label>

                    <input
                      name="section"
                      value={
                        studentForm.section
                      }
                      onChange={
                        handleStudentChange
                      }
                      placeholder="e.g. A"
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      College Name
                    </label>

                    <input
                      name="collegeName"
                      value={
                        studentForm.collegeName
                      }
                      onChange={
                        handleStudentChange
                      }
                      placeholder="Enter college name"
                    />

                  </div>

                </div>

                <div className="form-actions">

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    {studentEditId
                      ? "Update Student"
                      : "Save Student"}
                  </button>

                  {studentEditId && (

                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => {
                        setStudentEditId(null);
                        setStudentForm(
                          emptyStudent
                        );
                      }}
                    >
                      Cancel
                    </button>

                  )}

                </div>

              </form>

            </div>

            {/* TABLE */}

            <div className="table-card">

              <div className="table-header">

                <h2>
                  Student Records
                </h2>

              </div>

              {students.length === 0 ? (

                <div className="empty-state">
                  No students found.
                </div>

              ) : (

                <div className="table-wrapper">

                  <table>

                    <thead>

                      <tr>

                        <th>Name</th>
                        <th>Register No</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Section</th>
                        <th>Actions</th>

                      </tr>

                    </thead>

                    <tbody>

                      {students.map((student) => (

                        <tr key={student.id}>

                          <td className="strong">
                            {student.studentName}
                          </td>

                          <td>
                            {student.registerNumber}
                          </td>

                          <td>
                            {student.email}
                          </td>

                          <td>
                            {student.department}
                          </td>

                          <td>
                            {student.year}
                          </td>

                          <td>
                            {student.section}
                          </td>

                          <td>

                            <div className="action-buttons">

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  editStudent(student)
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  deleteStudent(
                                    student.id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </section>

        )}

        {/* =================================================
            CERTIFICATES
        ================================================= */}

        {activeTab === "certificates" && (

          <section className="page">

            <div className="page-header">

              <div>

                <p className="eyebrow">
                  ACHIEVEMENTS
                </p>

                <h1>
                  Certificates
                </h1>

              </div>

              <span className="count-badge">
                {certificates.length} Certificates
              </span>

            </div>

            {/* CERTIFICATE FORM */}

            <div className="form-card">

              <h2>
                {certificateEditId
                  ? "Edit Certificate"
                  : "Add Certificate"}
              </h2>

              <form onSubmit={saveCertificate}>

                <div className="form-grid">

                  <div className="input-group">

                    <label>
                      Certificate Name
                    </label>

                    <input
                      name="certificateName"
                      value={
                        certificateForm.certificateName
                      }
                      onChange={
                        handleCertificateChange
                      }
                      placeholder="e.g. DBMS Certification"
                      required
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Student
                    </label>

                    <select
                      name="studentName"
                      value={
                        certificateForm.studentName
                      }
                      onChange={
                        handleCertificateChange
                      }
                      required
                    >

                      <option value="">
                        Select Student
                      </option>

                      {students.map((student) => (

                        <option
                          key={student.id}
                          value={student.studentName}
                        >
                          {student.studentName} -{" "}
                          {student.registerNumber}
                        </option>

                      ))}

                    </select>

                  </div>

                  <div className="input-group">

                    <label>
                      Issuing Organization
                    </label>

                    <input
                      name="issuingOrganization"
                      value={
                        certificateForm.issuingOrganization
                      }
                      onChange={
                        handleCertificateChange
                      }
                      placeholder="e.g. NPTEL"
                      required
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Issue Date
                    </label>

                    <input
                      type="date"
                      name="issueDate"
                      value={
                        certificateForm.issueDate
                      }
                      onChange={
                        handleCertificateChange
                      }
                    />

                  </div>

                  <div className="input-group full-width">

                    <label>
                      Upload Certificate Image
                    </label>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={
                        handleCertificateImage
                      }
                      className="file-input"
                    />

                    <small>
                      JPG, JPEG or PNG • Maximum 5 MB
                    </small>

                  </div>

                </div>

                {/* IMAGE PREVIEW */}

                {certificateForm.certificateImage && (

                  <div className="certificate-upload-preview">

                    <div className="preview-title">
                      Certificate Preview
                    </div>

                    <img
                      src={
                        certificateForm.certificateImage
                      }
                      alt="Certificate Preview"
                    />

                  </div>

                )}

                <div className="form-actions">

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    {certificateEditId
                      ? "Update Certificate"
                      : "Save Certificate"}
                  </button>

                  {certificateEditId && (

                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => {
                        setCertificateEditId(null);
                        setCertificateForm(
                          emptyCertificate
                        );
                      }}
                    >
                      Cancel
                    </button>

                  )}

                </div>

              </form>

            </div>

            {/* CERTIFICATE CARDS */}

            {certificates.length === 0 ? (

              <div className="empty-state card-empty">
                No certificates found.
              </div>

            ) : (

              <div className="certificate-grid">

                {certificates.map((certificate) => (

                  <div
                    className="certificate-card"
                    key={certificate.id}
                  >

                    <div className="certificate-image-container">

                      {certificate.certificateImage ? (

                        <img
                          src={
                            certificate.certificateImage
                          }
                          alt={
                            certificate.certificateName
                          }
                          onClick={() =>
                            openCertificate(
                              certificate.certificateImage
                            )
                          }
                        />

                      ) : (

                        <div className="no-image">

                          <span>
                            📄
                          </span>

                          <p>
                            No Image
                          </p>

                        </div>

                      )}

                    </div>

                    <div className="certificate-content">

                      <span className="certificate-label">
                        CERTIFICATE
                      </span>

                      <h3>
                        {certificate.certificateName}
                      </h3>

                      <p>
                        👤{" "}
                        {certificate.studentName}
                      </p>

                      <p>
                        🏢{" "}
                        {certificate.issuingOrganization}
                      </p>

                      {certificate.issueDate && (

                        <p>
                          📅{" "}
                          {certificate.issueDate}
                        </p>

                      )}

                      <div className="certificate-actions">

                        {certificate.certificateImage && (

                          <button
                            className="view-btn"
                            onClick={() =>
                              openCertificate(
                                certificate.certificateImage
                              )
                            }
                          >
                            View
                          </button>

                        )}

                        <button
                          className="edit-btn"
                          onClick={() =>
                            editCertificate(
                              certificate
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteCertificate(
                              certificate.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}

        {/* =================================================
            INTERNSHIPS
        ================================================= */}

        {activeTab === "internships" && (

          <section className="page">

            <div className="page-header">

              <div>

                <p className="eyebrow">
                  CAREER EXPERIENCE
                </p>

                <h1>
                  Internships
                </h1>

              </div>

              <span className="count-badge">
                {internships.length} Internships
              </span>

            </div>

            {/* INTERNSHIP FORM */}

            <div className="form-card">

              <h2>
                {internshipEditId
                  ? "Edit Internship"
                  : "Add Internship"}
              </h2>

              <form onSubmit={saveInternship}>

                <div className="form-grid">

                  <div className="input-group">

                    <label>
                      Company Name
                    </label>

                    <input
                      name="companyName"
                      value={
                        internshipForm.companyName
                      }
                      onChange={
                        handleInternshipChange
                      }
                      placeholder="e.g. Microsoft"
                      required
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Student
                    </label>

                    <select
                      name="studentName"
                      value={
                        internshipForm.studentName
                      }
                      onChange={
                        handleInternshipChange
                      }
                      required
                    >

                      <option value="">
                        Select Student
                      </option>

                      {students.map((student) => (

                        <option
                          key={student.id}
                          value={student.studentName}
                        >
                          {student.studentName} -{" "}
                          {student.registerNumber}
                        </option>

                      ))}

                    </select>

                  </div>

                  <div className="input-group">

                    <label>
                      Role
                    </label>

                    <input
                      name="role"
                      value={
                        internshipForm.role
                      }
                      onChange={
                        handleInternshipChange
                      }
                      placeholder="e.g. Software Intern"
                      required
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      value={
                        internshipForm.status
                      }
                      onChange={
                        handleInternshipChange
                      }
                    >

                      <option value="Applied">
                        Applied
                      </option>

                      <option value="Interview">
                        Interview
                      </option>

                      <option value="Selected">
                        Selected
                      </option>

                      <option value="Ongoing">
                        Ongoing
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                    </select>

                  </div>

                  <div className="input-group">

                    <label>
                      Start Date
                    </label>

                    <input
                      type="date"
                      name="startDate"
                      value={
                        internshipForm.startDate
                      }
                      onChange={
                        handleInternshipChange
                      }
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      End Date
                    </label>

                    <input
                      type="date"
                      name="endDate"
                      value={
                        internshipForm.endDate
                      }
                      onChange={
                        handleInternshipChange
                      }
                    />

                  </div>

                  <div className="input-group full-width">

                    <label>
                      Internship URL
                    </label>

                    <input
                      type="url"
                      name="internshipUrl"
                      value={
                        internshipForm.internshipUrl
                      }
                      onChange={
                        handleInternshipChange
                      }
                      placeholder="https://..."
                    />

                  </div>

                </div>

                <div className="form-actions">

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    {internshipEditId
                      ? "Update Internship"
                      : "Save Internship"}
                  </button>

                  {internshipEditId && (

                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => {
                        setInternshipEditId(null);
                        setInternshipForm(
                          emptyInternship
                        );
                      }}
                    >
                      Cancel
                    </button>

                  )}

                </div>

              </form>

            </div>

            {/* INTERNSHIP TABLE */}

            <div className="table-card">

              <div className="table-header">

                <h2>
                  Internship Records
                </h2>

              </div>

              {internships.length === 0 ? (

                <div className="empty-state">
                  No internships found.
                </div>

              ) : (

                <div className="table-wrapper">

                  <table>

                    <thead>

                      <tr>

                        <th>
                          Company
                        </th>

                        <th>
                          Student
                        </th>

                        <th>
                          Role
                        </th>

                        <th>
                          Start Date
                        </th>

                        <th>
                          End Date
                        </th>

                        <th>
                          Status
                        </th>

                        <th>
                          Actions
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {internships.map(
                        (internship) => (

                          <tr
                            key={
                              internship.id
                            }
                          >

                            <td className="strong">
                              {
                                internship.companyName
                              }
                            </td>

                            <td>
                              {
                                internship.studentName
                              }
                            </td>

                            <td>
                              {
                                internship.role
                              }
                            </td>

                            <td>
                              {
                                internship.startDate
                              }
                            </td>

                            <td>
                              {
                                internship.endDate
                              }
                            </td>

                            <td>

                              <span
                                className={`status-pill ${(
                                  internship.status ||
                                  ""
                                )
                                  .toLowerCase()
                                  .replace(
                                    /\s+/g,
                                    "-"
                                  )}`}
                              >
                                {
                                  internship.status
                                }
                              </span>

                            </td>

                            <td>

                              <div className="action-buttons">

                                {internship.internshipUrl && (

                                  <button
                                    className="view-btn"
                                    onClick={() =>
                                      window.open(
                                        internship.internshipUrl,
                                        "_blank"
                                      )
                                    }
                                  >
                                    View
                                  </button>

                                )}

                                <button
                                  className="edit-btn"
                                  onClick={() =>
                                    editInternship(
                                      internship
                                    )
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  className="delete-btn"
                                  onClick={() =>
                                    deleteInternship(
                                      internship.id
                                    )
                                  }
                                >
                                  Delete
                                </button>

                              </div>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </section>

        )}

      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer>
        © 2026 SkillTrack · Track Your Skills. Showcase Your Growth.
      </footer>

    </div>
  );
}

export default App;