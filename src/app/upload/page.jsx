"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: null,
  });
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();
  const{user, isAuthenticated, loading:authLoading} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!authLoading){
        if(!isAuthenticated){
            router.push('/login');
        }
        else{
            setLoading(false);
        }
    }
  }, [isAuthenticated, authLoading, router]);

    if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          image: reader.result,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image) return;

    // localStorage-д хадгалах
    const newMovie = {
      id: Date.now(),
      title: form.title,
      overview: form.description,
      poster_path: form.image,
      vote_count: 0,
      release_date: new Date().toISOString().split("T")[0],
    };
    const movies = JSON.parse(localStorage.getItem("movies") || "[]");
    movies.push(newMovie);
    localStorage.setItem("movies", JSON.stringify(movies));

    setUploaded(true);
    setForm({
      title: "",
      description: "",
      image: null,
      imagePreview: null,
    });
  };

  

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Контент нэмэх</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Контентын нэр"
          className="border p-2 rounded w-full"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Контентын тайлбар"
          className="border p-2 rounded w-full"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {form.imagePreview && (
          <img
            src={form.imagePreview}
            alt="Preview"
            className="w-full h-60 object-cover rounded"
          />
        )}
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
        >
          Upload
        </button>
      </form>
      {uploaded && (
        <div className="mt-6 p-4 bg-green-100 rounded text-green-700">
          Контент амжилттай нэмэгдлээ!
        </div>
      )}
    </div>
  );
}