import { useEffect, useState } from "react";
function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // Stores item being edited
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.API_BASE}/api/items`);
        if (response.ok) {
          const data = await response.json();
          setItems(data.items);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch items");
        }
      } catch (err) {
        console.error("Network error fetching items:", err);
        setError(
          "Could not connect to the server. Please check the backend connection."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(
        `${import.meta.env.API_BASE}/api/items/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setMessage("Item deleted successfully!");
        setMessageType("success");
        setItems(items.filter((item) => item._id !== id));
      } else {
        const errorData = await response.json();
        setMessage(
          `Error deleting item: ${errorData.message || "Unknown error"}`
        );
        setMessageType("error");
      }
    } catch (error) {
      console.error("Network error deleting item:", error);
      setMessage("Could not connect to the server or network error.");
      setMessageType("error");
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditDescription(item.description);
    setMessage("");
    setMessageType("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!editingItem) return;

    try {
      const response = await fetch(`/api/items/${editingItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editName, description: editDescription }),
      });

      if (response.ok) {
        setMessage("Item updated successfully!");
        setMessageType("success");
        setItems(
          items.map((item) =>
            item._id === editingItem._id
              ? { ...item, name: editName, description: editDescription }
              : item
          )
        );
        setEditingItem(null);
      } else {
        const errorData = await response.json();
        setMessage(
          `Error updating item: ${errorData.message || "Unknown error"}`
        );
        setMessageType("error");
      }
    } catch (error) {
      console.error("Network error updating item:", error);
      setMessage("Could not connect to the server or network error.");
      setMessageType("error");
    }
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingItem(null);
    setMessage("");
    setMessageType("");
  };

  if (loading)
    return (
      <div className="text-center p-8 text-gray-600">Loading items...</div>
    );
  if (error)
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  if (items.length === 0)
    return (
      <div className="text-center p-8 text-gray-600">
        No items found. Create one above!
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Your Items
      </h2>
      {message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item._id}
            className="p-4 border border-gray-200 rounded-md flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded-md text-sm transition duration-150 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-md text-sm transition duration-150 ease-in-out"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Item</h2>
            <div className="mb-4">
              <label
                htmlFor="editItemName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name:
              </label>
              <input
                type="text"
                id="editItemName"
                className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="editItemDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description:
              </label>
              <textarea
                id="editItemDescription"
                rows="3"
                className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default ItemList;
