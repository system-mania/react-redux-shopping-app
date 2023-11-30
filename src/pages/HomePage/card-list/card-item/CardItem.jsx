import { Link } from 'react-router-dom';
import styles from './CardItem.module.scss';
import { useAppDispatch } from '../../../../hooks/redux';
import { addToCart } from '../../../../store/cart/cart.slice';
import { useAppSelector } from '../../../../hooks/redux';

const CardItem = ({ item }) => {
  const { products } = useAppSelector((state) => state.cartSlice);
  const productMatching = products.some((el) => el.id === item.id);
  const dispatch = useAppDispatch();
  const addItemToCart = () => {
    dispatch(addToCart(item));
  };
  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img
          src={item.image}
          alt="product card"
          width={'80%'}
          height={'200px'}
        />
      </Link>
      <h5>{item.title.substring(0, 15)}...</h5>
      <div>
        <button
          disabled={productMatching}
          onClick={() => !productMatching && addItemToCart()}>
          {productMatching ? '장바구니에 담긴 제품' : '장바구니에 담기'}
        </button>
        <p>$ {item.price}</p>
      </div>
    </li>
  );
};
export default CardItem;
