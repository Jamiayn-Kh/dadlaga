"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function DocumentViewerPage() {
  const params = useParams();
  const id = params?.id;
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Load document info
        const res = await fetch(`/api/documents/${id}`);
        if (res.ok) {
          const data = await res.json();
          setDoc(data);
          
          // View tracking
          if (user?.email) {
            await fetch('/api/watch/add', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ documentId: data.id, userEmail: user.email })
            });
          }
        }
      } catch (error) {
        console.error('Error loading document:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id, user]);



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  if (!doc) return <div className="p-6">Олдсонгүй</div>;

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{doc.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => window.open(doc.url, '_blank')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Шинэ цонхонд нээх
          </button>
          <Link
            href="/documents"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Буцах
          </Link>
        </div>
      </div>
      
      {/* PDF Viewer - Full Screen */}
      <div className="flex-1 w-full relative">
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(doc.url)}&embedded=true#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
          title={doc.title}
          className="w-full h-full absolute inset-0"
          style={{ border: 'none' }}
          allowFullScreen
        />
      </div>
      
      {/* Footer */}
      {doc.description && (
        <div className="bg-white border-t p-4">
          <p className="text-gray-700">{doc.description}</p>
        </div>
      )}
    </div>
  );
}









