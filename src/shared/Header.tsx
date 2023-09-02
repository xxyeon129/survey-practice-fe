import { useNavigate } from "react-router-dom";
import { PATH_URL } from "./constants/pages";

const Header = () => {
  const navigate = useNavigate();
  
  const headerList = [
    {value: 'Home', path: PATH_URL.HOME},
    {value: 'Survey', path: PATH_URL.SURVEY}
  ]

  const onClickText = (path: string) => {
    navigate(path)
  }

  return <div>
    {headerList.map((el,index) => <span key={index} onClick={() => onClickText(el.path)}>
      {el.value}
    </span>)}
  </div>
}

export default Header;