import s from './app.module.scss';

export const App = () => {
  return (
    <main className={s.app}>
      <h1>favorit-parts-search</h1>
      <p>Поиск автозапчастей, аналогов и складских предложений.</p>
    </main>
  );
};
