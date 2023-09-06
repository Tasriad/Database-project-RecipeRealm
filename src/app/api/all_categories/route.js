import { NextResponse } from "next/server";
import oracledb from "oracledb";
import runQuery from "@/utils/database_manager";
import { closeConnection } from "@/utils/database_manager";

export async function GET(request) {
    try {
        const query = `
            BEGIN
            ALL_CATEGORIES(:STATUS,:CATEGORIES_CR);
            END;`;
        const binds = {
            STATUS: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            CATEGORIES_CR: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
        }
        const result = await runQuery(query, false, binds);
        if (result.outBinds.STATUS !== "SUCCESSFUL") {
            throw new Error(result.outBinds.STATUS);
        }
        const catagorySet = result.outBinds.CATEGORIES_CR;
        let catagory;
        let catagorys = [];
        while ((catagory = await catagorySet.getRow())) {
            catagorys.push(catagory);
        }
        catagorySet.close();
         closeConnection();
        return NextResponse.json({ data: catagorys, success: true });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: err.message, succss: false }, { status: 200 });
    }
}