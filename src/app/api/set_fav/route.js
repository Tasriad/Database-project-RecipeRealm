import { NextResponse, NextRequest } from 'next/server'
import runQuery from '@/utils/database_manager';

export async function POST(request) {
    try {
        const reqBody = await request.json()
        let { user_id, recipe_id } = reqBody;
        const query = `INSERT INTO favorites (user_id, recipe_id) VALUES (:user_id, :recipe_id)`
        const binds = {
            user_id: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: user_id },
            recipe_id: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: recipe_id }
        }
        const result = await runQuery(query, true, binds);
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 200 })
    }
}