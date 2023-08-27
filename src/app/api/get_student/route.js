import Oracledb from "oracledb";
import { NextResponse,NextRequest } from "next/server";
import runQuery from '@/utils/database_manager'
import { closeConnection } from '@/utils/database_manager'
const config = {
    user: "UNIVERSITY",
    password: "12345",
    connectString: "localhost:1521/orclpdb",
};

export async function GET(request) {
    try {
        const query = `BEGIN
        GET_STUDENT(:dept,:num_row,:status, :l_rc);
        end;`;
        const binds = {
            dept: { dir: Oracledb.BIND_IN, type: Oracledb.STRING, val: request.nextUrl.searchParams.get("dept") },
            num_row: { dir: Oracledb.BIND_IN, type: Oracledb.NUMBER, val: Number(request.nextUrl.searchParams.get("num_row")) },
            status: { dir: Oracledb.BIND_OUT, type: Oracledb.STRING, maxSize: 40 },
            l_rc: { dir: Oracledb.BIND_OUT, type: Oracledb.CURSOR }
        }
        // const result = await connection.execute(
        //     query, binds
        //     , { outFormat: Oracledb.OUT_FORMAT_OBJECT }
        // );
        const result = await runQuery(query, false, binds);
        // console.log(result.rows);
        // res.send(result.rows);
        const resultSet = result.outBinds.l_rc;
        // console.log(resultSet.getRow());
        let row;
        let rows = [];
        while ((row = await resultSet.getRow())) {
            rows.push(row);
        }
        await resultSet.close();
        await closeConnection();
        // res.send(rows);
        return NextResponse.json({search : request.nextUrl.searchParams.get("id"), data: rows }, { status: 200 });
    }
    catch (err) {
        console.error(err.message);
        // res.status(500).send(err.message);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}