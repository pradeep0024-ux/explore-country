import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./styles/CountryListStyle.css";
import InfiniteScroll from "react-infinite-scroll-component";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCountries, setVisibleCountries] = useState([]);
  const itemsPerPage = 10;

  const fetchCountry = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setCountries(data.slice(0, 50)); 
    setFiltered(data.slice(0, 50));
    setVisibleCountries(data.slice(0, itemsPerPage)); 
  };

  const fetchMoreCountry = () => {
    const nextPage = currentPage + 1;
    const source = searchInput ? filtered : countries; 
    const nextVisibleCountries = source.slice(0, nextPage * itemsPerPage);
    setVisibleCountries(nextVisibleCountries);
    setCurrentPage(nextPage);
  };

  const handleFilter = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);

    if (input === "") {
      setFiltered(countries);
      setVisibleCountries(countries.slice(0, itemsPerPage));
      setCurrentPage(1);
    } else {
      const filteredData = countries.filter((item) =>
        item.name.common.toLowerCase().includes(input)
      );
      setFiltered(filteredData);
      setVisibleCountries(filteredData.slice(0, itemsPerPage));
      setCurrentPage(1);
    }
  };

  const handleClearFilter = () => {
    setSearchInput("");
    setFiltered(countries);
    setVisibleCountries(countries.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <div className="country-list-container">
      <h1 className="title">Explore Countries</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search country..."
          value={searchInput}
          onChange={handleFilter}
        />
        {searchInput && (
          <button className="clear-filter" onClick={handleClearFilter}>
            Clear Filter
          </button>
        )}
      </div>
      <InfiniteScroll
        dataLength={visibleCountries.length}
        next={fetchMoreCountry}
        hasMore={
          searchInput
            ? visibleCountries.length < filtered.length
            : visibleCountries.length < countries.length
        }
        loader={<h4>Loading...</h4>}
        endMessage={<h2>End of the Data</h2>}
      >
        {visibleCountries?.length > 0 ? (
          <div className="list-container">
            {visibleCountries.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        ) : (
          <h1 className="no-data">Oops! Data is not available</h1>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default CountryList;
