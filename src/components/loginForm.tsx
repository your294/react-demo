import { ChangeEvent, MouseEvent, useReducer } from "react";
import "./form.css";
import useValidation, { Validation } from "../hooks/useValidation";

type Action =
  | { type: "userName"; payload: string }
  | { type: "pwd"; payload: string }
  | { type: "reset" };

const defaultLogin = {
  userName: "",
  pwd: "",
};

function reducer(state: typeof defaultLogin, action: Action) {
  switch (action.type) {
    case "userName": {
      return {
        userName: action.payload,
        pwd: state.pwd,
      };
    }
    case "pwd": {
      return {
        userName: state.userName,
        pwd: action.payload,
      };
    }
    case "reset": {
      return {
        ...defaultLogin,
      };
    }
  }
}

const userNameRule: Validation = {
  validator: (val: string) => {
    return /^.{8,16}$/i.test(val);
  },
  msg: "用户名长度为8-16位",
};

const pwdRule: Validation = {
  validator: (val: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,@$!%*?&])[A-Za-z\d.,@$!%*?&]{8,16}$/.test(
      val
    );
  },
  msg: "密码必须包含至少一个小写字母、大写字母、数字、特殊字符，并且长度为8到16位",
};

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, defaultLogin);
  const {
    isValid: userNameIsValid,
    onChange: userNameOnChange,
    errors: nameErrors,
  } = useValidation(state.userName, [userNameRule]);
  const {
    isValid: pwdIsValid,
    onChange: pwdOnChange,
    errors: pwdErrors,
  } = useValidation(state.pwd, [pwdRule]);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    userNameOnChange(e);
    dispatch({
      type: "userName",
      payload: e.target.value,
    });
  }

  function handlePwdChange(e: ChangeEvent<HTMLInputElement>) {
    pwdOnChange(e);
    dispatch({
      type: "pwd",
      payload: e.target.value,
    });
  }

  function handleSubmitClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(state);
    dispatch({
      type: "reset",
    });
  }
  return (
    <form className="form">
      <h1>Reducer Demo</h1>
      <div className="form__row">
        <label className="form--base">userName</label>
        <div>
          <input
            className="form__input--base"
            type="text"
            value={state.userName}
            onChange={handleNameChange}
            required
          />
          <br />
          {!userNameIsValid && <span className="text">{nameErrors[0]}</span>}
        </div>
      </div>
      <div className="form__row">
        <label className="form--base">password</label>
        <div>
          <input
            className="form__input--base"
            type="password"
            onChange={handlePwdChange}
            required
          />
          <br />
          {!pwdIsValid && <span className="text">{pwdErrors[0]}</span>}
        </div>
      </div>
      <div className="form__submit">
        <button className="form__row--btn" onClick={handleSubmitClick}>
          Login
        </button>
      </div>
    </form>
  );
}
