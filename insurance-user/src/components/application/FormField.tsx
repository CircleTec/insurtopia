import { ApplicationFormField } from '../../types';
import FileUpload from './FileUpload';

interface FormFieldProps {
  field: ApplicationFormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export default function FormField({ field, value, onChange, error }: FormFieldProps) {
  const { id, type, label, placeholder, required, options, validation } = field;

  if (type === 'file') {
    return (
      <FileUpload
        id={id}
        label={label}
        required={required}
        accept="image/*,.pdf,.doc,.docx"
        maxSize={10}
        multiple={true}
        value={value || []}
        onChange={onChange}
        error={error}
      />
    );
  }

  if (type === 'select') {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          id={id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          id={id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5"
        />
        <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        min={validation?.min}
        max={validation?.max}
        pattern={validation?.pattern}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {validation?.message && !error && (
        <p className="text-sm text-gray-500">{validation.message}</p>
      )}
    </div>
  );
}
