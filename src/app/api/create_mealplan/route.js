import { NextResponse } from "next/server";
import runQuery from "@/utils/database_manager";

export async function POST(request) {
    const reqBody = await request.json();
    const { title, duration, date, breakfast, lunch, dinner } = reqBody;

    //database query to be added here

    console.log(breakfast, lunch, dinner,title, duration, date);
    return NextResponse.json({
        message: "Mealplan created successfully",
        success: true
    }, { status: 200 })
}