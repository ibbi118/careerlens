import { useRef, useState } from 'react';
import { UploadCloud, FileText, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ onFileChange, accept = '.pdf', label, error, required }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    onFileChange?.(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    onFileChange?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <AnimatePresence mode="wait">
        {file ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">{file.name}</p>
              <p className="text-xs text-text-muted mt-0.5">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
            <button
              type="button"
              onClick={removeFile}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:bg-white hover:text-red-500 transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`
              flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
              ${dragging
                ? 'border-primary bg-primary/5 scale-[1.01]'
                : 'border-border hover:border-primary/50 hover:bg-bg'
              }
              ${error ? 'border-red-300' : ''}
            `}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${dragging ? 'bg-primary text-white' : 'bg-bg text-text-muted'}`}>
              <UploadCloud size={22} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-text">
                {dragging ? 'Drop your file here' : 'Click or drag & drop'}
              </p>
              <p className="text-xs text-text-muted mt-1">
                PDF files up to 10MB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;
