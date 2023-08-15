import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import oracledb from 'oracledb';
const config = {
    user: 'UNI',
    password: '12345',
    connectString: 'localhost:1521/orclpdb'
}
export async function GET(request) {
    const token = request.cookies.get('current_user')?.value || ''
    if (token) {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        // let result = await get_favorite(decodedToken.id)
        let result = await get_favorite(834)
        console.log(result)
        if(result.rows.length == 0){
        return NextResponse.json({msg:'no favorite'}, { status: 200 })
        }
        return NextResponse.json({rows:result.rows}, { status: 200 })
    }
    else {
        return NextResponse.json({ msg: "no user" }, { status: 200 })
    }
}

async function get_favorite(id) {
    let connection
    try {
        connection = await oracledb.getConnection(config)
        let result = await connection.execute(
            `SELECT *
            FROM FAVOURITE E JOIN RECIPES R ON E.RECIPE_ID = R.RECIPE_ID WHERE E.USER_ID = ${id}`,
            [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
        )
        await connection.commit();
        return result

    } catch (error) {
        return (error)
    }
    finally {
        connection.close()
    }
}