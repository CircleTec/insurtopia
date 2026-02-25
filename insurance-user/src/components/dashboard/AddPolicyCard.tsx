import { Plus } from 'lucide-react';

interface AddPolicyCardProps {
  onClick: () => void;
}

export default function AddPolicyCard({ onClick }: AddPolicyCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-transparent rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all h-full min-h-[180px] flex flex-col items-center justify-center gap-3 group"
    >
      <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
        <Plus className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition-colors" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">Get Another Policy</p>
        <p className="text-sm text-gray-500 mt-1">Add more protection</p>
      </div>
    </button>
  );
}
