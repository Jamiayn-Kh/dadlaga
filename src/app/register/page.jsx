'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Нууц үг шалгах
    if (form.password !== form.confirmPassword) {
      setError('Нууц үг таарахгүй байна.');
      return;
    }

    if (form.password.length < 6) {
      setError('Нууц үг дор хаяж 6 тэмдэгт байх ёстой.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        }),
      });

      if (res.ok) {
        // Амжилттай бүртгүүлсэн бол login хуудас руу шилжүүлэх
        router.push('/login?message=registration_success');
      } else {
        const data = await res.json();
        setError(data.error || 'Бүртгэл амжилтгүй.');
      }
    } catch (err) {
      setError('Серверийн алдаа гарлаа.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2">
            <span className='text-3xl font-bold bg-amber-500 py-2 px-3 rounded-lg text-white'>
              IMDb
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Бүртгүүлэх
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Хэрэглэгчийн нэр"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              disabled={loading}
              minLength={3}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="И-мэйл хаяг"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Нууц үг (дор хаяж 6 тэмдэгт)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Нууц үг баталгаажуулах"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Бүртгүүлж байна...' : 'Бүртгүүлэх'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Аль хэдийн бүртгэлтэй юу?{' '}
            <Link 
              href="/login" 
              className="text-amber-500 hover:text-amber-600 font-semibold hover:underline"
            >
              Нэвтрэх
            </Link>
          </p>
        </div>


      </div>
    </div>
  );
}