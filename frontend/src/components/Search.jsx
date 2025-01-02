import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "./ui/input";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <>
      <form
        onSubmit={searchHandler}
        className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
      >
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Courses"
          className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <Button
          type="submit"
          className="bg-primary dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-primary-600 dark:hover:bg-blue-800"
        >
          Search
        </Button>
      </form>
    </>
  );
}

export default Search;
