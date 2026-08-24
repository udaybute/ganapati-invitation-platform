type LocationProps = {
  mandalName: string;
  address: string;
  contact: string;
  mapEmbedUrl: string; // Google Maps embed link, generated per client
  mapsLink: string;
};

export default function Location({ mandalName, address, contact, mapEmbedUrl, mapsLink }: LocationProps) {
  return (
    <section className="px-6 py-12 text-center bg-amber-900">
      <h2 className="text-2xl font-bold text-amber-100">कार्यक्रम स्थळ</h2>
      <p className="text-amber-300 text-sm mt-1">गणरायाच्या दर्शनासाठी आपले सहर्ष स्वागत आहे</p>

      <div className="max-w-md mx-auto mt-6 rounded-xl overflow-hidden border border-amber-700">
        <iframe src={mapEmbedUrl} className="w-full h-48 border-0" loading="lazy" />
      </div>

      <h3 className="text-xl font-semibold text-amber-100 mt-6">{mandalName}</h3>
      <p className="text-amber-300 text-sm mt-2">📍 {address}, {contact}</p>

      <a
        href={mapsLink}
        target="_blank"
        className="inline-block mt-5 px-7 py-3 rounded-full bg-amber-400 text-amber-900 font-medium"
      >
        Open in Google Maps ↗
      </a>
    </section>
  );
}
