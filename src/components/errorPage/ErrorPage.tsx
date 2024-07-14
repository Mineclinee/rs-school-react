import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => (
  <main className="main">
    <section className="not-found-section">
      <div className="container">
        <h1 className="not-found-section__title visually-hidden">
          Page not found
        </h1>
        <div className="not-found-section__text">404</div>
        <div className="not-found-section__descr">
          You've come to the wrong place! You can go back to the{' '}
          <Link to="/">main page</Link>
        </div>
      </div>
    </section>
  </main>
);

export default ErrorPage;
