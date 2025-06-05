import client from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return Response.json(
        { error: 'Бүх талбарыг бөглөнө үү' }, 
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: 'Нууц үг дор хаяж 6 тэмдэгт байх ёстой' }, 
        { status: 400 }
      );
    }

    // И-мэйл форматыг шалгах
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'И-мэйлийн формат буруу байна' }, 
        { status: 400 }
      );
    }

    // Хэрэглэгч аль хэдийн байгаа эсэхийг шалгах
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2', 
      [email, username]
    );

    if (existingUser.rowCount > 0) {
      return Response.json(
        { error: 'И-мэйл эсвэл хэрэглэгчийн нэр аль хэдийн ашиглагдаж байна' }, 
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, hashedPassword]
    );

    return Response.json({ 
      message: 'Амжилттай бүртгэгдлээ',
      user: result.rows[0] 
    }, { status: 201 });

  } catch (err) {
    console.error('Registration error:', err);
    
    // Database constraint error
    if (err.code === '23505') {
      return Response.json(
        { error: 'И-мэйл эсвэл хэрэглэгчийн нэр аль хэдийн бүртгэгдсэн байна' }, 
        { status: 409 }
      );
    }

    return Response.json(
      { error: 'Серверийн алдаа гарлаа' }, 
      { status: 500 }
    );
  }
}