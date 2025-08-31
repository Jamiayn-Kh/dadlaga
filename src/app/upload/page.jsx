"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    pdfFile: null,
    pdfName: "",
  });
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user?.role !== "ADMIN") {
        // Админ биш бол upload хуудсанд оруулахгүй
        router.push('/');
      } else {
        setLoading(false);
      }
    }
  }, [isAuthenticated, authLoading, user, router]);

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setForm({ ...form, pdfFile: file, pdfName: file.name });
    } else {
      setForm({ ...form, pdfFile: null, pdfName: "" });
      alert('Зөвхөн PDF файл сонгоно уу');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    if (!form.title || !form.pdfFile) return;
    if (!user?.id || !user?.role) {
      alert('Хэрэглэгчийн мэдээлэл олдсонгүй');
      return;
    }

    // Next.js API route ашиглах (CORS асуудлыг шийднэ)
    const UPLOAD_ENDPOINT = '/api/upload-pdf';

    try {
      const formData = new FormData();
      formData.append('file', form.pdfFile);
      formData.append('fileName', form.pdfName || form.pdfFile.name);

      // 1) Upload to your S3 server which returns a public/signed URL
      const uploadRes = await fetch(UPLOAD_ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error('Upload error response:', errorText);
        alert('PDF upload амжилтгүй: ' + errorText);
        return;
      }
      
      let uploadData;
      try {
        const responseText = await uploadRes.text();
        console.log('Upload response text:', responseText);
        uploadData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        alert('PDF upload хариу буруу форматтай байна');
        return;
      }
      if (!uploadData.url) {
        alert('Upload server-ээс URL буцаагүй байна');
        return;
      }

      // 2) Create Document record in our DB via API
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          url: uploadData.url,
          createdBy: user.id,
          role: user.role,
        }),
      });

      if (res.ok) {
        setUploaded(true);
        setForm({
          title: '',
          description: '',
          pdfFile: null,
          pdfName: '',
        });
        alert('PDF амжилттай нэмэгдлээ!');
      } else {
        const data = await res.json();
        alert(data.error || 'Алдаа гарлаа');
      }
    } catch (error) {
      console.error('PDF upload error:', error);
      alert('PDF upload үед алдаа гарлаа: ' + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">PDF баримт нэмэх</h1>
      
      <form onSubmit={handlePdfUpload} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Баримтын нэр"
          className="border p-2 rounded w-full"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Тайлбар (сонголт)"
          className="border p-2 rounded w-full"
          value={form.description}
          onChange={handleChange}
        />
        <input type="file" accept="application/pdf" onChange={handlePdfChange} required />
        {form.pdfName && <div className="text-sm text-gray-600">Сонгосон: {form.pdfName}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          PDF Upload
        </button>
      </form>
      
      {uploaded && (
        <div className="mt-6 p-4 bg-green-100 rounded text-green-700">
          PDF амжилттай нэмэгдлээ!
        </div>
      )}
    </div>
  );
}