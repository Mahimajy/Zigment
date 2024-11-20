import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { z } from "zod";
import type { FormSchema } from "../types/schema";
import "./JsonEditor.css";
const schemaValidator = z.object({
  formTitle: z.string().min(1, "Form title is required"),
  formDescription: z.string(),
  fields: z.array(
    z.object({
      id: z.string().min(1),
      type: z.enum(["text", "email", "select", "radio", "textarea"]),
      label: z.string().min(1, "Label is required"),
      required: z.boolean(),
      placeholder: z.string().optional(),
      options: z
        .array(
          z.object({
            value: z.string().min(1),
            label: z.string().min(1),
          }),
        )
        .optional(),
      validation: z
        .object({
          pattern: z.string(),
          message: z.string(),
        })
        .optional(),
    }),
  ),
});

const defaultValue: FormSchema = {
  formTitle: "New Form",
  formDescription: "Please fill out this form",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "Enter your email",
      validation: {
        pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
        message: "Please enter a valid email address",
      },
    },
  ],
};

interface JsonEditorProps {
  onUpdate: (schema: FormSchema) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onUpdate }) => {
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState(JSON.stringify(defaultValue, null, 2));
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    handleValidation(code);
  }, []);

  const handleValidation = (jsonString: string) => {
    setIsLoading(true);
    try {
      const parsedJson = JSON.parse(jsonString);
      const validatedSchema = schemaValidator.parse(parsedJson);
      setError(null);
      onUpdate(validatedSchema);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof SyntaxError) {
        setError("Invalid JSON syntax");
      } else {
        setError("Invalid JSON schema");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setCode(value);
    handleValidation(value);
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(code);
      setCode(JSON.stringify(parsed, null, 2));
    } catch (err) {
      console.error("Invalid JSON");
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy JSON", err);
    }
  };
  return (
    <div className="flex flex-col h-screen rounded-lg shadow-lg bg-white">
      <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">
            Form Schema Editor
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Edit the JSON schema to customize your form
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopyJson}
            className={`px-3 py-1 rounded transition-colors ${
              copySuccess
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-500 hover:bg-gray-600"
            } text-white`}
          >
            {copySuccess ? "Copied!" : "Copy JSON"}
          </button>
          <button
            onClick={formatJson}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Format JSON
          </button>
        </div>
      </div>
      {error && (
        <div
          className="p-4 bg-red-50 border-t border-red-200 text-red-600 text-sm"
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 10,
            backgroundColor: "#ffe5e5",
          }}
        >
          {error}
        </div>
      )}
      <div className="flex flex-col flex-grow relative overflow-hidden">
        <div
          className="flex-grow overflow-auto"
          style={{
            maxHeight: "calc(100vh - 150px)",
          }}
        >
          <Editor
            value={code}
            onValueChange={handleChange}
            highlight={(code) => highlight(code, languages.json, "json")}
            padding={16}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              width: "100%",
              backgroundColor: "#ffffff",
            }}
            className="min-h-auto"
            textareaClassName="editor-textarea"
          />
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default JsonEditor;
