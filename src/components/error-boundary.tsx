"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F3] border border-[#E8DFD2] rounded-md">
          <h2 className="text-xl font-medium text-[#8B2A2A] mb-2">Something went wrong</h2>
          <p className="text-sm text-[#B7AA98]">We encountered an error while rendering this component.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-[#1C1208] text-[#FAF8F3] text-xs uppercase tracking-widest"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
