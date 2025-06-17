import React from "react";

function DeleteItemButton({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Item deleted successfully!");
        onDeleteSuccess(itemId);
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
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-sm"
    >
      Delete
    </button>
  );
}
export default DeleteItemButton;
