export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-4 sm:p-6 bg-green-100">
      <p className="text-center text-white text-base sm:text-[20px]">&copy; {currentYear} | All Rights Reserved</p>
    </footer>
  );
}