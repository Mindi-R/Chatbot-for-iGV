import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddBoarding = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    cost: "",
    type: "",
    availableCount: "",
    description: "",
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5500/api/boarding/add-boarding",
        formData,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response.data);

      if (response.data.success) {
        try {
          setFormData({
            address: "",
            cost: "",
            type: "",
            availableCount: "",
            description: "",
          });
          setShowForm(false);
          toast.success("Boarding place added successfully!");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error("Error adding boarding:", error);
      toast.error("Failed to add boarding. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={toggleForm}
        style={{
          padding: "0.6rem 1.2rem",
          backgroundColor: isHovered ? "#c5ab6f" : "#d4bf95",
          color: "black",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
          marginBottom: "1rem",
          transition:
            "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isHovered
            ? "0px 4px 12px rgba(0, 0, 0, 0.2)"
            : "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Add Boarding Places
      </button>

      {/* Modal Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#fefefe",
              padding: "2rem",
              borderRadius: "16px",
              width: "90%",
              maxWidth: "500px",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <h2 style={{ textAlign: "center", color: "#333" }}>
              Add Boarding Place
            </h2>

            <input
              type="text"
              name="address"
              placeholder="Boarding Address"
              value={formData.address}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="number"
              name="cost"
              placeholder="Cost Per Person"
              value={formData.cost}
              onChange={handleChange}
              required
              min="0"
              style={inputStyle}
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Type</option>
              <option value="Annex">Annex</option>
              <option value="Boarding Rooms">Boarding Rooms</option>
              <option value="Apartment">Apartment</option>
            </select>
            <input
              type="number"
              name="availableCount"
              placeholder="Available Bed Count"
              value={formData.availableCount}
              onChange={handleChange}
              required
              min="0"
              style={inputStyle}
            />
            <textarea
              name="description"
              placeholder="Add a small description about your boarding place"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              style={{ ...inputStyle, resize: "vertical" }}
            ></textarea>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <button type="submit" style={submitButtonStyle}>
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const inputStyle = {
  padding: "0.8rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
  width: "100%",
};

const submitButtonStyle = {
  padding: "0.6rem",
  backgroundColor: "#27ae60",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
  flex: 1,
};

const cancelButtonStyle = {
  padding: "0.6rem",
  backgroundColor: "#e0e0e0",
  color: "#333",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
  flex: 1,
};

export default AddBoarding;
