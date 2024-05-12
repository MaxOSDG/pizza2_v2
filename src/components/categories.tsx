import React from 'react';

type CategoriesProps = { catId: number; onClickCategory: (index: number) => void };

const Categories: React.FC<CategoriesProps> = React.memo(({ catId, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
});

export default Categories;
