import { useState } from 'react';
import { Plus, Play, Settings, Trash2, Edit2, Copy, X, Beaker, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Rule {
  id: string;
  name: string;
  product: string;
  conditions: RuleCondition[];
  decision: 'AUTO_APPROVE' | 'AUTO_DECLINE' | 'MANUAL_REFERRAL';
  priority: number;
  status: 'Active' | 'Draft' | 'Archived';
  version: number;
}

interface RuleCondition {
  field: string;
  operator: string;
  value: string;
}

const availableFields = ['riskScore', 'coverageAmount', 'vehicleAge', 'applicantAge', 'preExistingCondition', 'claimHistory', 'region'];
const operators = ['>', '<', '=', '>=', '<=', '!='];
const products = ['All Products', 'Motor Comprehensive', 'Health Star Plus', 'SME Fire & Property', 'Travel Secure'];

export default function RuleEngineView() {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: 'RULE-001', name: 'High Value Motor Risk', product: 'Motor Comprehensive',
      conditions: [{ field: 'coverageAmount', operator: '>', value: '500000' }, { field: 'vehicleAge', operator: '>', value: '15' }],
      decision: 'MANUAL_REFERRAL', priority: 1, status: 'Active', version: 1
    },
    {
      id: 'RULE-002', name: 'Low Risk Auto-Approval', product: 'Motor Comprehensive',
      conditions: [{ field: 'riskScore', operator: '<', value: '40' }, { field: 'coverageAmount', operator: '<', value: '300000' }],
      decision: 'AUTO_APPROVE', priority: 2, status: 'Active', version: 2
    },
    {
      id: 'RULE-003', name: 'Critical Risk Auto-Decline', product: 'All Products',
      conditions: [{ field: 'riskScore', operator: '>', value: '85' }],
      decision: 'AUTO_DECLINE', priority: 1, status: 'Active', version: 1
    },
    {
      id: 'RULE-004', name: 'Health Pre-existing Condition Review', product: 'Health Star Plus',
      conditions: [{ field: 'preExistingCondition', operator: '=', value: 'true' }],
      decision: 'MANUAL_REFERRAL', priority: 2, status: 'Active', version: 1
    }
  ]);

  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [showTestSimulator, setShowTestSimulator] = useState(false);

  // Rule builder form state
  const [formName, setFormName] = useState('');
  const [formProduct, setFormProduct] = useState('');
  const [formDecision, setFormDecision] = useState<Rule['decision']>('MANUAL_REFERRAL');
  const [formPriority, setFormPriority] = useState(1);
  const [formStatus, setFormStatus] = useState<Rule['status']>('Active');
  const [formConditions, setFormConditions] = useState<RuleCondition[]>([{ field: '', operator: '>', value: '' }]);

  // Test simulator state
  const [testValues, setTestValues] = useState<Record<string, string>>({
    riskScore: '45', coverageAmount: '200000', vehicleAge: '5', applicantAge: '35',
    preExistingCondition: 'false', claimHistory: '0', region: 'Addis Ababa'
  });
  const [testResults, setTestResults] = useState<{ rule: Rule; matched: boolean; }[] | null>(null);

  const getDecisionBadgeColor = (decision: string) => {
    switch (decision) {
      case 'AUTO_APPROVE': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'AUTO_DECLINE': return 'bg-red-100 text-red-800 border-red-200';
      case 'MANUAL_REFERRAL': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openCreateModal = () => {
    setEditingRule(null);
    setFormName('');
    setFormProduct('');
    setFormDecision('MANUAL_REFERRAL');
    setFormPriority(1);
    setFormStatus('Active');
    setFormConditions([{ field: '', operator: '>', value: '' }]);
    setShowRuleBuilder(true);
  };

  const openEditModal = (rule: Rule) => {
    setEditingRule(rule);
    setFormName(rule.name);
    setFormProduct(rule.product);
    setFormDecision(rule.decision);
    setFormPriority(rule.priority);
    setFormStatus(rule.status);
    setFormConditions([...rule.conditions]);
    setShowRuleBuilder(true);
  };

  const handleSaveRule = () => {
    if (!formName.trim() || !formProduct) return;

    const validConditions = formConditions.filter(c => c.field && c.value);
    if (validConditions.length === 0) return;

    if (editingRule) {
      setRules(rules.map(r => r.id === editingRule.id ? {
        ...r, name: formName, product: formProduct, decision: formDecision,
        priority: formPriority, status: formStatus, conditions: validConditions,
        version: r.version + 1
      } : r));
    } else {
      const newRule: Rule = {
        id: `RULE-${String(rules.length + 1).padStart(3, '0')}`,
        name: formName, product: formProduct, decision: formDecision,
        priority: formPriority, status: formStatus, conditions: validConditions,
        version: 1
      };
      setRules([...rules, newRule]);
    }
    setShowRuleBuilder(false);
  };

  const handleDuplicateRule = (rule: Rule) => {
    const newRule: Rule = {
      ...rule,
      id: `RULE-${String(rules.length + 1).padStart(3, '0')}`,
      name: `${rule.name} (Copy)`,
      status: 'Draft',
      version: 1,
      conditions: [...rule.conditions]
    };
    setRules([...rules, newRule]);
  };

  const handleDeleteRule = (ruleId: string) => {
    if (confirm('Are you sure you want to delete this rule?')) {
      setRules(rules.filter(r => r.id !== ruleId));
    }
  };

  const addCondition = () => {
    setFormConditions([...formConditions, { field: '', operator: '>', value: '' }]);
  };

  const updateCondition = (index: number, updates: Partial<RuleCondition>) => {
    const updated = [...formConditions];
    updated[index] = { ...updated[index], ...updates };
    setFormConditions(updated);
  };

  const removeCondition = (index: number) => {
    setFormConditions(formConditions.filter((_, i) => i !== index));
  };

  // Test simulator logic
  const evaluateCondition = (condition: RuleCondition, values: Record<string, string>): boolean => {
    const fieldValue = values[condition.field];
    if (fieldValue === undefined) return false;
    const numField = parseFloat(fieldValue);
    const numCond = parseFloat(condition.value);

    switch (condition.operator) {
      case '>': return !isNaN(numField) && !isNaN(numCond) && numField > numCond;
      case '<': return !isNaN(numField) && !isNaN(numCond) && numField < numCond;
      case '>=': return !isNaN(numField) && !isNaN(numCond) && numField >= numCond;
      case '<=': return !isNaN(numField) && !isNaN(numCond) && numField <= numCond;
      case '=': return fieldValue === condition.value;
      case '!=': return fieldValue !== condition.value;
      default: return false;
    }
  };

  const runTest = () => {
    const results = rules
      .filter(r => r.status === 'Active')
      .sort((a, b) => a.priority - b.priority)
      .map(rule => ({
        rule,
        matched: rule.conditions.every(c => evaluateCondition(c, testValues))
      }));
    setTestResults(results);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rule Engine</h1>
          <p className="text-sm text-gray-600 mt-1">Configure automated underwriting rules for risk assessment</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setTestResults(null); setShowTestSimulator(true); }}
            className="flex items-center gap-2 px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
          >
            <Beaker className="w-4 h-4" />
            Test Simulator
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create Rule
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Total Rules</p>
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{rules.length}</p>
          <p className="text-xs text-gray-500 mt-2">{rules.filter(r => r.status === 'Active').length} active</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Auto-Approve</p>
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
          </div>
          <p className="text-4xl font-bold text-emerald-600">{rules.filter(r => r.decision === 'AUTO_APPROVE').length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Manual Review</p>
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          </div>
          <p className="text-4xl font-bold text-amber-600">{rules.filter(r => r.decision === 'MANUAL_REFERRAL').length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Auto-Decline</p>
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          </div>
          <p className="text-4xl font-bold text-red-600">{rules.filter(r => r.decision === 'AUTO_DECLINE').length}</p>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">All Rules</h2>
          <p className="text-sm text-gray-600 mt-1">Rules are evaluated in priority order</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Rule Name</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Conditions</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Decision</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rules.sort((a, b) => a.priority - b.priority).map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50/50 transition-colors h-20">
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                      <span className="text-sm font-bold text-gray-700">{rule.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{rule.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-gray-500">{rule.id}</p>
                      <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-semibold">v{rule.version}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{rule.product}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {rule.conditions.slice(0, 2).map((c, idx) => (
                        <p key={idx} className="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                          {c.field} {c.operator} {c.value}
                        </p>
                      ))}
                      {rule.conditions.length > 2 && (
                        <p className="text-xs text-gray-500">+{rule.conditions.length - 2} more</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold border ${getDecisionBadgeColor(rule.decision)}`}>
                      {rule.decision.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadgeColor(rule.status)}`}>
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEditModal(rule)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button onClick={() => handleDuplicateRule(rule)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Duplicate">
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                      <button onClick={() => handleDeleteRule(rule.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rule Builder Modal */}
      {showRuleBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingRule ? 'Edit Rule' : 'Create New Rule'}
              </h3>
              <button onClick={() => setShowRuleBuilder(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Rule Name</label>
                  <input
                    type="text" value={formName} onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g., High Risk Auto Referral"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Product</label>
                  <select
                    value={formProduct} onChange={(e) => setFormProduct(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="">Select product...</option>
                    {products.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              {/* Dynamic Conditions */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Conditions (All must be true)</label>
                <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                  {formConditions.map((cond, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_auto_1fr_auto] gap-3 items-center">
                      <select
                        value={cond.field} onChange={(e) => updateCondition(idx, { field: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                      >
                        <option value="">Select field...</option>
                        {availableFields.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                      <select
                        value={cond.operator} onChange={(e) => updateCondition(idx, { operator: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                      >
                        {operators.map(op => <option key={op} value={op}>{op}</option>)}
                      </select>
                      <input
                        type="text" value={cond.value}
                        onChange={(e) => updateCondition(idx, { value: e.target.value })}
                        placeholder="Value"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      />
                      <button
                        onClick={() => removeCondition(idx)}
                        disabled={formConditions.length <= 1}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  <button onClick={addCondition} className="text-sm text-emerald-600 font-semibold hover:text-emerald-700">
                    + Add Condition
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Decision</label>
                  <select
                    value={formDecision} onChange={(e) => setFormDecision(e.target.value as Rule['decision'])}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="AUTO_APPROVE">Auto-Approve</option>
                    <option value="MANUAL_REFERRAL">Manual Review</option>
                    <option value="AUTO_DECLINE">Auto-Decline</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
                  <input
                    type="number" value={formPriority} onChange={(e) => setFormPriority(Number(e.target.value))}
                    min="1" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                  <select
                    value={formStatus} onChange={(e) => setFormStatus(e.target.value as Rule['status'])}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowRuleBuilder(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRule}
                disabled={!formName.trim() || !formProduct || formConditions.every(c => !c.field || !c.value)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingRule ? 'Update Rule' : 'Create Rule'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Simulator Modal */}
      {showTestSimulator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Beaker className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Rule Test Simulator</h3>
                  <p className="text-sm text-gray-500">Enter sample values to see which rules fire</p>
                </div>
              </div>
              <button onClick={() => setShowTestSimulator(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Input Panel */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Sample Application Values</h4>
                  <div className="space-y-3">
                    {availableFields.map(field => (
                      <div key={field} className="flex items-center gap-3">
                        <label className="text-sm text-gray-600 w-40 font-mono">{field}</label>
                        <input
                          type="text"
                          value={testValues[field] || ''}
                          onChange={(e) => setTestValues({ ...testValues, [field]: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={runTest}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Run Test
                  </button>
                </div>

                {/* Results Panel */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Results</h4>
                  {testResults === null ? (
                    <div className="text-center py-12 text-gray-400">
                      <Beaker className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Enter values and click "Run Test" to see results</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {testResults.map(({ rule, matched }) => (
                        <div key={rule.id} className={`p-4 rounded-xl border-2 transition-all ${matched ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50 opacity-60'
                          }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {matched ? (
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-gray-400" />
                              )}
                              <p className="text-sm font-bold text-gray-900">{rule.name}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${matched ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-200 text-gray-500'}`}>
                              {matched ? 'MATCHED' : 'NO MATCH'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className={`px-2 py-0.5 rounded-lg border font-bold ${getDecisionBadgeColor(rule.decision)}`}>
                              → {rule.decision.replace(/_/g, ' ')}
                            </span>
                            <span className="text-gray-500">Priority: {rule.priority}</span>
                          </div>
                        </div>
                      ))}

                      {/* Final Outcome */}
                      {(() => {
                        const firstMatch = testResults.find(r => r.matched);
                        if (!firstMatch) return (
                          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-bold text-blue-900">No Rules Matched</p>
                              <p className="text-xs text-blue-700">Application would be sent for manual review by default.</p>
                            </div>
                          </div>
                        );
                        return (
                          <div className={`mt-4 p-4 rounded-xl border flex items-center gap-3 ${firstMatch.rule.decision === 'AUTO_APPROVE' ? 'bg-emerald-50 border-emerald-300' :
                              firstMatch.rule.decision === 'AUTO_DECLINE' ? 'bg-red-50 border-red-300' :
                                'bg-amber-50 border-amber-300'
                            }`}>
                            {firstMatch.rule.decision === 'AUTO_APPROVE' && <CheckCircle className="w-6 h-6 text-emerald-600" />}
                            {firstMatch.rule.decision === 'AUTO_DECLINE' && <XCircle className="w-6 h-6 text-red-600" />}
                            {firstMatch.rule.decision === 'MANUAL_REFERRAL' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                            <div>
                              <p className="text-sm font-bold">Final Decision: {firstMatch.rule.decision.replace(/_/g, ' ')}</p>
                              <p className="text-xs opacity-75">Matched by "{firstMatch.rule.name}" (Priority {firstMatch.rule.priority})</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
