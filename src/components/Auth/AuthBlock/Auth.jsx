import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "@store/userSlice";
import { loginUser } from "@utils/auth/loginUser";
import { registerUser } from "@utils/auth/registerUser";
import { validateEmail } from "@utils/formUtils/validateEmail";
import { validatePassword } from "@utils/formUtils/validatePassword";
import { auth } from "../../../firebase.js";
import { AuthForm } from "@components/Auth/AuthForm/AuthForm";
import { Loader } from "@components/UI/Loader/Loader";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import "./Auth.css";

export function Auth({ setShowLogin }) {
  const [authType, setAuthType] = useState("login");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(null);
  const [fetchError, setFetchError] = useState(null); // состояние ошибки запроса
  const [loading, setLoading] = useState(false); // состояние загрузки после отправки формы
  const warningLoginMessage =
    "Ошибка! Неверная почта или пароль. Проверьте правильность ввода";
  const warningMessage = authType === "login" ? warningLoginMessage : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Функция переключения окон регистрация и авторизации
  function authTypeToggle() {
    authType === "login" ? setAuthType("register") : setAuthType("login");
  }

  // Функция отравки формы
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !validateEmail(email, setEmailError) ||
      !validatePassword(pass, setPassError)
    ) {
      return; // Останавливаем отправку формы, если пароль не прошел валидацию
    }
    try {
      let userData;
      const emailValid = email.trim();
      const passValid = pass.trim();
      if (authType === "login") {
        // Вызов функции логина
        userData = await loginUser(auth, emailValid, passValid);
      } else {
        // Вызов функции регистрации
        userData = await registerUser(auth, emailValid, passValid);
      }
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));

      setEmail("");
      setPass("");
      setFetchError(null);
      setLoading(true); // Устанавливаем loading для показа анимации
      setTimeout(() => {
        setShowLogin(false);
        setLoading(false);
        navigate("/cabinet"); // Редирект после анимации
      }, 3000);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setFetchError("Пользователь с таким email не найден.");
      } else if (error.code === "auth/email-already-in-use") {
        setFetchError("Пользователь с таким email уже существует");
      } else {
        setFetchError(error.message);
      }
    }
  }

  return (
    <div className="auth__mask" onClick={() => setShowLogin(false)}>
      <div className="auth__container" onClick={(e) => e.stopPropagation()}>
        {fetchError && <WarningError warning={warningMessage || fetchError} />}
        {emailError && <WarningError warning={warningMessage || emailError} />}
        {passError && <WarningError warning={warningMessage || passError} />}
        <AuthForm
          setShowLogin={setShowLogin}
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          pass={pass}
          setPass={setPass}
          passError={passError}
          authType={authType}
          formTitle={authType === "login" ? "Войти" : "Регистрация"}
          formText="Введите номер телефона и пароль"
          btnText={authType === "login" ? "Войти" : "Создать аккаунт"}
          authTypeToggle={authTypeToggle}
          handleSubmit={handleSubmit}
        />
        {loading && <Loader />}
      </div>
    </div>
  );
}
