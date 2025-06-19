'use client';

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 20, marginBottom: 10 },
  detail: { marginBottom: 6, fontSize: 12 },
  poster: { width: 200, height: 300, marginBottom: 10 },
});

export default function MoviePDF({ result }) {
  // Хэрвээ upload хийсэн зураг бол шууд poster_path-ийг ашиглана
  const isUploadedImage =
    result.poster_path &&
    (result.poster_path.startsWith('data:') || result.poster_path.startsWith('blob:'));
  const posterUrl = isUploadedImage
    ? result.poster_path
    : result.poster_path
    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
    : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{result.title || result.name}</Text>
        {posterUrl && <Image src={posterUrl} style={styles.poster} />}
        <Text style={styles.detail}>Тайлбар:</Text>
        <Text>{result.overview || result.description}</Text>
      </Page>
    </Document>
  );
}