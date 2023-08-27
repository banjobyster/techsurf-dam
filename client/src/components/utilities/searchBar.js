import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParam } from "../../state";
import { Chip } from "@mui/material";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const searchParam = useSelector((state) => state.searchParam);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchParam({ searchParam: searchValue }));
    setSearchValue("");
  };

  return (
    <div
      style={{
        marginRight: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <form id="search-form" onSubmit={handleSubmit}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={handleSubmit}
                style={{ cursor: "pointer" }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
      {searchParam && (
        <Chip
          label={`${searchParam}`}
          onDelete={() => dispatch(setSearchParam({ searchParam: null }))}
        />
      )}
    </div>
  );
}

export default SearchBar;
