import React from 'react';
import { Repository } from '../../types/ServerAnswer.type';
import { useNavigate } from 'react-router-dom';

type ResultsListProps = {
  results: Repository[];
  onRepoClick: (id: number) => void;
};

const ResultsList: React.FC<ResultsListProps> = ({ results, onRepoClick }) => {
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    onRepoClick(id);
    navigate(`details/${id}?page=${localStorage.getItem('page')}`);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (!(event.target as HTMLElement).classList.contains('app__repo-descr')) {
      event.stopPropagation();
      navigate(`/?page=${localStorage.getItem('page')}`);
    }
  };

  return (
    <ul className="app__list list-reset" onClick={handleOutsideClick}>
      {results && results.length > 0 ? (
        results.map((result) => (
          <li
            className="app__item"
            key={result.id}
            onClick={() => handleClick(result.id)}
          >
            <span className="app__repo-link">
              <img
                src={result.owner.avatar_url}
                alt={`${result.owner.login}'s avatar`}
                className="app__avatar"
              />
            </span>
            <p className="app__repo-descr">{result.full_name}</p>
          </li>
        ))
      ) : (
        <li>No results found 🥺</li>
      )}
    </ul>
  );
};

export default ResultsList;
