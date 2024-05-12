import React from 'react';
// import axios from 'axios';
import qs from 'qs';

import Categories from '../components/categories';
import Sort from '../components/sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import SceletonPizzaBlock from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { useSelector } from 'react-redux';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  // const [pizzaArray, setPizzaArray] = React.useState([]);
  // const [isLoading, setIsLoaing] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const sortType = useSelector((state: RootState) => state.filter.sort.sortProperty);
  const pageCount = useSelector((state: RootState) => state.filter.pageCount);
  const pizzaArray = useSelector((state: RootState) => state.pizzas.items);
  const pizzaLoadStatus = useSelector((state: RootState) => state.pizzas.status);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickCategoryId = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      console.log(window.location.search);
      const params = qs.parse(window.location.search.substring(1));
      const sort = {
        name: '',
        sortProperty: params.sortType,
      };
      delete params.sortType;
      params.sort = sort;

      dispatch(setFilters({ ...params }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPizza = async () => {
    // setIsLoaing(true);
    // console.log('8888888888888', isLoading);
    //@ts-ignore
    dispatch(fetchPizzas({ categoryId, sortType, pageCount, searchValue }));
    // setIsLoaing(false);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    fetchPizza();
    // console.log(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sortType, searchValue, pageCount]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortType,
      categoryId,
      pageCount,
      searchValue,
    });

    navigate(`?${queryString}`);
    // console.log(queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sortType, searchValue, pageCount]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories catId={categoryId} onClickCategory={onClickCategoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {pizzaLoadStatus === 'loading' && 'Loading'}
      <div className="content__items">
        {pizzaLoadStatus === 'loading' ? (
          [...new Array(6)].map((_, index) => {
            return <SceletonPizzaBlock key={index} />;
          })
        ) : pizzaArray.length === 0 ? (
          <h1>Not found</h1>
        ) : (
          pizzaArray.map((pizza) => {
            return <PizzaBlock key={pizza.id} {...pizza} />;
          })
        )}
      </div>
      <Pagination pageCount={pageCount} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
