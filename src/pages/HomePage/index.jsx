import CardList from './card-list/CardList';
import CardSkeleton from './card-skeleton/CardSkeleton';
import CountProducts from './count-products/CountProducts';
import FilterCategory from './filter-category/FiltersCategory';

const HomePage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>Products</h1>
        <FilterCategory />
        <CountProducts />
        <CardList />
        <CardSkeleton />
      </div>
    </div>
  );
};

export default HomePage;
