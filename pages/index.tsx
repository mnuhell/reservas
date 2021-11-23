import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar, DayValue} from '@amir04lm26/react-modern-calendar-date-picker';
import React, {useState} from "react";
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { FormControl } from '@chakra-ui/form-control';
import { Select } from '@chakra-ui/select';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import DatePicker from 'react-modern-calendar-datepicker';


interface areaInterface {
    area: number
}

const INITIAl_STATE: areaInterface = {
    area: 0
}

interface momentInterface {
    moment: string
}

const INITIAl_STATE_MOMENT: momentInterface = {
    moment: ""
}

interface Ireserva {
    //day: string,
    area: areaInterface,
    moment: momentInterface,
    total: number    
}

const Home: NextPage = () => {
    
    const [day, setDay] = useState<DayValue>()
    const [ area, setArea ] = useState<areaInterface>(INITIAl_STATE)
    const [ moment, setMoment ] = useState<momentInterface>(INITIAl_STATE_MOMENT)

    const handleChangeArea = (e: React.FormEvent<HTMLSelectElement>): void => {

        e.preventDefault()
        setArea(e.target.value)
    }

    const handleChangeMoment = (e: React.FormEvent<HTMLSelectElement>): void => {

        e.preventDefault()

        setMoment(e.target.value)
    }

    const handleReservaButton = (e: React.SyntheticEvent) => {

        e.preventDefault()

        const reserva: Ireserva = {
            //day: dateL.toSQLDate(),
            area: area,
            moment: moment,
            total: 0
        }

        console.log( reserva )
    }

    const toDay = new Date()
    const defaultValue = {
        
        year: toDay.getFullYear(),
        month: toDay.getMonth(),
        day: toDay.getDate(),
        hora: toDay.getHours() + ':' + toDay.getMinutes() + ':' + toDay.getSeconds()
      };

      const [selectedDay, setSelectedDay] = useState<DayValue>(defaultValue);

      const renderCustomInput = ({ ref }:any) => (
        <input
          readOnly
          ref={ref} // necessary
          placeholder="Sewleccione el día que quiewre venir"
          value={selectedDay ? `✅: ${selectedDay.day}` : ''}
          style={{
            textAlign: 'center',
            padding: '.5rem 1.9rem',
            fontSize: '1.5rem',
            border: '1px solid #999',
            borderRadius: '100px',
            color: '#9c88ff',
            outline: 'none',
          }}
          className="my-custom-input-class" // a styling class
        />
      )

  return (
    
    <Container centerContent maxW="container.xl">
       
        <Flex alignContent="center" alignItems="center" height="100vh">
        <Box width="400px">
              <form onSubmit={handleReservaButton} >
              <Text fontSize={"5xl"} textAlign="center" fontWeight="100" mb="4">
                Central de Reservas
              </Text>
                  <FormControl mb="3">
                  <Text fontSize="3xl" fontWeight="100" mb="2">¿Que dia te gustaría venir?</Text>
                  <DatePicker
                          value={selectedDay}
                          onChange={setSelectedDay}
                          renderInput={renderCustomInput}
                          shouldHighlightWeekends
                      />
                  </FormControl>

                  <FormControl mb="3">
                      <Input name="name" placeholder="Nombre de la reserva" isRequired={true} type="text" />
                      <Text fontSize="xs" color="gray.500">Nombre que aparecerá en la reserva</Text>
                  </FormControl>

                  <FormControl>
                      <Input name="telefono" placeholder="telefono" isRequired={true} type="text" />
                      <Text fontSize="xs" color="gray.500">Teléfono para localizar la reserva</Text>
                  </FormControl>

                  <FormControl my={3} >
                      <Select name="area" onChange={handleChangeArea}>
                          <option value="0">Selecciona la zona</option>
                          <option value="1">Zona macarena</option>
                          <option value="2">Zona Pista y DJ</option>
                          <option value="3">Zona relax</option>
                      </Select>
                  </FormControl>

                  <FormControl>
                      <Select name="moment" onChange={handleChangeMoment}>
                          <option value="0">Selecciona el momento del día</option>
                          <option value="tardeoComida">Mesa para comer</option>
                          <option value="tardeoCopas">Mesa para cenar</option>
                          <option value="nocheCena">Mesa + Botella </option>
                      </Select>
                  </FormControl>

                  <Button w={"100%"} mt={5} bg={"orange.500"}>Reservar</Button>
              </form>
              </Box>
              </Flex>
      </Container>
  )
}

export default Home
