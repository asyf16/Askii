import { useState, useEffect } from "react";
export function useFetchQuestions(resume: string, technical: string, behavorial:string){
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try{
                const response =  await fetch("/api/generatePrompt", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ behavorial, resume, technical }),
                  });
                const json = await response.json();
                setQuestions(json);
                setLoading(false);
            }
            catch (e) {
                console.log(e);
                setLoading(false);
            }
        }
    
        fetchQuestions();
      }, []);
    
      return { questions, loading };

    }