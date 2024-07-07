import {Typography, Box, Button, TextField} from "@mui/material"
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext';

function NewAnalysis() {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState(false);
  
    const {currentUser} = useContext(AuthContext)

    const navigate = useNavigate();
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleLinkChange = (event) => {
      setLink(event.target.value);
    };
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(name != '' && link != '')
      {
      try{
          const analysis_ref = await addDoc(collection(db, "analysis"), {
            name,
            user: currentUser.uid,
            drivesLink: link,
            imagesDescriptions: [],
            audiosTranscriptions: [],
            imagesResults: [],
            audiosResults: [],
            textsResults: []
          });
          console.log(analysis_ref.id)
          const data = {
            uid: analysis_ref.id,  // Coloca aquí el valor del uid que quieres enviar en la solicitud
            drive_link: link  // Coloca aquí el enlace de Google Drive que quieres enviar en la solicitud
          };

            fetch('https://maggot-fun-skunk.ngrok-free.app/analyze-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error al enviar la solicitud.');
            })
            .then(data => {
                console.log('Respuesta de la API:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

          setName('');
          setLink('');
          setError(false);
          navigate("/processing_analysis")
      }catch(error){
        console.log(error)
      }
      }
      else{
        setError(true);
      }

    };       


    const textStyle = {
        textAlign:'left',
        fontFamily:'monospace',
        my:'10px'
    }

    return (
        <Box sx={{display:{md:'flex'}, mt:{xs:'130px', md:'170px'}}} justifyContent={'center'} gap={'70px'}>
            <Box sx={{m:{xs:'0 auto 30px auto', md:'0'}}} maxWidth={400}  bgcolor={'#424769'} borderRadius={'10px'} p={'10px'} border={'1px black solid'}>
                <Typography textAlign={'center'} fontFamily={'monospace'} mb={'15px'}>
                    <b>¿Cómo exportar el chat de WhatsApp?</b>
                </Typography>
                <Typography sx={textStyle}>
                    1- Ingresa al chat que deseas exportar
                </Typography>
                <Typography sx={textStyle}>
                    2- Presiona los tres puntos en la parte superior derecha
                </Typography>
                <Typography sx={textStyle}>
                    3- Selecciona "Más"
                </Typography>
                <Typography sx={textStyle}>
                    4- Selecciona "Exportar chat"
                </Typography>
                <Typography sx={textStyle}>
                    5- Incluye los archivos multimedia
                </Typography>
                <Typography sx={textStyle}>
                    6- Selecciona la opción de Google Drive
                </Typography>
                <Typography sx={textStyle}>
                    7- Crea una carpeta nueva y guardá los archivos ahí
                </Typography>
                <Typography sx={textStyle}>
                    8- Compartí de manera pública la carpeta a cualquier persona con el link y pegálo en el formulario siguiente
                </Typography>
            </Box>
            <Box sx={{m:{xs:'auto', md:'0'}}} border={'1px black solid'} p={'10px'} borderRadius={'10px'} bgcolor={'#424769'} maxWidth={400} justifyContent={'center'} alignItems={'center'} display={'grid'}>
                <Box>
                    <Typography mb={'15px'} textAlign={'center'} fontFamily={'monospace'}>
                        Ingrese un nombre para el análisis o la conversación
                    </Typography>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        onChange={handleNameChange}
                        sx={{bgcolor:'#676f9d', borderRadius:'5px'}}
                    />                    
                </Box>
                <Box>
                    <Typography mb={'15px'} mt={'25px'} textAlign={'center'} fontFamily={'monospace'}>
                        Ingrese el link de la carpeta de Google drive
                    </Typography>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="link"
                        label="Link"
                        name="link"
                        onChange={handleLinkChange}
                        sx={{bgcolor:'#676f9d', borderRadius:'5px'}}
                    />     
                </Box>
                {error && <Typography color={'white'} textAlign={'center'}>Por favor, complete todos los espacios</Typography>}
                <Box mt={'20px'} display={'flex'} justifyContent={'center'}>
                    <Button onClick={handleSubmit} variant="contained">
                        Analizar
                    </Button>  
                </Box>
                
            </Box>
        </Box>
    );
}

export default NewAnalysis;