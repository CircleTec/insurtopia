import { useState, useRef } from 'react';
import { Upload, X, FileText, Check, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  id: string;
  label: string;
  required?: boolean;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  value?: File[];
  onChange: (files: File[]) => void;
  error?: string;
}

export default function FileUpload({
  id,
  label,
  required = false,
  accept = '*/*',
  maxSize = 5,
  multiple = false,
  value = [],
  onChange,
  error
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSize}MB`;
    }

    if (accept !== '*/*') {
      const allowedTypes = accept.split(',').map(t => t.trim());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const mimeType = file.type;

      const isAllowed = allowedTypes.some(allowed => {
        if (allowed.startsWith('.')) {
          return fileExtension === allowed.toLowerCase();
        }
        return mimeType === allowed || mimeType.startsWith(allowed.replace('*', ''));
      });

      if (!isAllowed) {
        return `File type not allowed. Accepted types: ${accept}`;
      }
    }

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const docExtensions = ['.pdf', '.doc', '.docx'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!imageExtensions.includes(fileExt) && !docExtensions.includes(fileExt)) {
      return 'Only image files (JPG, PNG) and documents (PDF, DOC) are allowed';
    }

    return null;
  };

  const handleFiles = (files: FileList) => {
    const newFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        newFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setUploadError(errors[0]);
      setTimeout(() => setUploadError(''), 5000);
      return;
    }

    setUploadError('');
    if (multiple) {
      onChange([...value, ...newFiles]);
    } else {
      onChange([newFiles[0]]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          dragActive
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${error || uploadError ? 'border-red-300 bg-red-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Click to upload
            </button>
            <span className="text-gray-600"> or drag and drop</span>
          </div>
          <p className="text-sm text-gray-500">
            {accept === '*/*' ? 'Any file type' : accept} (max {maxSize}MB)
          </p>
        </div>
      </div>

      {(error || uploadError) && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error || uploadError}</span>
        </div>
      )}

      {value.length > 0 && (
        <div className="space-y-2 mt-4">
          {value.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
