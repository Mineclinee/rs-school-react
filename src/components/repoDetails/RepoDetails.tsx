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
    <div className="repo-details">
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {repo && !loading && !error && (
        <div>
          <h2>{repo.full_name}</h2>
          <p>{repo.description}</p>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default RepoDetails;
