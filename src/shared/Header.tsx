import { useNavigate } from 'react-router-dom';
import { PATH_URL } from './constants/pages';
import '../styles/header.scss';

const Header = () => {
  const navigate = useNavigate();

  const headerList = [
    { value: 'Home', path: PATH_URL.HOME },
    { value: 'Survey', path: PATH_URL.SURVEY },
    { value: 'Email', path: PATH_URL.EMAIL },
    { value: 'Test', path: PATH_URL.TEST },
  ];

  const onClickText = (path: string) => {
    navigate(path);
  };

  return (
    <header>
      {headerList.map((el, index) => (
        <span key={index} onClick={() => onClickText(el.path)}>
          {el.value}
        </span>
      ))}
    </header>
  );
};

export default Header;
