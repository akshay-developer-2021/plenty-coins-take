import React from "react";

/**
 * Higher-Order Component that logs the React lifecycle of the wrapped
 * component to the console. Uses a class component so that the classic
 * lifecycle methods (mount, update, unmount) can be observed.
 */
export function withLifecycleLogger<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string
): React.ComponentType<P> {
  const displayName =
    componentName ||
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Component";

  class WithLifecycleLogger extends React.Component<P> {
    static displayName = `withLifecycleLogger(${displayName})`;

    constructor(props: P) {
      super(props);
      console.log(`[Lifecycle] ${displayName}: constructor`);
    }

    componentDidMount() {
      console.log(`[Lifecycle] ${displayName}: componentDidMount`);
    }

    componentDidUpdate(prevProps: Readonly<P>) {
      console.log(`[Lifecycle] ${displayName}: componentDidUpdate`, {
        prevProps,
        nextProps: this.props,
      });
    }

    componentWillUnmount() {
      console.log(`[Lifecycle] ${displayName}: componentWillUnmount`);
    }

    render() {
      console.log(`[Lifecycle] ${displayName}: render`);
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithLifecycleLogger;
}

export default withLifecycleLogger;
