import React, { Component, ChangeEvent, FormEvent } from 'react';

type SearchFormProps = {
  searchRepo: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
};

class SearchForm extends Component<SearchFormProps> {
  onSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.handleSearch();
  };

  render() {
    const { searchRepo, handleInputChange } = this.props;
    return (
      <form className="app__form" onSubmit={this.onSubmit}>
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
  }
}

export default SearchForm;
