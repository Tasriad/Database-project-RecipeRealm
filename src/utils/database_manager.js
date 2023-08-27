import OracleDB from "oracledb";

const config = {
    user: "UNI",
    password: "12345",
    connectString: "localhost:1521/orclpdbt",
};
let connection;
export default async function runQuery(query,commit = false,binds = {}) {
    try {
        OracleDB.getPool();
    }catch(error){
        await OracleDB.createPool(config);
    }
    connection = await OracleDB.getConnection();
    const result = await connection.execute(query,binds,{outFormat: OracleDB.OUT_FORMAT_OBJECT});
    if(commit){
        await connection.commit();
    }   
    // await connection.close();
    return result;
}
export async function closeConnection(){
    await connection.close();
}