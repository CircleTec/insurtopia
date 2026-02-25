import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary caught:', error, info);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] px-6 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                        <AlertOctagon className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                    <p className="text-sm text-gray-500 max-w-md mb-6">
                        An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
                    </p>
                    {this.state.error && (
                        <pre className="text-xs text-red-600 bg-red-50 rounded-lg p-3 mb-4 max-w-md overflow-auto border border-red-200">
                            {this.state.error.message}
                        </pre>
                    )}
                    <button
                        onClick={this.handleReset}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
