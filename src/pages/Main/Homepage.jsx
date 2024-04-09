import { Button, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {useNavigate} from "react-router-dom"

// import DriveFolderList from "../TestDrive/DriveFolderList";


export const HomePage = () => {
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    return(
        <Box>
            <Box bgcolor={'lightblue'} mt={'150px'} mx={'auto'} alignItems={'center'} justifyContent={'center'} display={'flex'} height={'100px'} sx={{width:{xs:'90%', md:'600px'}}} borderRadius={'10px'} border={'1px black solid'}>
                <Typography textAlign={'center'} variant={'h1'} fontFamily={'monospace'} fontSize={'35px'} >
                    <b>¡Hola <em>{currentUser.displayName}</em>, bienvenid@ a ChatAnalyzer!</b>
                </Typography>
            </Box>
            <Box my={'20px'} mx={'auto'} alignItems={'center'} justifyContent={'center'} display={'flex'} sx={{width:{xs:'90%', md:'900px'}}}>
                <Typography textAlign={'center'} variant={'h1'} fontFamily={'monospace'} fontSize={'28px'}>
                    En nuestra app, podrás analizar conversaciones de WhatsApp y obtener resultados que incluyen
                    las categorias o temas que contienen los mensajes de la conversación 
                </Typography>
            </Box>
            <Box mx={'auto'} alignItems={'center'} justifyContent={'center'} display={'flex'} sx={{width:{xs:'90%', md:'900px'}}}>
                <Typography textAlign={'center'} variant={'h1'} fontFamily={'monospace'} fontSize={'28px'}>
                    ¡Además de que es posible
                    también exportar las imágenes y audios para que también sean analizados!
                </Typography>                
            </Box>
            <Box mt={'20px'} mx={'auto'} alignItems={'center'} justifyContent={'center'} display={'flex'} >
                <Button variant="contained" size="large" onClick={()=>{navigate('/new_analysis')}}>
                    ¡Inténtalo!
                </Button>
            </Box>
        </Box>
    );
}