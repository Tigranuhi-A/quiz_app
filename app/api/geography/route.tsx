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
        const geography_questions = await prisma.geographyQuestions.findMany();
        return NextResponse.json({message: "Success", geography_questions}, {status: 200});
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

        const geography_question = await prisma.geographyQuestions.create({ data: {title, question, answers, correctAnswer}});
        return NextResponse.json({message: "Success", geography_question}, {status: 201});
   } catch(err) {
        return NextResponse.json({message: "Error", err}, {status: 500});
   } finally {
        await prisma.$disconnect();
   }
   
};