import React, { useState } from "react";
import {
  useForm,
  SubmitHandler,
  FieldError,
  FieldErrors,
} from "react-hook-form";
import type { FormSchema, FormField } from "../types/schema";

interface FormPreviewProps {
  schema: FormSchema | null;
}
const getErrorMessage = (
  error: FieldError | FieldErrors | undefined,
): string => {
  if (!error) return "";
  return error.message?.toString() || "This field is required";
};

const FormField: React.FC<{
  field: FormField;
  register: any;
  error?: string;
}> = ({ field, register, error }) => {
  const baseInputClass =
    "border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const errorInputClass = error ? "border-red-500" : "border-gray-300";

  switch (field.type) {
    case "text":
    case "email":
      return (
        <input
          type={field.type}
          {...register(field.id, {
            required: field.required,
            pattern: field.validation
              ? {
                  value: new RegExp(field.validation.pattern),
                  message: field.validation.message,
                }
              : undefined,
          })}
          placeholder={field.placeholder}
          className={`${baseInputClass} ${errorInputClass}`}
        />
      );

    case "select":
      return (
        <select
          {...register(field.id, { required: field.required })}
          className={`${baseInputClass} ${errorInputClass}`}
        >
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div className="space-y-2">
          {field.options?.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                value={option.value}
                {...register(field.id, { required: field.required })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      );

    case "textarea":
      return (
        <textarea
          {...register(field.id, { required: field.required })}
          placeholder={field.placeholder}
          className={`${baseInputClass} ${errorInputClass} min-h-[100px]`}
        />
      );

    default:
      return null;
  }
};

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<any> = (data) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    reset();
  };

  if (!schema || !schema.fields) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">Enter a valid schema to see the preview</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg  p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-6"
      >
        <div className="border-b pb-3 md:pb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {schema.formTitle}
          </h1>
          <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-600">
            {schema.formDescription}
          </p>
        </div>

        {schema.fields.map((field) => (
          <div key={field.id} className="space-y-1 md:space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <FormField
              field={field}
              register={register}
              error={getErrorMessage(errors[field.id])}
            />
            {errors[field.id] && (
              <p className="text-xs md:text-sm text-red-600">
                {getErrorMessage(errors[field.id])}
              </p>
            )}
          </div>
        ))}

        <div className="pt-4 flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700
                  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-200 text-gray-700 py-2 px-4 rounded-md
                  hover:bg-gray-300 text-sm md:text-base"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPreview;
