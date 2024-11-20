import React, { useState } from "react";
import JsonEditor from "./components/JsonEditor";
import FormPreview from "./components/FormPreview";
import { FormSchema } from "./types/schema";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [isMobilePreviewVisible, setIsMobilePreviewVisible] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Form Generator</h1>
            <button
              onClick={() => setIsMobilePreviewVisible(!isMobilePreviewVisible)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
            >
              {isMobilePreviewVisible ? "Show Editor" : "Show Preview"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-56px)] md:min-h-screen">
          {/* JSON Editor */}
          <div
            className={`w-full md:w-1/2 ${
              isMobilePreviewVisible ? "hidden" : "block"
            } md:block`}
          >
            <div className="h-full p-4">
              <JsonEditor onUpdate={setSchema} />
            </div>
          </div>

          {/* Form Preview */}
          <div
            className={`w-full md:w-1/2 ${
              !isMobilePreviewVisible ? "hidden" : "block"
            } md:block bg-white border-l border-gray-200`}
          >
            <div className="h-full p-4">
              <FormPreview schema={schema} />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
