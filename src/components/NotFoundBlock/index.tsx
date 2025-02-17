import React from 'react';

import style from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={style.root}>
      <span>😕</span> <br />
      Ничего не найдено
    </h1>
  );
};

export default NotFoundBlock;
