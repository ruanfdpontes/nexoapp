"use client";

import {
  FormEvent,
  ReactNode,
} from "react";

import "./index.css";

interface FormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "number" | "password";
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

interface FormActionsProps {
  onCancel?: () => void;
  loading?: boolean;
  submitText?: string;
  loadingText?: string;
}

export function Form({
  children,
  onSubmit,
  className = "",
}: FormProps) {
  return (
    <form
      className={`form ${className}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  disabled = false,
  onChange,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={name}>
        {label}

        {required && (
          <span className="form-required">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

export function FormActions({
  onCancel,
  loading = false,
  submitText = "Salvar",
  loadingText = "Salvando...",
}: FormActionsProps) {
  return (
    <div className="form-actions">
      {onCancel && (
        <button
          type="button"
          className="form-button form-button-cancel"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
      )}

      <button
        type="submit"
        className="form-button form-button-submit"
        disabled={loading}
      >
        {loading ? loadingText : submitText}
      </button>
    </div>
  );
}