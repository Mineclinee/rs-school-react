import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Repository } from '../../types/ServerAnswer.type';

const RepoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [repo, setRepo] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRepoDetails(Number(id));
    }
  }, [id]);

  const fetchRepoDetails = (repoId: number) => {
    setLoading(true);
    setError(false);

    fetch(`https://api.github.com/repositories/${repoId}`, {
      headers: {
        authorization: `token ${import.meta.env.VITE_API_KEY}`,
      },
    })
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

  return (
    <div className="app__repo-details details">
      {loading && <Loader />}
      {error && <ErrorMessage />}
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
