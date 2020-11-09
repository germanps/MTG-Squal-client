import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../gql/user';
import { setToken, decodeToken } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth'
import './LoginForm.scss';

export default function LoginForm() {
    const [errorLogin, setErrorLogin] = useState("")
    const [login] = useMutation(LOGIN);

    const { setUser } = useAuth();


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es válido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria")
        }),
        onSubmit: async (formData) => {
            setErrorLogin("")
            try {
                const { data } = await login({
                    variables: {
                        input: formData
                    }
                });
                //insertar token en el localStorage
                const { token } = data.login
                setToken(token);
                //guardar usuario(decodificado)
                setUser(decodeToken(token));
            } catch (error) {
                setErrorLogin(error.message);
            }
            console.log(formData);
        },
    })

    return (
        <div className="login-form">
            <h2 className="register-form__title">Iniciar sesión</h2>
            <Form className="login-form__form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Correo electrónico"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password && true}
                />
                <Button type="submit" className="btn-submit">Iniciar sesión</Button>
                {errorLogin && <p className="submit-error">{errorLogin}</p>}
            </Form>
        </div>
    )
}


function initialValues() {
    return {
        email: "",
        password: ""
    };
}