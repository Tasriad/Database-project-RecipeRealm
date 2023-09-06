import { getConnection } from 'oracledb';
import { createPool } from 'generic-pool';

const pool = createPool({
    create: async () => {
        const connection = await getConnection({
            user: "PROJECT",
            password: "12345",
            connectString: "localhost:1521/orclpdb",
        });
        console.log('connection created')
        return connection;
    },
    destroy: async (connection) => {
        await connection.close();
        console.log('connection closed')
    }
});

export default pool;
