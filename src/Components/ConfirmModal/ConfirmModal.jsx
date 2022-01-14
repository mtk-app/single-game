import { useEffect } from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({
  msg, handleSubmit, handleCancel,
  cancelBtnTxt = 'cancel',
  submitBtnTxt = 'submit',
}) => {
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    return () => (body.style.overflow = 'auto');
  }, []);
  return (
    <div className="ConfirmModal">
      <div className="modal">
        <p className="msg">{msg}</p>
        <div className="btn-container">
          <button onClick={handleCancel} className="modal-btn cancel-btn">{cancelBtnTxt}</button>
          <button onClick={handleSubmit} className="modal-btn submit-btn">{submitBtnTxt}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
