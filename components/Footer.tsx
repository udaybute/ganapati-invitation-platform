import Image from "next/image";

type FooterProps = {
  mandalName: string;
  contact: string;
  address: string;
  instagramUrl?: string;
};

export default function Footer({ mandalName, contact, address, instagramUrl }: FooterProps) {
  return (
    <footer className="px-6 py-12 text-center bg-gradient-to-b from-amber-950 to-black">
      <Image src="/images/ganapati/ganapati-murti.png" alt="" width={70} height={70} className="mx-auto opacity-90" />
      <p className="text-amber-400 text-xs tracking-widest mt-3">श्री गणेशाय नमः</p>
      <h2 className="text-2xl font-bold text-amber-100 mt-1">{mandalName}</h2>
      <p className="text-amber-300 text-sm mt-1">गणपती बाप्पा मोरया!</p>
      <p className="text-amber-500 text-xs mt-1">भक्ती, श्रद्धा आणि एकतेचा उत्सव</p>

      <div className="max-w-xs mx-auto mt-6 flex flex-col gap-3">
        <div className="bg-amber-900/50 rounded-xl px-4 py-3 text-left">
          <p className="text-xs text-amber-400">संपर्क क्रमांक</p>
          <p className="text-amber-100">{contact}</p>
        </div>
        <div className="bg-amber-900/50 rounded-xl px-4 py-3 text-left">
          <p className="text-xs text-amber-400">आपला पत्ता</p>
          <p className="text-amber-100">{address}</p>
        </div>
        {instagramUrl && (
          <a href={instagramUrl} target="_blank" className="bg-amber-900/50 rounded-xl px-4 py-3 text-left">
            <p className="text-xs text-amber-400">Instagram</p>
            <p className="text-amber-100">आमचे Instagram पेज</p>
          </a>
        )}
      </div>

      <p className="text-amber-700 text-xs mt-8">© 2026 {mandalName}. सर्व हक्क राखीव. · Powered by Elvatrixa</p>
    </footer>
  );
}
