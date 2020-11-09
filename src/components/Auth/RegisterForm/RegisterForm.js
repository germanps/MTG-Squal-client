import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik';//control de datos de formulario
import * as Yup from 'yup';//validación de datos de formulario
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../gql/user';
import { toast } from 'react-toastify';
import './RegisterForm.scss'

export default function RegisterForm(props) {
    const { setShowLogin } = props
    const [register] = useMutation(REGISTER);

    //Manejo de datos
    const formik = useFormik({
        initialValues: initialFormValues(),
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio!"),
            username: Yup.string()
                .matches(/^[a-zA-Z0-9]*$/, "El nombre del usuario no puede tener espacios")
                .required("El nombre de usuario es obligatorio"),
            email: Yup.string().email("El email no es válido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("repeatPassword")], "Las contraseñas debes ser iguales"),
            repeatPassword: Yup.string().required("La cotraseña es obligatoria").oneOf([Yup.ref("password")], "Las contraseñas debes ser iguales")
        }),
        onSubmit: async (formData) => {
            try {
                //formatear el objeto a enviar a la BBDD
                const newUser = formData;
                delete newUser.repeatPassword;
                //llamar a la función register para insertar el objeto a la BBDD
                await register({
                    variables: {
                        input: newUser
                    }
                });
                toast.success("Usuario registrado correctamente");
                //mostramos el formulario de login
                setShowLogin(true);
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        }
    })
    return (
        <>
            <div className="register-form">
                <h2 className="register-form__title">Registrarse en MTG-Sqüal</h2>
                <Form className="register-form__form" onSubmit={formik.handleSubmit} >
                    <Form.Input
                        type="text"
                        placeholder="Nombre y apellidos"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name && true} //si tiene valor retorna true
                    />
                    <Form.Input
                        type="text"
                        placeholder="Nombre de usuario"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        error={formik.errors.username && true}
                    />
                    <Form.Input
                        type="text"
                        placeholder="Correo electrónico"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email && true}
                    />
                    <Form.Input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password && true}
                    />
                    <Form.Input
                        type="password"
                        placeholder="Repetir contraseña"
                        name="repeatPassword"
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                        error={formik.errors.repeatPassword && true}
                    />
                    <Button type="submit" className="btn-submit">
                        Registrarse
                    </Button>
                </Form>
            </div>
        </>

    )
}


function initialFormValues() {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}