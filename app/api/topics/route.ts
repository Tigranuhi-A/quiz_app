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
        const topics = await prisma.topics.findMany();
        return NextResponse.json({message: "Success", topics}, {status: 200});
    } catch (err) {
        return NextResponse.json({message: "Error", err}, {status: 500});
    }  
    finally {
        await prisma.$disconnect();
    }
};


export const POST = async (req:Request, res: NextResponse) => {
   try{
        const {title, image} = await req.json();
        await main();

        const topic = await prisma.topics.create({ data: {title, image}});
        return NextResponse.json({message: "Success", topic}, {status: 201});
   } catch(err) {
        return NextResponse.json({message: "Error", err}, {status: 500});
   } finally {
        await prisma.$disconnect();
   }
   
};