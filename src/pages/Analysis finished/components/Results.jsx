import React from 'react'
import {Box, Typography, Divider} from '@mui/material'

function Results(props) {

    return (
        <Box key={props.name} border={'1px black solid'} maxWidth={'90%'} mx={'auto'} mt={'40px'} p={'10px'} borderRadius={'10px'} bgcolor={'lightgray'}>
            <Typography mx={'auto'} textAlign={'center'} fontFamily={'cursive'}><b>Resultados del análisis "{props.name}":</b></Typography>
            <Divider sx={{bgcolor:'black'}}/>
            <Box gap={'10px'} justifyContent={'center'} alignItems={'center'} sx={{display:'flex', '@media (max-width: 640px)': {display: 'inline', width: 'auto'}}}>
                <Box  width={'33%'} m={'auto'} sx={{'@media (max-width: 640px)': {width: 'auto', mt:'10px'}}}>
                    <Typography mx={'auto'} textAlign={'center'} fontFamily={'cursive'}><b>Categorías presentes en el texto</b></Typography>
                    {props.txtResults.map((txtRes) =>
                        <Typography ml={'3px'} key={txtRes} textAlign={'left'}>- {txtRes}</Typography>
                    )}
                </Box>
                <Box px={'5px'} borderLeft={'1px solid black'} borderRight={'1px solid black'} width={'33%'} m={'auto'} sx={{'@media (max-width: 640px)': {width: 'auto', my:'10px', border:'none', px:'0'}}}>
                    <Typography mx={'auto'} textAlign={'center'} fontFamily={'cursive'}><b>Categorías presentes en las imágenes</b></Typography>
                    {props.imgResults.map((imgRes) =>
                        <Typography ml={'3px'} key={imgRes} textAlign={'left'}>- {imgRes}</Typography>
                    )}
                </Box>
                <Box width={'33%'} m={'auto'} sx={{'@media (max-width: 640px)': {width: 'auto'}}}>
                    <Typography mx={'auto'} textAlign={'center'} fontFamily={'cursive'}><b>Categorías presentes en los audios</b></Typography>
                    {props.audioResults.map((audioRes) =>
                        <Typography ml={'3px'} key={audioRes} textAlign={'left'}>- {audioRes}</Typography>
                    )}
                </Box>
            </Box>
            
            {/* <Typography my={'10px'} mx={'auto'} textAlign={'center'} fontFamily={'cursive'}>Se le notificará al correo electrónico cuando se haya terminado y podrá ver los resultados en el apartado de analysis finished</Typography> */}
        </Box>
    );
}

export default Results;