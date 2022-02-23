import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as crentesService from "../../services/crentesService";

const genderItems = [
  { id: "male", title: "Masculino" },
  { id: "female", title: "Feminino" },
  { id: "other", title: "Outro" },
];

const initialFValues = {
  id: 0,
  fullName: "",
  mobile: "",
  churchId: "",
  gender: "male",
  NeighborhoodId: "",
  hireDate: new Date(),
};

export default function CrentesForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "Campo obrigatório.";

    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile.length > 8 ? "" : "Minimo 9 digitos.";
    if ("NeighborhoodId" in fieldValues)
      temp.NeighborhoodId =
        fieldValues.NeighborhoodId.length != 0 ? "" : "Campo obrigatório.";
    if ("churchId" in fieldValues)
      temp.churchId =
        fieldValues.churchId.length != 0 ? "" : "Campo obrigatório.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Name Completo"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.RadioGroup
            name="gender"
            label="Gênero"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Input
            label="Contacto"
            name="mobile"
            type="number"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="NeighborhoodId"
            label="Bairro"
            value={values.NeighborhoodId}
            onChange={handleInputChange}
            options={crentesService.getNeighborhoodCollection()}
            error={errors.NeighborhoodId}
          />
          <Controls.Select
            name="churchId"
            label="Proveniente da Igreja"
            value={values.churchId}
            onChange={handleInputChange}
            options={crentesService.getChurchCollection()}
            error={errors.churchId}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Data inicio"
            value={values.hireDate}
            onChange={handleInputChange}
          />

          <div>
            <Controls.Button type="submit" text="Salvar" />
            <Controls.Button
              text="Limpar"
              color="default"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
