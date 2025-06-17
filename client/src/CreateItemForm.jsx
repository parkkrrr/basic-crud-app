import { useState } from "react";
function CreateItemForm({ onCreationSuccess }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(`${import.meta.env.API_BASE}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        setMessage("Item created successfully!");
        setMessageType("success");
        setName("");
        setDescription("");
        onCreationSuccess();
      } else {
        const errorData = await response.json();
        setMessage(
          `Error creating item: ${errorData.message || "Unknown error"}`
        );
        setMessageType("error");
      }
    } catch (error) {
      console.error("Network error creating item:", error);
      setMessage("Could not connect to the server or network error.");
      setMessageType("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Create New Item
      </h2>
      <div className="mb-4">
        <label
          htmlFor="itemName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Item Name:
        </label>
        <input
          type="text"
          id="itemName"
          className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item name"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="itemDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description:
        </label>
        <textarea
          id="itemDescription"
          rows="3"
          className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter item description"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add Item
      </button>
      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-sm ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}

export default CreateItemForm;
