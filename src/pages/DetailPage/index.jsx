import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { fetchProduct } from '../../store/products/product.slice';
import styles from './DetailPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import Loader from '../../components/loader/Loader';
import { addToCart } from '../../store/cart/cart.slice';

const DetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useAppDispatch();

  const { product, isLoading } = useAppSelector((state) => state.productSlice);
  const { products } = useAppSelector((state) => state.cartSlice);
  const productMatching = products?.some(
    (product) => product.id === product.id
  );

  const addItemToCart = () => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [productId, dispatch]);

  return (
    <div className="page">
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.card_wrapper}>
          <div className={styles.card_img}>
            <img src={product.image} alt="product card" />
          </div>
          <div className={styles.card_description}>
            <h3>{product.category}</h3>
            <h1>{product.title}</h1>

            <h4>$ {product.price}</h4>
            <p>{product.description}</p>
            <div>
              <button
                disabled={productMatching}
                onClick={() => !productMatching && addItemToCart()}>
                {productMatching ? '장바구니에 담긴 제품' : '장바구니에 담기'}
              </button>
              <Link to="/cart">장바구니로 이동</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
