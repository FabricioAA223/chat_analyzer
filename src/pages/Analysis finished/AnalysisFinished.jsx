import {Box, Typography, Divider, Button} from "@mui/material"
import Results from "./components/Results";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase"
import { AuthContext } from "../../context/AuthContext";

function AnalysisFinished() {
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
                    if (doc.data().imagesDescriptions.length > 0 && 
                        doc.data().audiosTranscriptions.length > 0 && 
                        doc.data().textsResults.length > 0) {
                            analysisInProcess.push(doc.data());
                    }
                });
                setAnalysis(analysisInProcess);
            } else {
                setAnalysis([]);
            }
        };

        fetchAnalysis();
    }, [currentUser.uid]);

    return (
        <Box mt={'130px'} border={'1px black solid'} width={'90%'} mx={'auto'} p={'5px'} borderRadius={'10px'} bgcolor={'#424769'}>
            {analysis.length > 0
            ? <Box>
                {analysis.map((a)=>
                    <Results key={a.name} name={a.name} txtResults={a.textsResults} imgResults={a.imagesResults} 
                    audioResults={a.audiosResults} imgDescriptions={a.imagesDescriptions} audiosTranscriptions={a.audiosTranscriptions}/>
                )}
              </Box>
            : <Typography my={'20px'} textAlign={'center'}>El usuario NO tiene analisis terminados</Typography>}
        </Box>
    );
}

export default AnalysisFinished;