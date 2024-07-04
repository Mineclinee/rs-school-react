import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Repository } from './types/ServerAnswer.type';

type AppState = {
  searchRepo: string;
  results: Repository[];
  loading: boolean;
  error: boolean;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong.
          <button
            className="btn-reset primary-btn"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </h1>
      );
    }

    return this.props.children;
  }
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const savedSearchRepo = localStorage.getItem('searchRepo') || '';
    this.state = {
      searchRepo: savedSearchRepo,
      results: [],
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    if (this.state.searchRepo) {
      this.fetchResults(this.state.searchRepo);
    }
  }

  fetchResults = (query: string) => {
    this.setState({ loading: true, error: false });
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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchRepo: event.target.value });
  };

  render() {
    const { searchRepo, results, loading, error } = this.state;

    return (
      <ErrorBoundary>
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
                {results && results.length > 0 ? (
                  results.map((result) => (
                    <li className="app__item" key={result.id}>
                      {result.full_name}
                    </li>
                  ))
                ) : (
                  <li>No results found 🥺</li>
                )}
              </ul>
            )}
          </div>
        </main>
      </ErrorBoundary>
    );
  }
}

export default App;
