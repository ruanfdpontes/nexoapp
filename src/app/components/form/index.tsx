"use client";

import {
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

import "./index.css";

interface FormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

interface FormFieldProps
  extends InputHTMLAttributes<HTMLInputElement> { 
  label: string; 
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
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? loadingText : submitText}
      </button>
    </div>
  );
}