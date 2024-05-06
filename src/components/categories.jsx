import React from 'react';

function Categories({ catId, onClickCategory }) {
  // console.log('value', catId);
  // const [activeIndex, setActiveIndex] = React.useState(0);

  // console.log(activeIndex);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={value}
              onClick={() => {
                onClickCategory(index);
                // setActiveIndex(index);
              }}
              className={catId === index ? 'active' : ''}>
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
