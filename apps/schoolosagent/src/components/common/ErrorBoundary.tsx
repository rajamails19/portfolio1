import { Component, type ErrorInfo, type ReactNode } from "react";
import { StateView } from "./states/StateView";

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<{ children: ReactNode; label?: string }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", this.props.label ?? "", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <StateView
          kind="error"
          title="This section crashed."
          description={this.state.error.message}
        />
      );
    }
    return this.props.children;
  }
}
