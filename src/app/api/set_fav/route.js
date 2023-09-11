import { NextResponse, NextRequest } from 'next/server'
import runQuery from '@/utils/database_manager';
import oracledb from 'oracledb';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { recipe_id } = reqBody;
        const token = request.cookies.get('current_user')?.value || ''
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const user_id = decoded.id;
        const query = `INSERT INTO favorite (user_id, recipe_id) VALUES (:user_id, :recipe_id)`
        const binds = {
            user_id: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            recipe_id: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: recipe_id }
        }
        console.log(binds)
        const result = await runQuery(query, true, binds);
        return NextResponse.json({ message: 'success', success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 200 })
    }
}