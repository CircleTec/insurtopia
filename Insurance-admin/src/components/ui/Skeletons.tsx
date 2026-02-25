export function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
                        <div className="h-7 w-16 bg-gray-300 rounded" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-48" />
                ))}
            </div>
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="animate-pulse space-y-3">
            <div className="h-10 bg-gray-100 rounded-lg" />
            {[...Array(rows)].map((_, i) => (
                <div key={i} className="flex gap-4 py-3">
                    <div className="h-4 flex-1 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="animate-pulse bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                <div className="space-y-2 flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
        </div>
    );
}
