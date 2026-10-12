import "./App.css";
import { useEffect, useState } from "react";
import type { Tenant } from "./types/Tenant";

const API_URL = "http://localhost:8080/api/v1/tenants";

function App() {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const fetchTenants = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to load tenants.");
    }

    const data: Tenant[] = await response.json();
    setTenants(data);
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setMessage("");
    setMessageType("");

    const tenant = {
      firstName,
      lastName,
      email,
      phone,
    };

    try {
      const response = await fetch(
        editingId === null
          ? API_URL
          : `${API_URL}/${editingId}`,
        {
          method: editingId === null ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tenant),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to save tenant.");
      }

      await response.json();

      setMessage(
        editingId === null
          ? "Tenant added successfully."
          : "Tenant updated successfully."
      );
      setMessageType("success");

      await fetchTenants();
      clearForm();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save tenant."
      );
      setMessageType("error");
    }
  };

  const handleEdit = (tenant: Tenant) => {
    console.log("Editing tenant:", tenant);
    setEditingId(tenant.id);
    setFirstName(tenant.firstName);
    setLastName(tenant.lastName);
    setEmail(tenant.email);
    setPhone(tenant.phone);
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchTenants();
    });
  };

  const clearForm = () => {
    setEditingId(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (phone.length < 10 || phone.length > 15) {
      newErrors.phone = "Phone must be between 10 and 15 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>SkyLine</h1>
          <span>Tenant Management System</span>
        </div>
      </header>

      <main className="container">

        <div className="page-header">
          <div>
            <h2>Tenants</h2>
            <p>Manage your tenants and their contact information.</p>
          </div>

          <button
            className="primary-button"
            onClick={clearForm}
          >
            + Add Tenant
          </button>
        </div>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="card">

          <div className="card-header">
            <h3>
              {editingId === null ? "Add Tenant" : "Edit Tenant"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="tenant-form">

            <div className="form-group">
              <label>First Name</label>
              <input
                value={firstName}
                onChange={(event) =>
                  setFirstName(event.target.value)
                }
                placeholder="Enter first name"
              />

              {errors.firstName && (
                <span className="error-message">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                value={lastName}
                onChange={(event) =>
                  setLastName(event.target.value)
                }
                placeholder="Enter last name"
              />

              {errors.lastName && (
                <span className="error-message">
                  {errors.lastName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="error-message">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="Enter phone"
              />
              {errors.phone && (
                <span className="error-message">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingId === null ? "Add Tenant" : "Update Tenant"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>

        <div className="card">

          <div className="card-header">
            <div>
              <h3>Tenant List</h3>
              <p>{tenants.length} tenant(s)</p>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td>
                      <strong>
                        {tenant.firstName} {tenant.lastName}
                      </strong>
                    </td>

                    <td>{tenant.email}</td>

                    <td>{tenant.phone}</td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(tenant)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(tenant.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </main>
    </div>
  );
}

export default App;