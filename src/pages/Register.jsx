import { Container, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore";


const Register = () => {
  const [name, setName] = useState('');
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, {displayName:name})

        await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName: name,
            email
          });

        navigate("/login")
    }catch(error){
        setErr(true)
    }
  };

  const inputStyles = {
    margin: '10px 0',
    bgcolor:'#676f9d',
    borderRadius:'5px'
  };

  const buttonStyles = {
    margin: '20px 0',
  };

  const linkStyles = {
    display: 'block',
    textDecoration: 'none',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <Container component="main" maxWidth="xs" sx={{mt:'100px', border:'1px white solid', p:"15px", borderRadius:"15px", bgcolor:'#424769'}}>
      <div>
        <Typography color={'primary'} component="h1" variant="h3" sx={{ textAlign: 'center', fontFamily:'fantasy' }}>
          CHAT ANALYZER
        </Typography>
        <Typography color={'white'} component="h5" variant="body2"  textAlign={'center'}>
          Regístrate
        </Typography>
        <form noValidate onSubmit={handleSubmit} sx={{ marginTop: 1 }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="displayName"
            label="Nombre"
            name="displayName"
            autoComplete="Nombre"
            onChange={handleNameChange}
            sx={inputStyles}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
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
            Crear cuenta
          </Button>
          {err && <Typography textAlign={'center'}>Algo salió mal</Typography>}
          <Link to="/login" >
            <Typography sx={linkStyles} variant="body2" color="textSecondary">
              ¿Ya tienes una cuenta? Ingresa
            </Typography>
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default Register;
