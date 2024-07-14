import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Repository } from '../../types/ServerAnswer.type';

const RepoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [repo, setRepo] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchRepoDetails(Number(id));
    }
  }, [id]);

  const fetchRepoDetails = (repoId: number) => {
    setLoading(true);
    setError(false);

    fetch(`https://api.github.com/repositories/${repoId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response wasn't ok");
        }
        return response.json();
      })
      .then((data) => {
        setRepo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching repo details:', error);
        setError(true);
        setLoading(false);
      });
  };

  const handleClose = () => {
    navigate(`/?page=${localStorage.getItem('page')}`);
  };

  return (
    <div className="app__repo-details details">
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <button className="details__close btn-reset" onClick={handleClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          fill="#fff"
          version="1.1"
        >
          <path
            d="M176.662 817.173c-8.19 8.471-7.96 21.977 0.51 30.165 8.472 8.19 21.978 7.96 30.166-0.51l618.667-640c8.189-8.472 7.96-21.978-0.511-30.166-8.471-8.19-21.977-7.96-30.166 0.51l-618.666 640z"
            fill=""
          />
          <path
            d="M795.328 846.827c8.19 8.471 21.695 8.7 30.166 0.511 8.471-8.188 8.7-21.694 0.511-30.165l-618.667-640c-8.188-8.471-21.694-8.7-30.165-0.511-8.471 8.188-8.7 21.694-0.511 30.165l618.666 640z"
            fill=""
          />
        </svg>
      </button>
      {repo && !loading && !error && (
        <>
          <img
            className="details__img"
            src={repo.owner.avatar_url}
            alt={repo.description}
          />
          <h2 className="details__item">Repo name: {repo.name}</h2>
          <p className="details__item">Auth name: {repo.owner.login}</p>
          <p className="details__item">Description: {repo.description}</p>
          <p className="detais__item">Created at: {repo.created_at}</p>
          <p className="detais__item">Updated at: {repo.updated_at}</p>
          <p className="detais__item">Language: {repo.language}</p>
          <p className="detais__item">Stars: {repo.stargazers_count}</p>
          <p className="detais__item">Forks: {repo.forks_count}</p>
          <p className="detais__item">Open issues: {repo.open_issues}</p>
          <a
            className="detais__item details__link"
            href={repo.html_url}
            target="_blank"
          >
            View on GitHub
          </a>
        </>
      )}
    </div>
  );
};

export default RepoDetails;
