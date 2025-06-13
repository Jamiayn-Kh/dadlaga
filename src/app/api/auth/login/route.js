import prisma from '@/lib/db'; // Энэ бол PrismaClient
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { error: 'И-мэйл болон нууц үг шаардлагатай' },
        { status: 400 }
      );
    }

    // Prisma ашиглан хэрэглэгчийг хайна
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json(
        { error: 'Хэрэглэгч олдсонгүй' },
        { status: 404 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return Response.json(
        { error: 'Буруу нууц үг' },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    return Response.json(
      {
        message: 'Амжилттай нэвтэрлээ',
        user: userWithoutPassword,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('Login error:', err);
    return Response.json(
      { error: 'Серверийн алдаа гарлаа' },
      { status: 500 }
    );
  }
}
