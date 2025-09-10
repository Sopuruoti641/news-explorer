import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm";

function LoginModal({
  isOpen,
  onClose,
  handleLoginSubmit,
  handleSignUpLinkClick,
}) {
  const { values, handleChange, setValues, errors, setErrors } = useForm({
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const hasValues = values.email && values.password;
    const hasErrors = !!errors.email;
    setIsFormValid(hasValues && !hasErrors);
  }, [values, errors]);

  const onLogin = (e) => {
    e.preventDefault();
    handleLoginSubmit(values);
    setValues({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
      setErrors({});
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onLogin}
      isSubmitDisabled={!isFormValid}
      secondaryButton={
        <p className="modal__login-text">
          or{" "}
          <button
            type="button"
            className="modal__button-secondary"
            onClick={handleSignUpLinkClick}
          >
            Sign Up
          </button>
        </p>
      }
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email-login"
          placeholder="Email"
          name="email"
          required
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password-login"
          placeholder="Password"
          name="password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
