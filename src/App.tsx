import React, { useState, useEffect } from 'react';
import { Repository } from './types/ServerAnswer.type';
import Header from './components/header/Header';
import SearchForm from './components/search/Search';
import ResultsList from './components/resultList/ResultList';
import Loader from './components/loader/Loader';
import ErrorMessage from './components/errorMessage/ErrorMessage';
import Pagination from './components/pagination/Pagination';
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';

const App = () => {
  const [searchRepo, setSearchRepo] = useState('');
  const [results, setResults] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearchRepo = localStorage.getItem('searchRepo') || '';
    const savedPage = localStorage.getItem('page');
    const pageNumber = savedPage ? parseInt(savedPage, 10) : 1;
    const detailsParam = searchParams.get('details');

    setPage(pageNumber);

    if (savedSearchRepo) {
      setSearchRepo(savedSearchRepo);
      fetchResults(savedSearchRepo, pageNumber);
    } else {
      fetchResults('a', pageNumber);
    }

    if (detailsParam) {
      navigate(`/details/${detailsParam}`, { replace: true });
    }
  }, [searchParams, navigate]);

  const fetchResults = (query: string, pageNumber: number) => {
    if (!query) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    fetch(
      `https://api.github.com/search/repositories?q=${query}&per_page=12&page=${pageNumber}`,
      {
        headers: {
          authorization: `token ${import.meta.env.VITE_API_KEY}`,
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
        setTotalCount(data.total_count);
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
    setPage(1);
    localStorage.setItem('page', '1');
    setSearchParams({ page: '1' });
    fetchResults(searchRepo, 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || /^[^\s]+$/.test(event.target.value)) {
      setSearchRepo(event.target.value);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    localStorage.setItem('page', newPage.toString());
    setSearchParams({ page: newPage.toString() });
    fetchResults(searchRepo, newPage);
  };

  const handleRepoClick = (id: number) => {
    localStorage.setItem('page', page.toString());
    navigate(`/details/${id}`);
  };

  return (
    <main className="app grid">
      <div className="app__left">
        <div className="app__aside">
          <Header />
          <SearchForm
            searchRepo={searchRepo}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
          />
        </div>
        <div className="app__content">
          <div className="app__results">
            {loading && <Loader />}
            {error ? (
              <ErrorMessage />
            ) : (
              <>
                <ResultsList results={results} onRepoClick={handleRepoClick} />
                <Pagination
                  currentPage={page}
                  totalCount={totalCount}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="app__right">
        <Outlet />
      </div>
    </main>
  );
};

export default App;
