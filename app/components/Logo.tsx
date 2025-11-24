import Image from "next/image";
export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Image src="/logo.png" alt="Company Logo" width={150} height={50} />
      <p className="font-bold text-2xl text-[#231F20]">PAYCORT</p>
    </div>
  );
}