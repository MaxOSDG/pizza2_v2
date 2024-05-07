import React from 'react';
// import axios from 'axios';
import qs from 'qs';

import Categories from '../components/categories';
import Sort from '../components/sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import SceletonPizzaBlock from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App.tsx';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const [pizzaArray, setPizzaArray] = React.useState([]);
  const [isLoading, setIsLoaing] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const pageCount = useSelector((state) => state.filter.pageCount);
  const pizzaArray = useSelector((state) => state.pizzas.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      console.log(window.location.search);
      const params = qs.parse(window.location.search.substring(1));
      const sortProperty = params.sortType;
      console.log('ppppp', { ...params });
      dispatch(setFilters({ ...params, sortProperty }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPizza = async () => {
    setIsLoaing(true);
    dispatch(fetchPizzas({ categoryId, sortType, pageCount, searchValue }));
    setIsLoaing(false);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    fetchPizza();
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
      {isLoading && 'Loading'}
      <div className="content__items">
        {isLoading ? (
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
