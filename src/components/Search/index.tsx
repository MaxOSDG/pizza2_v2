import React from 'react';
import debounce from 'lodash.debounce';

import styles from './search.module.scss';

import { SearchContext } from '../../App';

const Search: React.FC = () => {
  // console.log(searchValue);
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChangeV(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeV = React.useCallback(
    debounce((str) => {
      console.log(str);
      setSearchValue(str);
    }, 300),
    [],
  );

  const onClickClear = () => {
    setValue('');
    setSearchValue('');
    // document.querySelector('input').focus();
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="512px"
        id="Layer_1"
        // style="enable-background:new 0 0 512 512;"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <svg
          onClick={() => onClickClear()}
          className={styles.icon2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
