import { NextResponse } from "next/server";
import oracledb from "oracledb";
import runQuery from "@/utils/database_manager";
import { closeConnection } from "@/utils/database_manager";

export async function GET(request) {
    try {
        let id = request.nextUrl.searchParams.get("rownum")
        let search = request.nextUrl.searchParams.get("search")
        if (!search) {
            search = ''
        }
        if (!id) {
            id = 0;
        }
        id = Number(id);
        const query = `
            BEGIN
            ALL_RECIPE(:RECIPE_NUM,:SEARCH,:STATUS,:RECIPES_CR);
            END;`;
        const binds = {
            RECIPE_NUM: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: id },
            SEARCH: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: search },
            STATUS: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            RECIPES_CR: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
        }
        const result = await runQuery(query, false, binds);
        if(result.outBinds.STATUS !== "SUCCESSFUL"){
            throw new Error(result.outBinds.STATUS);
        }
        const recipeSet = result.outBinds.RECIPES_CR;
        let recipe;
        let recipes = [];
        while ((recipe = await recipeSet.getRow())) {
            recipes.push(recipe);
        }
        recipeSet.close();
        return NextResponse.json({ data: recipes });

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: err.message, succss: false }, { status: 200 });
    }

}