import { Button, Typography, Box, useTheme } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {useNavigate} from "react-router-dom"

// import DriveFolderList from "../TestDrive/DriveFolderList";


export const HomePage = () => {
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    // const theme = useTheme();
    return(
        <Box>
            <Box py={'15px'} mt={'150px'} mx={'auto'} alignItems={'center'} justifyContent={'center'} display={'flex'} sx={{width:{xs:'90%', md:'600px'}, bgcolor:'#424769'}} borderRadius={'10px'} border={'1px black solid'}>
                <Typography color={'white'} textAlign={'center'} variant={'h3'} >
                    <b>¡Hola <span style={{color:'#f9b174'}}><em>{currentUser.displayName}</em></span>, bienvenid@ a ChatAnalyzer!</b>
                </Typography>
            </Box>
            <Box my={'20px'} mx={'auto'} alignItems={'center'} justifyContent={'center'} display={'flex'} sx={{width:{xs:'90%', md:'900px'}}}>
                <Typography color={'white'} textAlign={'center'} variant={'h4'} fontFamily={'monospace'}>
                    En nuestra app, podrás analizar conversaciones de WhatsApp y obtener resultados que incluyen
                    las categorias o temas que contienen los mensajes de la conversación 
                </Typography>
            </Box>
            <Box mx={'auto'} alignItems={'center'} justifyContent={'center'} display={'flex'} sx={{width:{xs:'90%', md:'900px'}}}>
                <Typography color={'white'} textAlign={'center'} variant={'h4'} fontFamily={'monospace'}>
                    ¡Además de que es posible
                    también exportar las imágenes y audios para que también sean analizados!
                </Typography>                
            </Box>
            <Box mt={'20px'} mx={'auto'} alignItems={'center'} justifyContent={'center'} display={'flex'} >
                <Button color="primary" variant="contained" size="large" onClick={()=>{navigate('/new_analysis')}}>
                    ¡Inténtalo!
                </Button>
            </Box>
        </Box>
    );
}