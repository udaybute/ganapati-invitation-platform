export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  const { slug } = await searchParams;
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-amber-50">
      <p className="text-4xl mb-3">🙏</p>
      <h1 className="text-2xl font-bold text-amber-900">धन्यवाद!</h1>
      <p className="text-amber-700 mt-2 max-w-sm">
        तुमचे निमंत्रण मिळाले आहे. मंजुरी मिळाल्यानंतर तुमची लिंक तयार होईल — आम्ही लवकरच तुम्हाला कळवू.
      </p>
      {slug && (
        <p className="text-amber-500 text-sm mt-4">
          तुमची भविष्यातील लिंक: <span className="font-mono">yoursite.com/{slug}</span>
        </p>
      )}
    </main>
  );
}
