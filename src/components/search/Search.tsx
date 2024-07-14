import React from 'react';

type SearchFormProps = {
  searchRepo: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
};

const SearchForm: React.FC<SearchFormProps> = ({
  searchRepo,
  handleInputChange,
  handleSearch,
}) => (
  <form
    className="app__form"
    onSubmit={(e) => {
      e.preventDefault();
      handleSearch();
    }}
  >
    <input
      type="text"
      value={searchRepo}
      onChange={handleInputChange}
      placeholder="Enter repo name"
      className="form-field__input input-reset"
    />
    <button type="submit" className="btn-reset primary-btn">
      Search
    </button>
  </form>
);

export default SearchForm;
