import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#FAF7F0] to-[#FFF9E8] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-[#8B7355] mb-4">Oops! Quelque chose s'est mal passé</h1>
            <p className="text-[#8B7355] mb-6">
              Une erreur inattendue s'est produite. Veuillez rafraîchir la page.
            </p>
            {this.state.error && (
              <details className="text-left mb-6">
                <summary className="cursor-pointer text-[#D2691E] font-semibold mb-2">
                  Détails de l'erreur
                </summary>
                <pre className="bg-[#F5F1E8] p-4 rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#8B7355] text-white rounded-lg font-bold hover:bg-[#D2691E] transition-colors"
            >
              Rafraîchir la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
