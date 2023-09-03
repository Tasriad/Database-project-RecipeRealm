import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import oracledb, { NUMBER } from "oracledb";
import runQuery from "@/utils/database_manager";
import { closeConnection } from "@/utils/database_manager";

export async function GET(request) {
    try {
        const id = request.nextUrl.searchParams.get("id")
        let userId;
        const token = request.cookies.get("current_user")?.value || "";
        if (!token) {
            return NextResponse.json({ message: "No token", succss: false }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (id) {
            userId = Number(id);
        }
        else {
            userId = decoded.id;
        }
        const query = `
        BEGIN
        USER_INFO(:ID,:STATUS,:DETAILS,:FOLLOWING,:DIETARY,:FAV_RECIPE,:CREATED_RECIPE);
        END;`;
        const binds = {
            ID: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: userId },
            STATUS: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
            DETAILS: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
            FOLLOWING: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
            DIETARY: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
            FAV_RECIPE: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
            CREATED_RECIPE: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
        }
        const result = await runQuery(query, false, binds);
        if (result.outBinds.STATUS !== "SUCCESSFUL") {
            throw new Error(result.outBinds.STATUS);
        }
        const detailSet = result.outBinds.DETAILS;
        let detail;
        let details = [];
        while ((detail = await detailSet.getRow())) {
            details.push(detail);
        }
        detailSet.close();
        const followingSet = result.outBinds.FOLLOWING;
        let following;
        let followings = [];
        while ((following = await followingSet.getRow())) {
            followings.push(following);
        }
        followingSet.close();
        const dietarySet = result.outBinds.DIETARY;
        let dietary;
        let dietaries = [];
        while ((dietary = await dietarySet.getRow())) {
            dietaries.push(dietary);
        }
        dietarySet.close();
        const favSet = result.outBinds.FAV_RECIPE;
        let fav;
        let favs = [];
        while ((fav = await favSet.getRow())) {
            favs.push(fav);
        }
        favSet.close();
        const createdSet = result.outBinds.CREATED_RECIPE;
        let created;
        let createds = [];
        while ((created = await createdSet.getRow())) {
            createds.push(created);
        }
        createdSet.close();
        closeConnection();
        return NextResponse.json({
            success: true,
            loggedin: decoded.id,
            details: details,
            following: followings,
            dietaries: dietaries,
            created_recipes: createds,
            favorites: favs
        }, { status: 200 });
    }
    catch (err) {
        console.error(err.message);
        return NextResponse.json({
            success: false,
            message: err.message
        }, { status: 200 });
    }
}