import { Container, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        const res = await signInWithEmailAndPassword(auth, email, password);
        setEmail('');
        setPassword('');
        navigate("/")
    }catch(error){
        setErr(true)
    }
  };

  const inputStyles = {
    margin: '10px 0',
  };

  const buttonStyles = {
    margin: '20px 0',
  };

  const linkStyles = {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    textAlign: 'center',
  };

  return (
    <Container component="main" maxWidth="xs" sx={{mt:'100px', border:'1px white solid', p:"15px", borderRadius:"15px", bgcolor:'lightblue'}}>
      <div>
        <Typography component="h1" variant="h3" sx={{ textAlign: 'center', color:'darkblue', fontFamily:'fantasy' }}>
          CHAT ANALYZER
        </Typography>
        <Typography component="h5" variant="body2"  textAlign={'center'} sx={{ textAlign: 'center', color:"gray" }}>
          Ingresa
        </Typography>
        <form noValidate onSubmit={handleSubmit} sx={{ marginTop: 1 }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
            sx={inputStyles}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
            sx={inputStyles}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={buttonStyles}
          >
            Iniciar Sesión
          </Button>
          {err && <Typography textAlign={'center'}>Algo salió mal :(</Typography>}
          <Link to="/signup" >
            <Typography sx={linkStyles} variant="body2" color="textSecondary">
              ¿No tienes una cuenta? Regístrate
            </Typography>
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default Login;
