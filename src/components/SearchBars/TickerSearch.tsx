import React, { Dispatch, SetStateAction, useState } from "react";

interface TickerSearchProp {
  ticker: string;
  setTicker: Dispatch<SetStateAction<string>>;
}

const TickerSearch: React.FC<TickerSearchProp> = ({ ticker, setTicker }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toUpperCase());
  };
  const [searchTerm, setSearchTerm] = useState(ticker);

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search term:", ticker);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //TODO: error checking if valid input
      setTicker(searchTerm);
    }
  };

  return (
    <input
      type="text"
      className="border border-violet-600 rounded-lg m-2 px-4 py-2 bg-black text-white"
      placeholder="Search ticker..."
      value={searchTerm}
      onKeyDown={handleSubmit}
      onChange={handleInputChange}
    />
  );
};

export default TickerSearch;
