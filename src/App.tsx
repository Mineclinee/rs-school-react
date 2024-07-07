import { Component, ChangeEvent } from 'react';
import { Repository } from './types/ServerAnswer.type';

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
    const token =
      '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';
    fetch(
      `https://api.github.com/search/repositories?q=${query}&per_page=50&page=1`,
      {
        headers: {
          authorization: `token ${token}`,
        },
      }
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
        <div className="app__info">
          <h1 className="app__title">Search for repositories in GitHub 👨‍💻</h1>
          <p className="app__descr">
            Enter a name and get the first 50 results in the format: "Account
            Name/Repository".
          </p>
        </div>
        <search className="app__search">
          <form className="app__form">
            <input
              className="form-field__input input-reset"
              placeholder="Enter a repository"
              type="text"
              value={searchRepo}
              onChange={this.handleInputChange}
            />
            <button
              onClick={this.handleSearch}
              className="primary-btn btn-reset"
            >
              Search
            </button>
          </form>
        </search>
        <div className="app__results">
          {loading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
          {error ? (
            <p className="app__error">Error loading results. 😿</p>
          ) : (
            <ul className="app__list list-reset">
              {results && results.length > 0
                ? results.map((result) => (
                    <li className="app__item" key={result.id}>
                      <a
                        className="app__repo-link"
                        href={result.html_url}
                        target="_blank"
                      >
                        <img
                          src={result.owner.avatar_url}
                          alt={`${result.owner.login}'s avatar`}
                          className="app__avatar"
                        />
                      </a>
                      <p className="app__repo-descr">{result.full_name}</p>
                    </li>
                  ))
                : hasSearched && <li>No results found 🥺</li>}
            </ul>
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
