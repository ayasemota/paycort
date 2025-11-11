interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   message: string;
}

export default function Modal({ isOpen, onClose, title, message }: ModalProps) {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 px-4 animate-fadeInUp backdrop-blur-sm">
         <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-scaleIn shadow-2xl border border-green-100/20">
            <div className="flex items-center justify-center w-16 h-16 bg-green-200/10 rounded-full mx-auto mb-4">
               <svg className="w-8 h-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-200 mb-4 text-center">{title}</h2>
            <p className="text-black mb-6 text-center">{message}</p>
            <button onClick={onClose} className="py-3 px-8 rounded-lg bg-green-200 text-white hover:bg-green-100 hover:scale-105 transition-all duration-300 w-full font-medium shadow-md hover:shadow-lg">Close</button>
         </div>
      </div>
   );
}