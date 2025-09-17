import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SuccessModal({ isOpen, onClose, handleLoginLinkClick }) {
  return (
    <div className="success-modal">
      <ModalWithForm
        title="Registration successfully completed!"
        name="success"
        buttonText=""
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginLinkClick();
        }}
        hideDefaultButton={true}
      >
        <button
          type="button"
          className="modal__button-secondary"
          onClick={(e) => {
            e.preventDefault();
            handleLoginLinkClick();
          }}
        >
          Sign in
        </button>
      </ModalWithForm>
    </div>
  );
}

export default SuccessModal;
