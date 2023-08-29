'use client'
import React, { useState } from 'react';
import Link from "next/link";

interface GeographyProps {
    geography_questions: Array<{
        title: string;
        question: string;
        answers: string[];
        correctAnswer: string;
    }>;
}


const Geography: React.FC<GeographyProps> = ({ geography_questions }) => {

    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(false);
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    const onAnswerSelected = (answer: any, idx: any) => {
        setChecked(true);
        setSelectedAnswerIndex(idx);
        if (answer === geography_questions[activeQuestion].correctAnswer) {
            setSelectedAnswer(true);
        } else {
            setSelectedAnswer(false);
        }
    }

    const nextQuestion = () => {
        setSelectedAnswerIndex(null);
        setResult((prev: any) =>
            selectedAnswer ?
                {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                } : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                }
        );
        if (activeQuestion !== geography_questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0);
            setShowResult(true);
        }
        setChecked(false);
    }



    return (
        <div className=' w-[100%] m-auto p-[3rem]'>
            <div className=' bg-white/50 p-4 text-center'>
                <div className=' mt-6 font-bold text-[2rem] text-slate-800 sm:text-[3rem]'>{geography_questions[activeQuestion].title} Quiz</div>
                <div className=' font-semibold text-[1.1rem] mb-8'><span>Question: </span>{activeQuestion + 1}/{geography_questions.length}</div>
                {!showResult ? (
                    <div className=' flex flex-col gap-10'>
                        <h3 className=' font-semibold text-[1.5rem]'>{geography_questions[activeQuestion].question}</h3>
                        <div className=' flex flex-col gap-5'>
                            {
                                geography_questions[activeQuestion].answers.map((answer: any, index: any) => (
                                    <button key={index} className={selectedAnswerIndex === index ? 'border-4 p-2 bg-slate-800 text-white' : 'border-4 p-2 hover:bg-slate-400'} onClick={() => onAnswerSelected(answer, index)}>{answer}</button>
                                ))
                            }
                            {checked ? (
                                <button className=' p-2 bg-slate-800 text-white' onClick={nextQuestion}>
                                    {activeQuestion !== geography_questions.length - 1 ? "Next" : "Finish"}
                                </button>
                            ) :
                                <button className=' disabled:bg-white border-4 p-2'>{activeQuestion !== geography_questions.length - 1 ? "Next" : "Finish"}</button>
                            }
                        </div>
                    </div>
                ) : (
                    <div className=' flex flex-col'>
                        <h3 className=' font-bold text-[2rem] text-slate-800'>Results</h3>
                        <div className=' font-bold text-[2rem] my-4'>Overall: {(result.score / 25) * 100}%</div>
                        <div>Total Questions: {geography_questions.length}</div>
                        <div>Total Score: {result.score}</div>
                        <div>Correct Answers: {result.correctAnswers}</div>
                        <div>Wrong Answers: {result.wrongAnswers}</div>
                        <button className=' m-5 p-2 bg-slate-800 text-white' onClick={() => window.location.reload()}>Restart</button>
                        <Link href='/' className=' p-3 bg-slate-800 text-white rounded-md'>Go Back</Link>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Geography