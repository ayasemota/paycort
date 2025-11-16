interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 px-4 animate-fadeInUp backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-scaleIn shadow-2xl border border-green-100/20">
        <div
          className={`flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 ${
            type === "success" ? "bg-green-200/10" : "bg-red-500/10"
          }`}
        >
          {type === "success" ? (
            <svg
              className="w-8 h-8 text-green-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
        <h2
          className={`text-2xl font-bold mb-4 text-center ${
            type === "success" ? "text-green-200" : "text-red-500"
          }`}
        >
          {title}
        </h2>
        <p className="text-black mb-6 text-center">{message}</p>
        <button
          onClick={onClose}
          className={`py-3 px-8 rounded-lg text-white hover:scale-105 transition-all duration-300 w-full font-medium shadow-md hover:shadow-lg ${
            type === "success"
              ? "bg-green-200 hover:bg-green-100"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
}
