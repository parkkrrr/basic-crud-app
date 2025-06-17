import React, { useState, useEffect } from "react";
function EditItemForm({ itemId, initialData, onUpdateSuccess }) {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.API_BASE}/api/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      if (response.ok) {
        alert("Item updated successfully!");
        onUpdateSuccess();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-yellow-100 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Edit Item</h2>
      <div className="mb-2">
        <label
          htmlFor="edit-name"
          className="block text-sm font-medium text-gray-700"
        >
          Name:
        </label>
        <input
          type="text"
          id="edit-name"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="edit-description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="edit-description"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Update Item
      </button>
    </form>
  );
}
export default EditItemForm;
