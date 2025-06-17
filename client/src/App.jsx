import { useState } from "react";
import CreateItemForm from "./CreateItemForm";
import ItemList from "./ItemList";

function App() {
  const [refreshList, setRefreshList] = useState(false);

  const handleRefresh = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-inter antialiased flex flex-col items-center">
      <header className="text-center mb-10 mt-4">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-3 drop-shadow-lg">
          Basic CRUD App
        </h1>
        <p className="text-xl text-gray-600">
          Create, Read, Update, and Delete Your Data
        </p>
      </header>

      <main className="container mx-auto w-full max-w-3xl space-y-10">
        <section className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CreateItemForm onCreationSuccess={handleRefresh} />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <ItemList key={refreshList} />
        </section>
      </main>

      <footer className="text-center mt-16 text-gray-500 text-base">
        <p>
          &copy; {new Date().getFullYear()} CRUD App Demo |{" "}
          <a target="_blank" className="hover:text-blue-800 hover:font-bold" href="https://github.com/parkkrrr">
            Github
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
