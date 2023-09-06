import { NextRequest, NextResponse } from "next/server";
import runQuery, { closeConnection } from "@/utils/database_manager.js"
import OracleDB from "oracledb";

export async function GET (request)
{
    console.log('tagged_recipe api called')
    let tag_ids = request.nextUrl.searchParams.get('tags').split(',')
    tag_ids = tag_ids.map(tag_id => parseInt(tag_id))
    console.log((tag_ids))
    // console.log(await runQuery(`SELECT * FROM tagged_recipe WHERE tag_id IN (${request.query.tags})`))
    return NextResponse.json({data:null}, {status: 200})
}