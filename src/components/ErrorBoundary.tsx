import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('CAR EXPRESS render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#07090C] px-6 text-center text-[#F4F4F5]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A96E]">
            CAR EXPRESS
          </p>
          <h1
            className="mt-3 text-3xl font-semibold text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Showroom Reload Required
          </h1>
          <p className="mt-3 max-w-md text-sm text-[#B8C0CC]">
            Stored browser settings could not be loaded cleanly. Resetting local showroom preferences will restore the page.
          </p>
          <button
            type="button"
            onClick={() => {
              try {
                localStorage.removeItem('carexpress_vehicles_v1');
                localStorage.removeItem('carexpress_contact_v1');
              } catch {
                // ignore
              }
              window.location.reload();
            }}
            className="mt-6 rounded-sm bg-[#C9A96E] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#07090C] hover:bg-[#DFC48E]"
          >
            Reload Showroom
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
