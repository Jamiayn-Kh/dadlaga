import prisma from '@/lib/db';
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
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return Response.json(
        { error: 'И-мэйл эсвэл хэрэглэгчийн нэр аль хэдийн ашиглагдаж байна' }, 
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        username: true,
        email: true,
        created_at: true
      }
    });

    return Response.json({ 
      message: 'Амжилттай бүртгэгдлээ',
      user: newUser 
    }, { status: 201 });

  } catch (err) {
    console.error('Registration error:', err);
    
    // Prisma unique constraint error
    if (err.code === 'P2002') {
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