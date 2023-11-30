import { useForm } from 'react-hook-form';
import styles from './Form.module.scss';

const Form = ({ title, getDataForm, firebaseError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = ({ email, password }) => {
    getDataForm(email, password);
    reset();
  };

  const userEmail = {
    required: '필수 필드입니다.',
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      message: '이메일 형식이 올바르지 않습니다.',
    },
  };

  const userPassword = {
    required: '필수 필드입니다.',

    minLength: {
      value: 8,
      message: '비밀번호는 8자 이상이어야 합니다.',
    },
    maxLength: {
      value: 13,
      message: '비밀번호는 13자 이하이어야 합니다.',
    },
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/i,
      message: '최소 8자, 영문 1자, 숫자 1자.',
    },
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <input
          type="email"
          placeholder="E-mail"
          {...register('email', userEmail)}
        />
        {errors.email && (
          <div>
            <span className={styles.form_error}>{errors.email.message}</span>
          </div>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password', userPassword)}
        />
        {errors.password && (
          <div>
            <span className={styles.form_error}>{errors.password.message}</span>
          </div>
        )}
      </div>
      <button type="submit">{title}</button>
      {firebaseError && (
        <span className={styles.form_error}>{firebaseError}</span>
      )}
    </form>
  );
};

export default Form;
