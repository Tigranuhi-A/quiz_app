import prisma from "@/prisma";
import { NextResponse } from "next/server";


export async function main() {
    try {
        await prisma.$connect();
    } catch(err){
        return Error("Database Connection Unsuccessful");
    }  
}

export const GET = async (req:Request, res: NextResponse) => {
    try{
        await main();
        const ushistory_questions = await prisma.ushistoryQuestions.findMany();
        return NextResponse.json({message: "Success", ushistory_questions}, {status: 200});
    } catch (err) {
        return NextResponse.json({message: "Error", err}, {status: 500});
    }  
    finally {
        await prisma.$disconnect();
    }
};


export const POST = async (req:Request, res: NextResponse) => {
   try{
        const {title, question, answers, correctAnswer} = await req.json();
        await main();

        const ushistory_question = await prisma.ushistoryQuestions.create({ data: {title, question, answers, correctAnswer}});
        return NextResponse.json({message: "Success", ushistory_question}, {status: 201});
   } catch(err) {
        return NextResponse.json({message: "Error", err}, {status: 500});
   } finally {
        await prisma.$disconnect();
   }
   
};