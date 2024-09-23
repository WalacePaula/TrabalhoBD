import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Select = styled.select`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getReservas, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const reserva = ref.current;
      
      reserva.nome.value = onEdit.nome;//Fazer requisição para buscar o id do cliente pelo nome que vem do front
      reserva.mesa.value = onEdit.mesa;
      reserva.hora.value = onEdit.hora;
      reserva.dataReserva.value = onEdit.dataReserva;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reserva = ref.current;

    if (
      !reserva.nome.value ||
      !reserva.mesa.value ||
      !reserva.hora.value ||
      !reserva.dataReserva.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: reserva.nome.value,
          mesa: reserva.mesa.value,
          hora: reserva.hora.value,
          dataReserva: reserva.dataReserva.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: reserva.nome.value,
          mesa: reserva.mesa.value,
          hora: reserva.hora.value,
          dataReserva: reserva.dataReserva.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    reserva.nome.value = "";
    reserva.mesa.value = "";
    reserva.hora.value = "";
    reserva.dataReserva.value = "";

    setOnEdit(null);
    getReservas();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
    <InputArea>
      <Label>Nome</Label>
      <Input name="nome" />
    </InputArea>
    <InputArea>
      <Label>Mesa</Label>
      <Select name="mesa">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
      </Select>
    </InputArea>
    <InputArea>
      <Label>Horário</Label>
      <Select name="hora">
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
        <option value="12:00">12:00</option>
        <option value="13:00">13:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
        <option value="16:00">16:00</option>
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
        <option value="21:00">21:00</option>
      </Select>
    </InputArea>

    <InputArea>
      <Label>Data</Label>
      <Input name="dataReserva" type="date" />
    </InputArea>

    <Button type="submit">SALVAR</Button>
  </FormContainer>
  );
};

export default Form;
