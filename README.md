# Dynamic Form Generator

A React-based dynamic form generator that allows you to create custom forms using JSON schemas. The application features a live preview of the form as you edit the schema, with real-time validation and error handling.

## Features

- Live form preview
- JSON schema validation
- Responsive design for mobile and desktop
- Support for multiple form field types:
  - Text input
  - Email input
  - Select dropdown
  - Radio buttons
  - Textarea
- Field validation with custom patterns
- Error handling and validation messages
- Mobile-friendly interface with toggle view

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Atmalviya/dynamic-form-generator.git
```

2. Install dependencies:
```bash
cd dynamic-form-generator
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

## Example JSON Schemas

### Basic Contact Form
```json
{
  "formTitle": "Contact Form",
  "formDescription": "Please fill out your contact information",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "Enter your email",
      "validation": {
        "pattern": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
        "message": "Please enter a valid email address"
      }
    }
  ]
}
```

### Survey Form
```json
{
  "formTitle": "Customer Survey",
  "formDescription": "Help us improve our services",
  "fields": [
    {
      "id": "satisfaction",
      "type": "radio",
      "label": "How satisfied are you with our service?",
      "required": true,
      "options": [
        {
          "value": "very_satisfied",
          "label": "Very Satisfied"
        },
        {
          "value": "satisfied",
          "label": "Satisfied"
        },
        {
          "value": "neutral",
          "label": "Neutral"
        }
      ]
    },
    {
      "id": "feedback",
      "type": "textarea",
      "label": "Additional Feedback",
      "required": false,
      "placeholder": "Please share your thoughts..."
    }
  ]
}
```

## Local Development Guide

### Project Structure
```
src/
  ├── components/
  │   ├── ErrorBoundary.tsx
  │   ├── FormPreview.tsx
  │   ├── JsonEditor.tsx
  │   └── JsonEditor.css
  ├── types/
  │   └── schema.ts
  ├── App.tsx
  └── main.tsx
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Making Changes

1. The main application logic is in `App.tsx`
2. Form schema types are defined in `types/schema.ts`
3. Component-specific styles are in their respective CSS files
4. Global styles are in `index.css`

### Testing Schema Changes

1. Open the application in your browser
2. Edit the JSON schema in the left panel
3. See live preview updates in the right panel
4. Check for validation errors in the editor panel

