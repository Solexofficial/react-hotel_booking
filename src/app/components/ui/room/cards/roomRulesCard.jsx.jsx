import React from 'react';

const RoomRulesCard = () => {
  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>Правила</h3>
      <ul className='bullet-list'>
        <li className='bullet-list__item'>Нельзя с питомцами</li>
        <li className='bullet-list__item'>Без вечеринок и мероприятий</li>
        <li className='bullet-list__item'>Время прибытия — после 13:00, а выезд до 12:00</li>
      </ul>
    </div>
  );
};

export default RoomRulesCard;
