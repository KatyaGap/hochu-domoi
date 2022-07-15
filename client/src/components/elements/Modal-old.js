import React, { useState } from 'react';
import './modalForMessage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { sendMessage, sendMessageThunk } from '../../redux/actions/message';

function ModalForMessage({ active, setActive }) {
  const [modalActive, setModalActive] = useState(true);



    //

  console.log('FORM====>', form);

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive((prev) => !prev)}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        <p className="modal__title">Напишите Ваше письмо здесь:</p>

          <textarea name="message"  className="modal__text" />
          <div className="button__container">
            <button className="modal__button" >✍</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForMessage;
