import { FormControl, FormGroup, Grid } from '@mui/material';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CheckBoxList from '../../../common/form/checkBoxList';
import { Checkbox, DatePickerField, GuestsDropDownField, RangeSliderField } from '../../../common/form/fields';
import MyCheckBox from '../../../common/form/myCheckBox';
import Title from '../../../common/typography/title';
import useStyles from './styles';

const initialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  arrival: new Date(Date.now()).getTime(),
  departure: new Date(Date.now()).getTime(),
  rentPerDay: [5000, 10000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
};

const RoomsFilter = () => {
  const classes = useStyles();
  const [filterData, setFilterData] = useState(initialData || {});
  const history = useHistory();
  const querySearchStr = history.location.search;

  const handleChange = useCallback(({ target }) => {
    console.log('new VALUE: ', target);
    const { name, value } = target;
    setFilterData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const getQueryData = useCallback(async () => {
    let queryData = queryString.parse(querySearchStr);
    queryData = { ...queryData, guests: JSON.parse(queryData.guests) };
    return queryData;
  }, [querySearchStr]);

  useEffect(() => {
    if (querySearchStr) {
      try {
        getQueryData().then(data => setFilterData(prevState => ({ ...prevState, ...data })));
      } catch (error) {
        console.log(error);
      }
    }
  }, [querySearchStr, getQueryData]);

  return (
    <Grid container direction='column' className='filters-form'>
      <Grid item className={classes.filterFormItem}>
        <Title component='p' variant='subtitle2' isBold className={classes.filterFormTitle}>
          Дата пребывания в отеле
        </Title>
        <DatePickerField
          label='Дата прибытия'
          minDate={Date.now()}
          name='arrival'
          clearable
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
          value={Number(filterData.arrival)}
          onChange={handleChange}
        />
        <DatePickerField
          label='Дата выезда'
          minDate={Date.now()}
          name='departure'
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
          value={Number(filterData.departure)}
          onChange={handleChange}
        />
      </Grid>
      <Grid item className={classes.filterFormItem}>
        <Title component='p' variant='subtitle2' isBold className={classes.filterFormTitle}>
          Гости
        </Title>
        <GuestsDropDownField value={filterData.guests} setData={setFilterData} name='guests' />
      </Grid>
      <Grid item className={classes.filterFormItem}>
        <RangeSliderField
          label='Диапазон цены'
          value={filterData.rentPerDay}
          name='rentPerDay'
          onChange={handleChange}
          min={0}
          max={15000}
        />
      </Grid>
      <Grid item className={classes.filterFormItem}>
        <fieldset className='filters__group'>
          <legend className='filters__group-title'>Условия размещения</legend>
          <CheckBoxList>
            <MyCheckBox label='Можно курить' onChange={handleChange} value={filterData.canSmoke} name='canSmoke' />
            <MyCheckBox label='Можно c питомцами' onChange={handleChange} value={filterData.canPets} name='canPets' />
            <MyCheckBox
              label='Можно пригласить гостей (до 10 человек)'
              onChange={handleChange}
              value={filterData.canInvite}
              name='canInvite'
            />
          </CheckBoxList>
        </fieldset>
      </Grid>

      <Grid item className={classes.filterFormItem}>
        <fieldset className='filters__group'>
          <legend className='filters__group-title'>Доступность</legend>
          <CheckBoxList>
            <MyCheckBox
              label='Широкий коридор'
              onChange={handleChange}
              value={filterData.hasWideCorridor}
              name='hasWideCorridor'
              labelDetails='Ширина коридоров в номере не менее 91см'
            />
            <MyCheckBox
              label='Помощник для инвалидов'
              onChange={handleChange}
              value={filterData.hasDisabledAssistant}
              name='hasDisabledAssistant'
              labelDetails='На 1 этаже вас встретит специалист и проводит до номера'
            />
          </CheckBoxList>
        </fieldset>
      </Grid>
      <Grid item className={classes.filterFormItem}></Grid>
      <Grid item className={classes.filterFormItem}>
        <button onClick={() => console.log(filterData)}>Найти</button>
      </Grid>
    </Grid>
  );
};

export default RoomsFilter;
