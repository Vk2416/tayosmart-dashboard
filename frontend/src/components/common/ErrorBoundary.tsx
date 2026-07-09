import React from 'react';

interface Props { children: React.ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-red-500">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
