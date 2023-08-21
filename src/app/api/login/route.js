import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import oracledb from 'oracledb';
const config = {
    user: 'UNI',
    password: '12345',
    connectString: 'localhost:1521/orclpdbt'
}
export async function POST(request) {
    try {
        const reqBody = await request.json()
        let { email, password } = reqBody;
        const user = await get_user_email(email);
        if (user.rows.length == 0) {
            console.log("user does not exist")
            throw new Error("user does not exist")
        }
        const password_to_check = (user.rows[0].PASSWORD).replace('"', '')
        password = password.replace('"', '')
        if (password != password_to_check) {
            console.log("password does not match")
            throw new Error("password does not match")
        }
        const tokenData = {
            "id": user.rows[0].USER_ID,
            "email": user.rows[0].EMAIL_ADDRESS,
            "first_name": user.rows[0].FIRST_NAME,
            "last_name": user.rows[0].LAST_NAME,
            "profile_pic": user.rows[0].PROFILE_PICTURE,
            "regis_date": user.rows[0].REGISTRATION_DATE
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "7d" })
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set(process.env.TOKEN_NAME, token, {
            httpOnly: true,
        })
        return response

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}




async function get_user_email(mail) {
    let connection
    const TABLE = "USERS"
    try {
        connection = await oracledb.getConnection(config)
        let result = await connection.execute(
            `SELECT * FROM ${TABLE} WHERE email_address = '${mail}'`,
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
