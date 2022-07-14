import React, { useState } from 'react';
import './modalForMessage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { sendMessage, sendMessageThunk } from '../../redux/actions/message';

function ModalForMessage({ active, setActive }) {
  const [form, setForm] = useState('');
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(true);

  const params = useParams();
  const { id } = params;

  // Marat
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessageThunk(form, id));
    e.target.reset();
  };

  console.log('FORM====>', form);

  const handleChange = React.useCallback((e) => {
    setForm(e.target.value);
  }, []);
    //

  console.log('FORM====>', form);

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive((prev) => !prev)}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        <p className="modal__title">Напишите Ваше письмо здесь:</p>
        <form onSubmit={handleSubmit}>
          <textarea name="message" onChange={handleChange} value={form} className="modal__text" />
          <div className="button__container">
            <button className="modal__button" type="submit">✍</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForMessage;
