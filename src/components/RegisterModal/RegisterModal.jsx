import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm";

function RegisterModal({
  isOpen,
  onClose,
  handleRegistrationSubmit,
  handleLoginLinkClick,
}) {
  const { values, handleChange, setValues, errors, setErrors } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const hasValues = values.email && values.password && values.name;
    const hasErrors = !!errors.email;
    setIsFormValid(hasValues && !hasErrors);
  }, [values, errors]);

  const onRegister = (e) => {
    e.preventDefault();
    console.log("Registration values being sent:", values);
    handleRegistrationSubmit(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "" });
      setErrors({});
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onRegister}
      isSubmitDisabled={!isFormValid}
      secondaryButton={
        <p className="modal__login-text">
          or{" "}
          <button
            type="button"
            className="modal__button-secondary"
            onClick={handleLoginLinkClick}
          >
            Sign in
          </button>
        </p>
      }
    >
      <label className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="email-register"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="password-register"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
