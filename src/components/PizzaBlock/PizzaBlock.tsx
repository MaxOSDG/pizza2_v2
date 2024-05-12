import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItems, CartItemT } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';

type PizzaBlockprops = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockprops> = ({ id, title, price, imageUrl, sizes, types }) => {
  const [sizePizza, setSizePizza] = React.useState(0);
  const [activeTesto, setActiveTesto] = React.useState(0);

  const addPizza = useSelector((state: RootState) => state.cart.items.find((obj) => obj.id === id));

  const dispath = useDispatch();

  const onClickAdd = () => {
    const item: CartItemT = {
      id,
      title,
      price,
      imageUrl,
      type: typeTesto[activeTesto],
      size: sizePizza,
      count: 0,
    };
    dispath(addItems(item));
  };

  const typeTesto = ['тонкое', 'традиционное'];
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((index) => {
              return (
                <li
                  key={index}
                  onClick={() => setActiveTesto(index)}
                  className={activeTesto === index || types.length === 1 ? 'active' : ''}>
                  {typeTesto[index]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((value, index) => {
              return (
                <li
                  key={value + index}
                  onClick={() => {
                    setSizePizza(index);
                  }}
                  className={sizePizza === index ? 'active' : ''}>
                  {value} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽ </div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{addPizza ? addPizza.count : 0}</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
