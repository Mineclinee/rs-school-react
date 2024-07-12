import React, { useState, useEffect } from 'react';
import { Repository } from './types/ServerAnswer.type';
import Header from './components/header/Header';
import SearchForm from './components/search/Search';
import ResultsList from './components/resultList/ResultList';
import Loader from './components/loader/Loader';
import ErrorMessage from './components/errorMessage/ErrorMessage';

const App = () => {
  const [searchRepo, setSearchRepo] = useState('');
  const [results, setResults] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [throwError, setThrowError] = useState(false);

  useEffect(() => {
    const savedSearchRepo = localStorage.getItem('searchRepo') || '';
    if (savedSearchRepo) {
      fetchResults(savedSearchRepo);
    } else {
      fetchResults('a');
    }
  }, []);

  const fetchResults = (query: string) => {
    setLoading(true);
    setError(false);
    fetch(
      `https://api.github.com/search/repositories?q=${query}&per_page=50&page=1`,
      {
        headers: {
          authorization:
            'token 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',
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
        setResults(data.items || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching results:', error);
        setError(true);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    localStorage.setItem('searchRepo', searchRepo);
    fetchResults(searchRepo);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || /^[^\s]+$/.test(event.target.value)) {
      setSearchRepo(event.target.value);
    }
  };

  const handleThrowError = () => {
    setThrowError(true);
    if (throwError) {
      throw new Error('Call an error');
    }
  };

  return (
    <main className="app">
      <Header />
      <SearchForm
        searchRepo={searchRepo}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
      <div className="app__results">
        {loading && <Loader />}
        {error ? <ErrorMessage /> : <ResultsList results={results} />}
      </div>
      <button
        onClick={handleThrowError}
        className="app__throw btn-reset primary-btn primary-btn--invalid"
      >
        Throw an Error
      </button>
    </main>
  );
};

export default App;
