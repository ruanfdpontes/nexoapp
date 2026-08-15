"use client";

import {
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
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

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
  ...props
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
        {...props}
      />
    </div>
  );
}

export function FormTextarea({
  label,
  name,
  value,
  placeholder,
  required = false,
  disabled = false,
  onChange,
  rows = 4,
  ...props
}: FormTextareaProps) {
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

      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        rows={rows}
        {...props}
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