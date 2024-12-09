import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@store/userSlice";
import { getUserData } from "@utils/firebase/getUserData";
import { updateUserData } from "@utils/firebase/updateUserData";
import { phoneFormatter } from "@utils/formatters/phoneFormatter.js";
import { db } from "../../firebase.js";
import { CabinetForm } from "./CabinetForm/CabinetForm";
import { Loader } from "@components/UI/Loader/Loader.jsx";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError.jsx";
import { Success } from "@components/UI/Popups/Success/Success.jsx";
import { Confirmation } from "@components/UI/Popups/Confirmation/Confirmation.jsx";
import { FaRegEdit } from "react-icons/fa";
import userImg from "@assets/images/user-icon.svg";
import "./Cabinet.css";

export function Cabinet() {
  const uid = useSelector((state) => state.user.id); // uid полтзователя
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({}); // Данные пользователя
  const [loading, setLoading] = useState(true); // Загрузка данных пользоветля
  const [sendingUserDataLoader, setSendingUserDataLoader] = useState(false); // Отправка данных пользователя
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const notData = "Не указано";
  const loadingText = "Загрузка...";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("man");
  const [date, setDate] = useState("");

  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [sendUserError, setSendUserError] = useState(null); // Состояние ошибки отправки данных пользователя
  const [userDataError, setUserDataError] = useState(null); // Состояние ошибки получения данных пользователя

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получения данных пользователя
  useEffect(() => {
    async function fetchUserData() {
      if (uid) {
        try {
          const data = await getUserData(uid);
          setUserData(data);
          setName(data.name || "");
          data.phone ? setPhone(phoneFormatter(data.phone)) : setPhone("");
          setGender(data.gender || "man");
          setDate(data.date || "");
          setLoading(false);
          setUserDataError(null);
        } catch (error) {
          setUserDataError(
            "Ошибка! Не удалось загрузить данные пользователя. Попробуйте позже..."
          );
        }
      }
    }

    fetchUserData();
  }, [uid]);

  // Функция деавторизации
  function handleLogout() {
    // Удаляем данные о юзере и LocalStorage и Redux
    dispatch(removeUser());
    localStorage.removeItem("user");
    navigate("/");
  }

  // Функция отправки формы
  async function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "") {
      setNameError(true);
      return;
    }
    if (phone.length > 0 && phone.length < 16) {
      setPhoneError(true);
      return;
    }
    setSendingUserDataLoader(true);
    try {
      const data = {
        name: name.trim(),
        phone: phone.replace(/[\s()+-]/g, "").trim(),
        gender,
        ...(date.trim() !== "" && { date: date.trim() }),
      };

      // Ожидание успешного завершения обновления данных в базе данных
      await updateUserData(db, uid, data);

      // Очистка полей после успешной отправки
      setShowSuccess(true); // Показываем уведомление об успешной отправке формы
      setName("");
      setPhone("");
      setGender("man");
      setDate("");
      setNameError(null);
      setPhoneError(null);
      setSendUserError(null);
      setShowForm(false);
      setSendingUserDataLoader(false);
    } catch (error) {
      setSendUserError(
        "Ошибка при обновлении данных пользователя, попробуйте позже"
      );
      setSendingUserDataLoader(false);
    }
  }

  // Сбрасываем ошибку через время
  useEffect(() => {
    if (sendUserError) {
      const timer = setTimeout(() => {
        setSendUserError(null);
      }, 6000);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }
  }, [sendUserError]);

  // Функция перезагрузки страницы
  function reloadPage() {
    window.location.reload();
  }

  return (
    <section className="cabinet">
      <div className="container">
        <div className="cabinet__wrapper">
          {sendingUserDataLoader && <Loader />}
          {sendUserError && <WarningError warning={sendUserError} />}
          {userDataError && <p className="user-data--error">{userDataError}</p>}
          {showSuccess && (
            <Success
              text="Данные успешно изменены"
              setShowForm={setShowSuccess}
              reload={reloadPage}
            />
          )}
          {showConfirm && (
            <Confirmation
              title="Внимание"
              text="Вы хотите выйти из профиля?"
              setShowConfirm={setShowConfirm}
              handleClear={handleLogout}
            />
          )}
          {!userDataError && (
            <>
              {" "}
              <div className="cabinet__name-block">
                <div className="cabinet__icon__wrapper">
                  <img
                    className="cabinet__icon"
                    src={userImg}
                    alt="Пользователь"
                  />
                </div>
                <div className="cabinet__text">
                  <p className="cabinet__name">
                    {loading
                      ? loadingText
                      : userData.name
                      ? userData.name
                      : "Пользователь"}
                  </p>
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
                  <FaRegEdit
                    className="cabinet__icon--edit"
                    onClick={() => setShowForm(true)}
                  />
                </button>
              </div>
              {/* Cabinet-info */}
              <div className="cabinet__info">
                <div className="cabinet__info-item">
                  <p className="cabinet__info-label">Имя</p>
                  <p className="cabinet__info-text">
                    {loading ? loadingText : userData.name || notData}
                  </p>
                </div>
                {/*  */}
                <div className="cabinet__info-item">
                  <p className="cabinet__info-label">Телефон</p>
                  <p className="cabinet__info-text">
                    {loading
                      ? loadingText
                      : userData.phone
                      ? phoneFormatter(userData.phone)
                      : notData}
                  </p>
                </div>
                {/*  */}
                <div className="cabinet__info-item">
                  <p className="cabinet__info-label">E-mail</p>
                  <p className="cabinet__info-text">
                    {loading
                      ? loadingText
                      : userData.email
                      ? userData.email
                      : notData}
                  </p>
                </div>
                {/*  */}
                <div className="cabinet__info-item">
                  <p className="cabinet__info-label">Пол</p>
                  <p className="cabinet__info-text">
                    {loading
                      ? loadingText
                      : userData.gender
                      ? userData.gender === "man"
                        ? "Мужской"
                        : "Женский"
                      : notData}
                  </p>
                </div>
                {/*  */}
                <div className="cabinet__info-item">
                  <p className="cabinet__info-label">Дата рождения</p>
                  <p className="cabinet__info-text">
                    {loading
                      ? loadingText
                      : userData.date
                      ? new Date(userData.date).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : notData}
                  </p>
                </div>
              </div>
              {/* Cabinet-info-end */}
              <button
                className="cabinet__btn--exit"
                type="button"
                // onClick={handleLogout}
                onClick={() => setShowConfirm(true)}
              >
                Выйти
              </button>
              {showForm && (
                <CabinetForm
                  name={name}
                  setName={setName}
                  nameError={nameError}
                  setNameError={setNameError}
                  phone={phone}
                  setPhone={setPhone}
                  phoneError={phoneError}
                  setPhoneError={setPhoneError}
                  gender={gender}
                  setGender={setGender}
                  date={date}
                  setDate={setDate}
                  setShowForm={setShowForm}
                  handleSubmit={handleSubmit}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
