import { ComponentType } from 'react';

export function connect<Props extends Record<string, unknown> = {}>(
  Component: ComponentType<Props>,
  propsGetter: () => Promise<Props>,
) {
  async function ConnectedComponent() {
    const props = await propsGetter();

    return <Component {...props} />;
  }

  ConnectedComponent.displayName = `Connected${
    Component.displayName || 'Component'
  }`;

  return ConnectedComponent;
}
