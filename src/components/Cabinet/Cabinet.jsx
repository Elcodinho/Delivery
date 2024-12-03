import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { removeUser } from "@store/userSlice";
import { FaRegEdit } from "react-icons/fa";
import userImg from "@assets/images/user-icon.svg";
import "./Cabinet.css";

const name = "Иван";
export function Cabinet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Функция деавторизации
  function handleLogout() {
    // Удаляем данные о юзере и LocalStorage и Redux
    dispatch(removeUser());
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <section className="cabinet">
      <div className="container">
        <div className="cabinet__wrapper">
          {/*  */}
          <div className="cabinet__name-block">
            <div className="cabinet__icon__wrapper">
              <img className="cabinet__icon" src={userImg} alt="Пользователь" />
            </div>
            <div className="cabinet__text">
              <p className="cabinet__name">{name}</p>
              <button className="cabinet__button--delete" type="button">
                Удалить
              </button>
            </div>
          </div>
          {/*  */}
          <div className="cabinet__text">
            <p className="cabinet__name">Личные данные</p>
            <button
              type="button"
              aria-label="Кнопка редактировать личные данные"
            >
              <FaRegEdit className="cabinet__icon--edit" />
            </button>
          </div>
          {/* Cabinet-info */}
          <div className="cabinet__info">
            <div className="cabinet__info-item">
              <p className="cabinet__info-label">Имя</p>
              <p className="cabinet__info-text">{name}</p>
            </div>
            {/*  */}
            <div className="cabinet__info-item">
              <p className="cabinet__info-label">Телефон</p>
              <p className="cabinet__info-text">+7 222 999 99 11</p>
            </div>
            {/*  */}
            <div className="cabinet__info-item">
              <p className="cabinet__info-label">E-mail</p>
              <p className="cabinet__info-text">Не указано</p>
            </div>
            {/*  */}
            <div className="cabinet__info-item">
              <p className="cabinet__info-label">Пол</p>
              <p className="cabinet__info-text">Мужской</p>
            </div>
            {/*  */}
            <div className="cabinet__info-item">
              <p className="cabinet__info-label">Дата рождения</p>
              <p className="cabinet__info-text">Не указано</p>
            </div>
          </div>
          {/* Cabinet-info-end */}
          <button
            className="cabinet__btn--exit"
            type="button"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </div>
    </section>
  );
}
