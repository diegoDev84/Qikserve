// src/components/ItemDetailsModal.tsx
import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    description: string;
  } | null;
}

export default function ItemDetailsModal({
  isOpen,
  onClose,
  item,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Define o foco no modal
    modalRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="bg-white p-4 w-4/5" style={{ maxWidth: "600px" }}>
        <h2 id="modal-title">{item.name}</h2>
        <p>{item.description}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
