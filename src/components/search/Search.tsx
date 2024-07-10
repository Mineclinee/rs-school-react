import React, { ChangeEvent, FormEvent } from 'react';

type SearchFormProps = {
  searchRepo: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
};

const SearchForm: React.FC<SearchFormProps> = ({
  searchRepo,
  handleInputChange,
  handleSearch,
}) => {
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <form className="app__form" onSubmit={onSubmit}>
      <input
        className="form-field__input input-reset"
        placeholder="Enter a repository"
        type="text"
        value={searchRepo}
        onChange={handleInputChange}
      />
      <button type="submit" className="primary-btn btn-reset">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
