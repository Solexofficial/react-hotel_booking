import { FormControl, FormGroup, Grid } from '@mui/material';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Checkbox, DatePickerField, GuestsDropDownField, RangeSliderField } from '../../../common/form/fields';
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
        <Title component='p' variant='subtitle2' isBold className={classes.filterFormTitle}>
          Условия размещения
        </Title>
        <FormControl component='fieldset' variant='standard'>
          <FormGroup>
            <Checkbox
              label='Можно курить'
              onChange={handleChange}
              value={filterData.canSmoke}
              name='canSmoke'
              className={classes.filterFormItem}
              size='small'
            />
            <Checkbox
              label='Можно c питомцами'
              onChange={handleChange}
              value={filterData.canPets}
              name='canPets'
              className={classes.filterInput}
              size='small'
            />
            <Checkbox
              label='Можно пригласить гостей &nbsp;(до 10 человек)'
              onChange={handleChange}
              value={filterData.canInvite}
              name='canInvite'
              className={classes.filterInput}
              size='small'
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item className={classes.filterFormItem}>
        <Title component='p' variant='subtitle2' isBold className={classes.filterFormTitle}>
          Доступность
        </Title>
        <FormControl component='fieldset' variant='standard'>
          <FormGroup>
            <Checkbox
              label='Широкий коридор'
              onChange={handleChange}
              value={filterData.hasWideCorridor}
              name='hasWideCorridor'
              className={classes.filterFormItem}
              size='small'
              labelDescription='Ширина коридоров в номере не менее 91см'
            />
            <Checkbox
              label='Помощник для инвалидов'
              onChange={handleChange}
              value={filterData.hasDisabledAssistant}
              name='hasDisabledAssistant'
              className={classes.filterInput}
              size='small'
              labelDescription='На 1 этаже вас встретит специалист и проводит до номера'
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item className={classes.filterFormItem}>
        <Title component='p' variant='subtitle2' isBold className={classes.filterFormTitle}>
          Удобства номера
        </Title>
        <GuestsDropDownField value={filterData.guests} setData={setFilterData} name='guests' />
      </Grid>
      <Grid item className={classes.filterFormItem}>
        <button onClick={() => console.log(filterData)}>Найти</button>
      </Grid>
    </Grid>
  );
};

export default RoomsFilter;
