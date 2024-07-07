import {Typography, Box, Divider, Button} from "@mui/material"
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


function AnalysisInProcess() {
    const { currentUser } = useContext(AuthContext);
    const [analysis, setAnalysis] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (currentUser){
                try{
                    const analysisRef = collection(db, "analysis");
                    const q = query(analysisRef, where("user", "==", currentUser.uid));
                    const querySnapshot = await getDocs(q);
                   
                    if (!querySnapshot.empty) {
                        const analysisInProcess = []
                        // Si hay análisis, actualiza el estado y verifica si alguno tiene imagesResults
                        querySnapshot.forEach(doc => {
                            if (doc.data().imagesDescriptions.length == 0 || 
                                doc.data().audiosTranscriptions.length == 0 ||
                                doc.data().textsResults.length == 0) {
                                    analysisInProcess.push(doc.data().name);
                            }
                        });
                        setAnalysis(analysisInProcess);
                    } else {
                        setAnalysis([]);
                    }
                } catch (err){
                    console.error('Error fetching data:', err);
                }
            }

        };

        fetchAnalysis();
    }, [currentUser]);

    return (
        <Box mt={'130px'} border={'1px black solid'} maxWidth={500} mx={'auto'} p={'5px'} borderRadius={'10px'} bgcolor={'#424769'}>
            {analysis.length > 0
            ? <Box >
                {analysis.map((a)=>
                <Box key={a} border={'1px black solid'} maxWidth={500} mx={'auto'} my={analysis.length>1?'20px':'0px'} p={'5px'} borderRadius={'10px'} bgcolor={'#676f9d'}>
                    <Typography mx={'auto'} textAlign={'center'} fontFamily={'monospace'}><b>El analisis "{a}" está en proceso</b></Typography>
                    <Divider sx={{bgcolor:'black'}}/>
                    <Typography my={'10px'} mx={'auto'} textAlign={'center'}>Se le notificará al correo electrónico cuando se haya terminado y podrá ver los resultados en el apartado de analysis finished</Typography>
                </Box>)}
              </Box>
            : <Typography my={'20px'} textAlign={'center'}>El usuario NO tiene analisis en proceso</Typography>}
            <Box my={'10px'} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" onClick={()=>{navigate('/analysis_finished')}}>
                    Análisis terminados
                </Button>
            </Box>
        </Box>
        
    );
}

export default AnalysisInProcess;