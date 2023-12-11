import { css } from "styled-components";

// TODO: FigmaのShadowsとずれているので、修正する
// https://github.com/michibiku-jp/michibiku/issues/2635
const Shadow = {
  shadow01: css`
    box-shadow: 2px 2px 4px rgba(49, 50, 50, 0.1);
  `,
  shadow02: css`
    box-shadow: 4px 4px 8px rgba(49, 50, 50, 0.1);
  `,
  shadow03: css`
    box-shadow: 8px 8px 12px rgba(49, 50, 50, 0.1);
  `,
  shadow04: css`
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  `,
  shadow05: css`
    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.1);
  `,
  shadow06: css`
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  `
};

export default Shadow;
