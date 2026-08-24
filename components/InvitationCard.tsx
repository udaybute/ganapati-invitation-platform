import Image from "next/image";

type InvitationCardProps = {
  mandalName: string;
  message: string;
};

export default function InvitationCard({ mandalName, message }: InvitationCardProps) {
  return (
    <section className="px-6 py-10 bg-gradient-to-b from-amber-50 to-white">
      <div className="flex justify-center mb-4">
        <Image src="/images/decorations/divider.png" alt="" width={140} height={40} />
      </div>
      <div className="relative max-w-md mx-auto rounded-3xl bg-amber-50 border border-amber-300 px-6 py-8 text-center">
        <Image
          src="/images/decorations/corner.png"
          alt=""
          width={40}
          height={40}
          className="absolute top-3 left-3"
        />
        <Image
          src="/images/decorations/corner.png"
          alt=""
          width={40}
          height={40}
          className="absolute top-3 right-3 -scale-x-100"
        />
        <p className="text-amber-700 text-xs tracking-widest">॥ सप्रेम निमंत्रक ॥</p>
        <h2 className="text-2xl font-bold text-amber-900 mt-3">{mandalName}</h2>
        <div className="w-16 h-0.5 bg-amber-400 mx-auto my-4" />
        <p className="text-amber-800 leading-relaxed">{message}</p>
        <Image
          src="/images/decorations/corner.png"
          alt=""
          width={40}
          height={40}
          className="absolute bottom-3 left-3 scale-y-[-1]"
        />
        <Image
          src="/images/decorations/corner.png"
          alt=""
          width={40}
          height={40}
          className="absolute bottom-3 right-3 -scale-100"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Image src="/images/decorations/divider.png" alt="" width={140} height={40} />
      </div>
    </section>
  );
}
