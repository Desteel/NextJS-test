import { ComponentType } from 'react';

export function connect<
  Props extends Record<string, unknown> = {},
  GettedProps extends Partial<Props> = {},
>(Component: ComponentType<Props>, propsGetter: () => Promise<GettedProps>) {
  async function ConnectedComponent(props: Omit<Props, keyof GettedProps>) {
    const actualProps = {
      ...props,
      ...(await propsGetter()),
    } as Props;

    return <Component {...actualProps} />;
  }

  ConnectedComponent.displayName = `Connected${
    Component.displayName || 'Component'
  }`;

  return ConnectedComponent;
}
