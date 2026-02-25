import { useState, useRef } from 'react';
import { X, Car, Heart, Home, Plane, Shield, User, Plus, Trash2, GripVertical, CheckCircle, ChevronDown, ChevronUp, Eye, EyeOff, Settings2 } from 'lucide-react';
import { FormField, Product } from '../types';

interface ProductBuilderWizardProps {
  onClose: () => void;
  onCreateProduct: (product: Product) => void;
}

export default function ProductBuilderWizard({ onClose, onCreateProduct }: ProductBuilderWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Car');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [expandedFieldId, setExpandedFieldId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  // Coverage config state
  const [minCoverage, setMinCoverage] = useState(50000);
  const [maxCoverage, setMaxCoverage] = useState(5000000);
  const [defaultDeductible, setDefaultDeductible] = useState(5000);
  const [premiumRate, setPremiumRate] = useState(3.5);

  const [formFields, setFormFields] = useState<FormField[]>([
    { id: '1', label: 'Vehicle Plate No', dataType: 'Text', required: true, validationRules: { pattern: '^[A-Z0-9-]+$', patternMessage: 'Must be uppercase letters and numbers' } },
    { id: '2', label: 'Production Year', dataType: 'Number', required: true, validationRules: { min: 1990, max: 2026 } },
    { id: '3', label: 'Chassis Number', dataType: 'Text', required: true },
    { id: '4', label: 'Vehicle Type', dataType: 'Select', required: true, options: ['Sedan', 'SUV', 'Pickup', 'Van', 'Bus', 'Truck'] },
    { id: '5', label: 'Libite / Ownership Book', dataType: 'File Upload', required: true }
  ]);

  const icons = [
    { name: 'Car', component: Car },
    { name: 'Heart', component: Heart },
    { name: 'Home', component: Home },
    { name: 'Plane', component: Plane },
    { name: 'Shield', component: Shield },
    { name: 'User', component: User }
  ];

  const dataTypes: FormField['dataType'][] = ['Text', 'Number', 'Date', 'Select', 'File Upload'];

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: '',
      dataType: 'Text',
      required: false
    };
    setFormFields([...formFields, newField]);
    setExpandedFieldId(newField.id);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const deleteField = (id: string) => {
    setFormFields(formFields.filter(field => field.id !== id));
    if (expandedFieldId === id) setExpandedFieldId(null);
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragItem.current === null) return;
    const reordered = [...formFields];
    const [removed] = reordered.splice(dragItem.current, 1);
    reordered.splice(index, 0, removed);
    setFormFields(reordered);
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    setDragOverIndex(null);
  };

  // Options editor helpers
  const addOption = (fieldId: string) => {
    const field = formFields.find(f => f.id === fieldId);
    const options = field?.options || [];
    updateField(fieldId, { options: [...options, ''] });
  };

  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    const field = formFields.find(f => f.id === fieldId);
    const options = [...(field?.options || [])];
    options[optionIndex] = value;
    updateField(fieldId, { options });
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    const field = formFields.find(f => f.id === fieldId);
    const options = [...(field?.options || [])];
    options.splice(optionIndex, 1);
    updateField(fieldId, { options });
  };

  const validateStep1 = (): boolean => {
    const errors: string[] = [];
    if (!productName.trim()) errors.push('Product Name is required');
    if (!productCode.trim()) errors.push('Product Code is required');
    if (!description.trim()) errors.push('Description is required');
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: string[] = [];
    if (formFields.length === 0) errors.push('At least one form field is required');
    const hasEmptyLabels = formFields.some(field => !field.label.trim());
    if (hasEmptyLabels) errors.push('All fields must have labels');
    const selectsWithoutOptions = formFields.filter(f => f.dataType === 'Select' && (!f.options || f.options.length === 0));
    if (selectsWithoutOptions.length > 0) errors.push('Select fields must have at least one option');
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setValidationErrors([]);
    setCurrentStep(currentStep + 1);
  };

  const handlePublish = () => {
    const newProduct: Product = {
      id: `PROD-${Date.now()}`,
      name: productName,
      code: productCode,
      icon: selectedIcon,
      status: 'Live',
      description: description,
      activePolicies: 0,
      riskRules: 0,
      formFields: formFields,
      coverageConfig: { minCoverage, maxCoverage, defaultDeductible, premiumRate }
    };
    onCreateProduct(newProduct);
    setShowSuccessModal(true);
  };

  const renderStepIndicator = () => {
    const steps = ['Basic Info', 'Form Builder', 'Coverage', 'Review'];
    return (
      <div className="flex items-center justify-center gap-4 mb-12">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          return (
            <div key={stepNumber} className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${isCompleted ? 'bg-emerald-600 text-white' :
                    isActive ? 'bg-emerald-600 text-white' :
                      'bg-gray-200 text-gray-500'
                  }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                </div>
                <span className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 ${isCompleted ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside space-y-1">
            {validationErrors.map((error, idx) => (
              <li key={idx} className="text-sm text-red-700">{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g., Motor Comprehensive"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Code</label>
        <input
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          placeholder="e.g., MTR-01"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the product..."
          rows={4}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Icon</label>
        <div className="grid grid-cols-6 gap-4">
          {icons.map(({ name, component: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedIcon(name)}
              className={`p-6 rounded-xl border-2 transition-all ${selectedIcon === name
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
                }`}
            >
              <Icon className={`w-8 h-8 mx-auto ${selectedIcon === name ? 'text-emerald-600' : 'text-gray-600'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid grid-cols-2 gap-8 h-full">
      {/* Left: Live Preview */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        {validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</p>
            <ul className="list-disc list-inside space-y-1">
              {validationErrors.map((error, idx) => (
                <li key={idx} className="text-sm text-red-700">{error}</li>
              ))}
            </ul>
          </div>
        )}
        <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Form Preview</h3>
        <div className="space-y-4">
          {formFields.map((field) => (
            <div key={field.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {field.label || 'Untitled Field'}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.conditionalLogic?.enabled && (
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <EyeOff className="w-3 h-3" /> Conditional
                  </span>
                )}
              </div>
              {field.dataType === 'Text' && (
                <input type="text" disabled className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" placeholder={field.validationRules?.pattern ? `Pattern: ${field.validationRules.pattern}` : 'Text input'} />
              )}
              {field.dataType === 'Number' && (
                <input type="number" disabled className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" placeholder={field.validationRules?.min !== undefined ? `${field.validationRules.min} – ${field.validationRules.max}` : 'Number input'} />
              )}
              {field.dataType === 'Date' && (
                <input type="date" disabled className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" />
              )}
              {field.dataType === 'Select' && (
                <select disabled className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm">
                  <option>Select option...</option>
                  {field.options?.map((opt, i) => <option key={i}>{opt}</option>)}
                </select>
              )}
              {field.dataType === 'File Upload' && (
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 border-dashed rounded text-sm text-gray-500">
                  📎 Choose file...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Field Configuration */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Field Configuration</h3>
          <button
            onClick={addField}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Field
          </button>
        </div>

        <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2">
          {formFields.map((field, index) => {
            const isExpanded = expandedFieldId === field.id;
            return (
              <div
                key={field.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-xl border transition-all ${dragOverIndex === index ? 'border-emerald-500 shadow-md scale-[1.01]' : 'border-gray-200'
                  }`}
              >
                {/* Field Header */}
                <div className="flex items-center gap-3 p-4">
                  <div className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 w-5">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                      placeholder="Field label..."
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <select
                    value={field.dataType}
                    onChange={(e) => updateField(field.id, { dataType: e.target.value as FormField['dataType'] })}
                    className="px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {dataTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                  <button
                    onClick={() => setExpandedFieldId(isExpanded ? null : field.id)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Advanced settings"
                  >
                    <Settings2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={() => deleteField(field.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                {/* Expanded Advanced Panel */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-4 space-y-4 bg-gray-50/50 rounded-b-xl">
                    {/* Required toggle */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <label className="text-sm font-medium text-gray-700">Required Field</label>
                    </div>

                    {/* Validation rules for Text */}
                    {field.dataType === 'Text' && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Validation</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Regex Pattern</label>
                            <input
                              type="text"
                              value={field.validationRules?.pattern || ''}
                              onChange={(e) => updateField(field.id, {
                                validationRules: { ...field.validationRules, pattern: e.target.value }
                              })}
                              placeholder="e.g. ^[A-Z]+$"
                              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Error Message</label>
                            <input
                              type="text"
                              value={field.validationRules?.patternMessage || ''}
                              onChange={(e) => updateField(field.id, {
                                validationRules: { ...field.validationRules, patternMessage: e.target.value }
                              })}
                              placeholder="Invalid format"
                              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Validation rules for Number */}
                    {field.dataType === 'Number' && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Validation</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Min Value</label>
                            <input
                              type="number"
                              value={field.validationRules?.min ?? ''}
                              onChange={(e) => updateField(field.id, {
                                validationRules: { ...field.validationRules, min: e.target.value ? Number(e.target.value) : undefined }
                              })}
                              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Max Value</label>
                            <input
                              type="number"
                              value={field.validationRules?.max ?? ''}
                              onChange={(e) => updateField(field.id, {
                                validationRules: { ...field.validationRules, max: e.target.value ? Number(e.target.value) : undefined }
                              })}
                              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Options editor for Select */}
                    {field.dataType === 'Select' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Select Options</p>
                          <button
                            onClick={() => addOption(field.id)}
                            className="text-xs text-emerald-600 font-semibold hover:text-emerald-700"
                          >
                            + Add Option
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {(field.options || []).map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 w-5">{optIdx + 1}.</span>
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => updateOption(field.id, optIdx, e.target.value)}
                                placeholder="Option value"
                                className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                              <button
                                onClick={() => removeOption(field.id, optIdx)}
                                className="p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          {(!field.options || field.options.length === 0) && (
                            <p className="text-xs text-gray-400 italic">No options defined. Click "+ Add Option" above.</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Conditional Logic */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> Conditional Visibility
                        </p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={field.conditionalLogic?.enabled || false}
                            onChange={(e) => updateField(field.id, {
                              conditionalLogic: {
                                enabled: e.target.checked,
                                triggerFieldId: field.conditionalLogic?.triggerFieldId || '',
                                operator: field.conditionalLogic?.operator || '=',
                                value: field.conditionalLogic?.value || ''
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                      </div>
                      {field.conditionalLogic?.enabled && (
                        <div className="grid grid-cols-3 gap-2 bg-purple-50 p-3 rounded-lg border border-purple-200">
                          <div>
                            <label className="text-xs text-purple-700 mb-1 block font-medium">Show when</label>
                            <select
                              value={field.conditionalLogic.triggerFieldId}
                              onChange={(e) => updateField(field.id, {
                                conditionalLogic: { ...field.conditionalLogic!, triggerFieldId: e.target.value }
                              })}
                              className="w-full px-2 py-1.5 bg-white border border-purple-200 rounded text-xs focus:ring-2 focus:ring-purple-400"
                            >
                              <option value="">Select field...</option>
                              {formFields.filter(f => f.id !== field.id).map(f => (
                                <option key={f.id} value={f.id}>{f.label || 'Untitled'}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-purple-700 mb-1 block font-medium">Operator</label>
                            <select
                              value={field.conditionalLogic.operator}
                              onChange={(e) => updateField(field.id, {
                                conditionalLogic: { ...field.conditionalLogic!, operator: e.target.value as any }
                              })}
                              className="w-full px-2 py-1.5 bg-white border border-purple-200 rounded text-xs focus:ring-2 focus:ring-purple-400"
                            >
                              <option value="=">equals</option>
                              <option value="!=">not equals</option>
                              <option value=">">greater than</option>
                              <option value="<">less than</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-purple-700 mb-1 block font-medium">Value</label>
                            <input
                              type="text"
                              value={field.conditionalLogic.value}
                              onChange={(e) => updateField(field.id, {
                                conditionalLogic: { ...field.conditionalLogic!, value: e.target.value }
                              })}
                              placeholder="value"
                              className="w-full px-2 py-1.5 bg-white border border-purple-200 rounded text-xs focus:ring-2 focus:ring-purple-400"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Step 3: Coverage Configuration
  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Coverage Configuration</h3>
          <p className="text-sm text-gray-500">Set the coverage limits, deductibles, and premium rate for this product.</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Coverage (ETB)</label>
            <input
              type="number"
              value={minCoverage}
              onChange={(e) => setMinCoverage(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Coverage (ETB)</label>
            <input
              type="number"
              value={maxCoverage}
              onChange={(e) => setMaxCoverage(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Default Deductible (ETB)</label>
            <input
              type="number"
              value={defaultDeductible}
              onChange={(e) => setDefaultDeductible(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Premium Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={premiumRate}
              onChange={(e) => setPremiumRate(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Quick Premium Calculator */}
        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <h4 className="text-sm font-bold text-emerald-900 mb-3">💡 Quick Premium Preview</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-emerald-700 mb-1">Min Coverage Premium</p>
              <p className="text-lg font-bold text-emerald-800">ETB {(minCoverage * premiumRate / 100).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-700 mb-1">Mid Coverage Premium</p>
              <p className="text-lg font-bold text-emerald-800">ETB {(((minCoverage + maxCoverage) / 2) * premiumRate / 100).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-700 mb-1">Max Coverage Premium</p>
              <p className="text-lg font-bold text-emerald-800">ETB {(maxCoverage * premiumRate / 100).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 4: Review
  const renderStep4 = () => {
    const SelectedIcon = icons.find(i => i.name === selectedIcon)?.component || Car;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-start gap-6 mb-6">
            <div className="p-4 bg-emerald-50 rounded-2xl">
              <SelectedIcon className="w-12 h-12 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{productName || 'Untitled Product'}</h2>
              <p className="text-sm text-gray-600 mb-2">{productCode || 'No code specified'}</p>
              <p className="text-sm text-gray-600">{description || 'No description provided'}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Form Fields</p>
                <p className="text-2xl font-bold text-gray-900">{formFields.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Required</p>
                <p className="text-2xl font-bold text-gray-900">{formFields.filter(f => f.required).length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Conditional</p>
                <p className="text-2xl font-bold text-purple-600">{formFields.filter(f => f.conditionalLogic?.enabled).length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Premium Rate</p>
                <p className="text-2xl font-bold text-emerald-600">{premiumRate}%</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Coverage</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs">Min</p>
                <p className="font-bold text-gray-900">ETB {minCoverage.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs">Max</p>
                <p className="font-bold text-gray-900">ETB {maxCoverage.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs">Deductible</p>
                <p className="font-bold text-gray-900">ETB {defaultDeductible.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Field Summary</p>
            <div className="space-y-2">
              {formFields.map((field, index) => (
                <div key={field.id} className="flex items-center justify-between text-sm py-1.5 px-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 flex items-center gap-2">
                    {index + 1}. {field.label || 'Untitled'}
                    {field.required && <span className="text-red-500 text-xs">Required</span>}
                    {field.conditionalLogic?.enabled && <span className="text-purple-500 text-[10px] bg-purple-50 px-1.5 py-0.5 rounded">Conditional</span>}
                  </span>
                  <span className="text-gray-500 text-xs">{field.dataType}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const totalSteps = 4;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full flex flex-col">
        <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Create New Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          {renderStepIndicator()}
          <div className="min-h-[500px]">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>
        </div>

        <div className="border-t border-gray-200 px-8 py-6 flex items-center justify-between bg-gray-50">
          <button
            onClick={() => {
              if (currentStep > 1) {
                setValidationErrors([]);
                setCurrentStep(currentStep - 1);
              } else {
                onClose();
              }
            }}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={() => currentStep < totalSteps ? handleNext() : handlePublish()}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
          >
            {currentStep === totalSteps ? 'Publish Product' : 'Next'}
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Product Created Successfully!</h3>
              <p className="text-gray-600 mb-6">
                {productName} has been published and is now live in your product catalog.
              </p>
              <button
                onClick={() => { setShowSuccessModal(false); onClose(); }}
                className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
              >
                View Product Catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
