export default function Footer() {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="p-6 bg-green-100">
         <p className="text-center text-white text-[20px]">&copy; {currentYear} | All Rights Reserved</p>
      </footer>
   );
}