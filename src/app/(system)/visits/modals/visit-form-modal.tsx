"use client";

import Modal from "@/app/components/modal";
import Visit from "@/app/interfaces/visit.interface";
import VisitFormPartial from "../partials/visit-form-partial";

interface VisitFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  visit?: Visit | null;
}

export default function VisitFormModal({
  open,
  onClose,
  onSuccess,
  visit = null,
}: VisitFormModalProps) {
  const isEditing = !!visit;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        isEditing
          ? "Editar visita"
          : "Adicionar visita"
      }
      width="large"
    >
      <VisitFormPartial
        visit={visit}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}