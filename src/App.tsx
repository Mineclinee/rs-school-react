import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Repository } from './types/ServerAnswer.type';

type AppState = {
  searchTerm: string;
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
          <button onClick={() => this.setState({ hasError: false })}>
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
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
      results: [],
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    if (this.state.searchTerm) {
      this.fetchResults(this.state.searchTerm);
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
          throw new Error('Network response was not ok');
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
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm);
    this.fetchResults(searchTerm);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm, results, loading, error } = this.state;

    return (
      <ErrorBoundary>
        <div className="app">
          <div className="app__info">
            <h1 className="app__title">Search for repositories in GitHub 👨‍💻</h1>
            <p className="app__descr">
              Enter a name and get the first 50 results in the format: "Account
              Name/Repository".
            </p>
          </div>
          <div className="app__search">
            <input
              className="form-field__input input-reset"
              placeholder="Enter a repository"
              type="text"
              value={searchTerm}
              onChange={this.handleInputChange}
            />
            <button
              onClick={this.handleSearch}
              className="primary-btn btn-reset"
            >
              Search
            </button>
          </div>
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
                        {result.full_name}
                      </li>
                    ))
                  : !loading && <li>No results found 🥺</li>}
              </ul>
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
