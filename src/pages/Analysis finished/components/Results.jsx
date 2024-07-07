import React from 'react'
import {Box, Typography, Divider} from '@mui/material'
import Grafico from './Grafico';

function Results(props) {

    return (
        <Box key={props.name} border={'1px black solid'} maxWidth={'95%'} mx={'auto'} m={'20px auto 70px auto'} p={'10px'} borderRadius={'10px'} bgcolor={'#ffffff'}>
            <Typography textAlign={'center'} fontFamily={'monospace'} color={'black'} fontSize={'30px'}><b>Resultados del análisis "{props.name}":</b></Typography>
            <Divider sx={{bgcolor:'black'}}/>
            <Box alignContent={'center'} alignItems={'center'} justifyContent={'center'}>
                <Box mt={'10px'} >
                    <Typography mx={'auto'} textAlign={'center'} mb={'20px'} color={'#23273d'} fontSize={'20px'}><b>Categorías presentes en el texto</b></Typography>
                    {props.txtResults.length > 0 ?
                    <Grafico data={props.txtResults}/>
                    :props.audiosTranscriptions.length > 0 && <Typography color={'black'} my={'20px'} ml={'3px'} textAlign={'left'}>No se logró categorizar el text</Typography>}
                </Box>
                <Divider sx={{bgcolor:'black', my:'20px'}}/>
                <Box my={'30px'}>
                    <Typography mx={'auto'} textAlign={'center'} mb={'20px'} color={'#23273d'} fontSize={'20px'}><b>Categorías presentes en las imágenes</b></Typography>
                    {props.imgResults.length > 0?
                    <Grafico data={props.imgResults}/>
                    :props.audiosTranscriptions.length > 0 && <Typography color={'black'} my={'20px'} ml={'3px'} textAlign={'left'}>No se logró categorizar las imagenes</Typography>}
                    {props.imgDescriptions.length > 0?
                    <Typography mx={'auto'} textAlign={'center'} m={'20px auto 10px auto'} color={'#23273d'} fontSize={'20px'}><b>Descripciones de las imágenes presentes en el chat</b></Typography>
                    :null}
                    {props.imgDescriptions.map((imgRes) =>
                        <Typography color={'black'} mb={'20px'} ml={'3px'} key={imgRes} textAlign={'left'}>- {imgRes}</Typography>
                    )}
                    
                </Box>
                <Divider sx={{bgcolor:'black', my:'20px'}}/>
                <Box >
                    <Typography mx={'auto'} textAlign={'center'} mb={'20px'} color={'#23273d'} fontSize={'20px'}><b>Categorías presentes en los audios</b></Typography>
                    {props.audioResults.length > 0?
                    <Grafico data={props.audioResults}/>
                    :props.audiosTranscriptions.length > 0 && <Typography color={'black'} my={'20px'} ml={'3px'} textAlign={'left'}>No se logró categorizar el audio</Typography>}
                    {props.audiosTranscriptions.length > 0?
                    <Typography mx={'auto'} textAlign={'center'} m={'20px auto 10px auto'} color={'#23273d'} fontSize={'20px'}><b>Transcripción de los audios presentes en el chat</b></Typography>
                    :null}
                    {props.audiosTranscriptions.map((audioRes) =>
                        <Typography color={'black'} my={'20px'} ml={'3px'} key={audioRes} textAlign={'left'}>- {audioRes}</Typography>
                    )}   
                </Box>
            </Box>
        </Box>
    );
}

export default Results;