import { ArrowRight, ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import FormComponent from '../common/form';
import NumberField from '../common/form/numberField';
import Title from '../common/typography/title';

const SearchRoomsForm = () => {
  const [data, setData] = useState({ adults: '0', children: 0, babies: 0 });
  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
  };

  const handleChange = useCallback(target => {
    console.log(target.name);
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }, []);

  const validatorConfig = {};

  return (
    <>
      <FormComponent onSubmit={handleSubmit} validatorConfig={validatorConfig} defaultData={data}></FormComponent>
      <Card sx={{ mt: '70px', padding: '30px', background: '#fff', width: 380 }}>
        <Title isBold>Найдём номера под ваши пожелания</Title>
        <FormComponent onSubmit={handleSubmit} validatorConfig={validatorConfig} defaultData={data}></FormComponent>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>Сколько гостей</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <NumberField label='Взрослые' name='adults' data={data} setData={setData} />
            <NumberField label='Дети' name='children' data={data} setData={setData} />
            <NumberField label='Младенцы' name='babies' data={data} setData={setData} />
          </AccordionDetails>
        </Accordion>
        <Button
          variant='contained'
          size='small'
          color='primary'
          endIcon={<ArrowRight />}
          sx={{ mt: '30px' }}
          onClick={handleSubmit}
          fullWidth
        >
          Подобрать номер
        </Button>
      </Card>
    </>
  );
};

export default SearchRoomsForm;
