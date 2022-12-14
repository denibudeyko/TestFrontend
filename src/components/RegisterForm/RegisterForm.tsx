import React from "react";
import Button from "../Button";
import { ButtonClassNameEnum } from "../Button/ButtonInterface";
import Form from "../Form";
import Input from "../Input/Input";
import { InputInterface } from "../Input/InputInterface";
import { RegisterFormFields, RegisterInitialValues, RegisterSchemaValidation } from './RegisterFormSettings'
import { useFormik } from 'formik';
import { REGISTER_USER_PATH } from "../../constants/fetch_constants";

const RegisterForm:React.FC = () => {
  const formik = useFormik({
    initialValues: RegisterInitialValues,
    validationSchema: RegisterSchemaValidation,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (values, resetForm) => handleSubmit(values, resetForm),
  })


  const handleSubmit = (values: any, { resetForm }: any) => {
    const { repeatPassword, ...filteredItems } = values;
    fetch(REGISTER_USER_PATH,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filteredItems) 
      })
      .then((res) => {
        if (res.status === 201) {
          resetForm();
        } else {
          console.log(res.statusText);
        }
      })
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="form-title">Register form</div>
      
      {RegisterFormFields.map((field: InputInterface) => {
        const { name, type, placeholder } = field;
        const error: any = formik.errors;
        return <Input
          {...formik.getFieldProps(name)}
          key={name}
          type={type}
          name={name}
          placeholder={placeholder} 
          error={error[name]}
        />
        })}
      
      <Button
        className={ButtonClassNameEnum.FULL}
        name="Register"
        disabled={!formik.dirty || !formik.isValid }
      />
    </Form> 
  )
}

export default RegisterForm;
