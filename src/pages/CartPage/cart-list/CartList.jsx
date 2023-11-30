import styles from './CartList.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import CartItem from '../cart-list/cart-item/CartItem';

const CartList = () => {
  const { products } = useAppSelector((state) => state.cartSlice);
  return (
    <div className={styles.cart_list}>
      {products.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
