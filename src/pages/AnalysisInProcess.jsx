import {Typography, Box, Divider} from "@mui/material"
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext';


function AnalysisInProcess() {
    const { currentUser } = useContext(AuthContext);
    const [analysis, setAnalysis] = useState([]);

    useEffect(() => {
        const fetchAnalysis = async () => {
            const analysisRef = collection(db, "analysis");
            const q = query(analysisRef, where("user", "==", currentUser.uid));
            const querySnapshot = await getDocs(q);

            
            if (!querySnapshot.empty) {
                const analysisInProcess = []
                // Si hay análisis, actualiza el estado y verifica si alguno tiene imagesResults
                querySnapshot.forEach(doc => {
                    if (doc.data().imagesResults.length == 0 || 
                        doc.data().audiosResults.length == 0 ||
                        doc.data().textsResults.length == 0) {
                            analysisInProcess.push(doc.data().name);
                    }
                });
                setAnalysis(analysisInProcess);
            } else {
                setAnalysis([]);
            }
        };

        return () => {
            fetchAnalysis();
        };
    }, [currentUser.uid]);

    return (
        <Box mt={'130px'}>
            {analysis.length > 0
            ? <Box>
                {analysis.map((a)=>
                <Box key={a} border={'1px black solid'} maxWidth={500} mx={'auto'} mt={'40px'} p={'5px'} borderRadius={'10px'} bgcolor={'lightgray'}>
                    <Typography mx={'auto'} textAlign={'center'} fontFamily={'cursive'}><b>El analisis "{a}" está en proceso</b></Typography>
                    <Divider sx={{bgcolor:'black'}}/>
                    <Typography my={'10px'} mx={'auto'} textAlign={'center'} fontFamily={'cursive'}>Se le notificará al correo electrónico cuando se haya terminado y podrá ver los resultados en el apartado de analysis finished</Typography>
                </Box>)}
              </Box>
            : <Typography textAlign={'center'}>El usuario NO tiene analisis en proceso</Typography>}
        </Box>
        
    );
}

export default AnalysisInProcess;