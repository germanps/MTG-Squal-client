import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react'
import logo from '../../assets/svg/header-logo.svg'
import './Auth.scss';

export default function Auth() {
    const [showLogin, setShowLogin] = useState(false)
    return (
        <Container fluid className="auth">
            <Image src={logo} />
            <div className="container-form">
                {showLogin ? <p>Formulario de Login</p> : <p>Formulario de registro</p>}
            </div>
            <div className="change-form">
                <p>
                    {showLogin ? (
                        <>
                            no tienes cuenta?
                            <span onClick={() => setShowLogin(!showLogin)}>Regístrate</span>
                        </>
                    ) : (
                            <>
                                Entra con tu cuenta
                            <span onClick={() => setShowLogin(!showLogin)}>Iniciar sesión</span>
                            </>
                        )}
                </p>
            </div>
        </Container>
    )
}
