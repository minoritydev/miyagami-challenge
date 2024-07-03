


"use client"
import { useState, useEffect} from "react";
import Loading from "./components/loading";
import Image from "next/image";


// This is the main component for the Home page of the application, it is a single page app. 
// It uses React hooks for state management and makes use of the Next.js APP router  to fetch data.
export default function Home() {
  // State variables for the layout, data, loading status, search term, and dark mode state
  const [isGrid, setIsGrid] = useState(true); // Whether to display the items in a grid or list
  const [data, setData] = useState([]); // The data fetched from the API
  const [loading, setLoading] = useState(true); // Whether the data is being loaded
  const [searchTerm, setSearchTerm] = useState(""); // The current search term entered by the user
  const [dark, setDark] = useState(false); // Whether dark mode is enabled

  // Function to toggle the layout between grid and list
  const toggleLayout = () => {
    setIsGrid(!isGrid); // Toggle the isGrid state
    console.log("Clicked"); // Log a message to the console
  };

  // Function to toggle the dark mode
  const toggleTheme = () => {
    setDark(!dark); // Toggle the dark state
    document.body.classList.toggle('dark'); // Toggle the dark class on the body element
  };

  // Function to fetch the data from the API and update the state
  const loadImages = () => {
    fetch("/api/getFeed", { cache: "no-store" }) // Fetch the data from the API, dont cache the response as updates are frequent
      .then(res => res.json()) // Parse the response as JSON
      .then(data => {
        setData(data.items); // Update the data state with the fetched items
        setLoading(false); // Set the loading state to false
      });
  };

  // Function to handle the change event of the search input
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update the search term state with the new value
  };

  // Function to handle the form submission for searching
  const handleSearch = (tags: React.FormEvent<HTMLFormElement>) => {
    tags.preventDefault(); // Prevent the default form submission behavior
    fetch("/api/getFeed?tags=" + searchTerm, { cache: "no-store" }) // Fetch the data from the API with the search term
      .then(res => res.json()) // Parse the response as JSON
      .then(data => {
        setData(data.items); // Update the data state with the fetched items
        setLoading(false); // Set the loading state to false
      });
  };

  // Effect hook to fetch the data when the component mounts
  useEffect(() => {
    setLoading(true); // Set the loading state to true
    loadImages(); // Fetch the data from the API
  }, []);

  // If the data is still being loaded, show a loading component
  if (loading) return (<Loading />);

  // Render the Home component with the fetched data and state variables
  return (
    <main>
      <div className="dark:bg-gray-900 bg-gray-300">
        <div className="dark:bg-gray-900 bg-gray-100 sm:flex justify-center mx-auto max-w-7xl drop-shadow-lg sticky top-0 sm:p-5">
          <button onClick={toggleLayout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {isGrid ? 'Switch to List' : 'Switch to Grid'}
          </button>
          <button onClick={loadImages} className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-4 dark:bg-blue-600 dark:hover:bg-blue-700">
            Refresh
          </button>
          <form onSubmit={handleSearch} className="inline-block mx-auto">
            <input className="w-1/2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={searchTerm}
              onChange={changeHandler}
              placeholder="Search..."
            />
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
              Search
            </button>
          </form>
          <button onClick={toggleTheme} className="rounded-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 dark:bg-gray-200 dark:hover:bg-gray-400">
            <img className=""
              alt={dark ? "Switch to Dark Mode" : "Switch to Light Mode"}
              src={dark ? "/images/lightMode.png" : "/images/darkMode.png"}
              width={30}
              height={30}
              loading="eager"
            />
          </button>
        </div>
        <div className="dark:bg-gray-900 bg-gray-100 max-w-7xl mx-auto">
          <div className={isGrid ? "columns-2 md:columns-5 mx-auto space-y-4" : "list-none flex items-center justify-center flex-col gap-4"}>
            {data.map((item: any) => (
              <div key={item.link} className="gap-2 border-4 border-gray-800 dark:border-gray-300 overflow-hidden">
                <img className=""
                  alt={item.title}
                  src={item.media.m}
                  width={600}
                  height={400}
                  loading="lazy"
                />
                <span className="text-center">
                  <p className={item.title === ' ' ? "dark:bg-gray-300 dark:text-gray-300 bg-gray-800 text-gray-800 " : "dark:bg-gray-300 dark:text-black bg-gray-800 text-white break-words"}>
                    {item.title === ' ' ? "Untitled" : item.title}
                  </p>
                </span>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </main>
  );
}
// The header is not responsive for screens < 640px width, didn't have time to do it . 