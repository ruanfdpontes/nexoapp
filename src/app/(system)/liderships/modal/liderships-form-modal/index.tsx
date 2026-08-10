"use client";

import Modal from "@/app/components/modal";
import LidershipFormPartial from "../../partials/liderships-form-partial";
import { Lidership } from "@/app/interfaces/lidership.interface";

interface LidershipFormModalProps {
  open: boolean;
  onClose: () => void;
  lidership?: Lidership | null;
}

export default function LidershipFormModal({
  open,
  onClose,
  lidership = null,
}: LidershipFormModalProps) {
  const isEditing = !!lidership;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Editar liderança" : "Adicionar liderança"}
      width="large"
    >
      <LidershipFormPartial
        lidership={lidership}
        onCancel={onClose}
      />
    </Modal>
  );
}