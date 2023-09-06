import OracleDB from "oracledb";
import pool from "./connection_pool";

const config = {
    user: "PROJECT",
    password: "12345",
    connectString: "localhost:1521/orclpdb",
};
export default async function runQuery(query,commit = false,binds = {}) {
    const connection = await pool.acquire();
    try{
    const result = await connection.execute(query,binds,{outFormat: OracleDB.OUT_FORMAT_OBJECT});
    if(commit){
        await connection.commit();
    }
    return result;
    }
    catch(err){
        console.log(err)
        throw err;
    }
    finally{
        pool.release(connection);
    }
    // await connection.close();
}
export async function closeConnection(){
}