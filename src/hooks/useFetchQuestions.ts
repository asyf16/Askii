import { useState, useEffect } from "react";
import { GeneratedQuestionsArray } from "@/types/types";

export function useFetchQuestions(resume: string, technical: string, behavorial:string, jobTitle:string){
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<GeneratedQuestionsArray>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try{
                const response =  await fetch("/api/generatePrompt", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ behavorial, resume, technical, jobTitle }),
                  });
                const json = await response.json();
                setQuestions(JSON.parse(json));
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