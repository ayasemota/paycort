interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   message: string;
}

export default function Modal({ isOpen, onClose, title, message }: ModalProps) {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
         <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-green-200 mb-4">{title}</h2>
            <p className="text-black mb-6">{message}</p>
            <button onClick={onClose} className="py-3 px-8 rounded-lg bg-green-200 text-white hover:bg-green-100 transition-all duration-300 w-full">Close</button>
         </div>
      </div>
   );
}