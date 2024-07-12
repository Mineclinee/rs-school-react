import React from 'react';
import { Repository } from '../../types/ServerAnswer.type';

type ResultsListProps = {
  results: Repository[];
};

const ResultsList: React.FC<ResultsListProps> = ({ results }) => (
  <ul className="app__list list-reset">
    {results && results.length > 0 ? (
      results.map((result) => (
        <li className="app__item" key={result.id}>
          <a className="app__repo-link" href={result.html_url} target="_blank">
            <img
              src={result.owner.avatar_url}
              alt={`${result.owner.login}'s avatar`}
              className="app__avatar"
            />
          </a>
          <p className="app__repo-descr">{result.full_name}</p>
        </li>
      ))
    ) : (
      <li>No results found 🥺</li>
    )}
  </ul>
);

export default ResultsList;
