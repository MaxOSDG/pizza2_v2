import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="120" r="110" />
    <rect x="4" y="258" rx="0" ry="0" width="280" height="27" />
    <rect x="136" y="311" rx="0" ry="0" width="3" height="2" />
    <rect x="0" y="307" rx="10" ry="10" width="280" height="88" />
    <rect x="120" y="417" rx="30" ry="30" width="152" height="45" />
    <rect x="12" y="425" rx="6" ry="6" width="90" height="27" />
  </ContentLoader>
);

export default MyLoader;
