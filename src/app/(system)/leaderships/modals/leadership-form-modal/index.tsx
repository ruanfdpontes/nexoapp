"use client";

import Modal from "@/app/components/modal";
import LeadershipFormPartial from "../../partials/leadership-form-partial";
import { Leadership } from "@/app/interfaces/leadership.interface";

interface LeadershipFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  leadership?: Leadership | null;
}

export default function LeadershipFormModal({
  open,
  onClose,
  onSuccess,
  leadership = null,
}: LeadershipFormModalProps) {
  const isEditing = !!leadership;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Editar liderança" : "Adicionar liderança"}
      width="large"
    >
      <LeadershipFormPartial
        leadership={leadership}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}