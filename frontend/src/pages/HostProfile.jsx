import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddBoarding from "../components/addBoarding";
import ListBoarding from "../components/listBoarding";

const HostProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showSignOutPrompt, setShowSignOutPrompt] = useState(false);
  const navigate = useNavigate();

  const fetchHostProfile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5500/api/user/host-profile",
        {},
        { headers: { token: localStorage.getItem("token") } }
      );

      if (response.data.success) {
        setName(response.data.data.username);
        setEmail(response.data.data.email);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchHostProfile();
  }, []);

  const handleSignOut = () => {
    setShowSignOutPrompt(true);
  };

  const confirmSignOut = () => {
    localStorage.removeItem("token");
    toast.success("Signed out successfully!");
    navigate("/sign-in");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "3rem 2rem",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        {/* Left - Profile Info */}
        <div
          style={{
            flex: 1,
            paddingRight: "2rem",
            textAlign: "center",
          }}
        >
          <img
            src="https://i.pravatar.cc/200?img=12"
            alt="Host Avatar"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
          <h3 style={{ margin: "0.5rem 0", color: "#2c3e50" }}>
            {name || "Your Name"}
          </h3>
          <p style={{ color: "#7f8c8d" }}>{email || "your@email.com"}</p>

          {localStorage.getItem("token") ? (
            <button
              onClick={handleSignOut}
              style={{
                marginTop: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background 0.3s",
              }}
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => navigate("/sign-in")}
              style={{
                marginTop: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "#2ecc71",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background 0.3s",
              }}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "2px",
            backgroundColor: "#ccc",
            height: "100vh",
            margin: "0 2rem",
          }}
        ></div>

        {/* Right - AddBoarding */}
        <div style={{ flex: 2 }}>
          <h2 style={{ marginBottom: "1rem", color: "#333" }}>
            Your Boarding Details
          </h2>
          <AddBoarding />
          <ListBoarding />
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutPrompt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#333" }}>Sign Out?</h3>
            <p style={{ marginBottom: "1.5rem", color: "#555" }}>
              Are you sure you want to sign out?
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={confirmSignOut}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                  marginRight: "0.5rem",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowSignOutPrompt(false)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#bdc3c7",
                  color: "#2c3e50",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HostProfile;
