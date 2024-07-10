import { Component, ChangeEvent } from 'react';
import { Repository } from './types/ServerAnswer.type';
import Header from './components/header/Header';
import SearchForm from './components/search/Search';
import ResultsList from './components/resultList/ResultList';
import Loader from './components/loader/Loader';
import ErrorMessage from './components/errorMessage/ErrorMessage';

type AppState = {
  searchRepo: string;
  results: Repository[];
  loading: boolean;
  error: boolean;
  throwError: boolean;
  hasSearched: boolean;
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const savedSearchRepo = localStorage.getItem('searchRepo') || '';
    this.state = {
      searchRepo: savedSearchRepo,
      results: [],
      loading: false,
      error: false,
      throwError: false,
      hasSearched: false,
    };
  }

  componentDidMount() {
    if (this.state.searchRepo) {
      this.fetchResults(this.state.searchRepo);
    } else {
      this.fetchResults('a');
    }
  }

  handleThrowError = () => {
    this.setState({ throwError: true });
  };

  fetchResults = (query: string) => {
    this.setState({ loading: true, error: false, hasSearched: true });
    fetch(
      `https://api.github.com/search/repositories?q=${query}&per_page=50&page=1`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response wasn't ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ results: data.items || [], loading: false });
      })
      .catch((error) => {
        console.error('Error fetching results:', error);
        this.setState({ error: true, loading: false });
      });
  };

  handleSearch = () => {
    const { searchRepo } = this.state;
    localStorage.setItem('searchRepo', searchRepo);
    this.fetchResults(searchRepo);
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || /^[^\s]+$/.test(event.target.value)) {
      this.setState({ searchRepo: event.target.value });
    }
  };

  render() {
    const { searchRepo, results, loading, error, hasSearched } = this.state;

    if (this.state.throwError === true) {
      throw new Error('Call an error');
    }

    return (
      <main className="app">
        <Header />
        <SearchForm
          searchRepo={searchRepo}
          handleInputChange={this.handleInputChange}
          handleSearch={this.handleSearch}
        />
        <div className="app__results">
          {loading && <Loader />}
          {error ? (
            <ErrorMessage />
          ) : (
            <ResultsList results={results} hasSearched={hasSearched} />
          )}
        </div>
        <button
          onClick={this.handleThrowError}
          className="app__throw btn-reset primary-btn primary-btn--invalid"
        >
          Throw an Error
        </button>
      </main>
    );
  }
}

export default App;
