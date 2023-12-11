import { css } from "styled-components";

import { Color } from "../Color";

const Lines = {
  line01: css`
    border: 1px solid ${Color.lightGreen};
  `,
  line02: css`
    border: 1px solid ${Color.deepGreen};
  `,

  validationError: css`
    border: 1px solid red;
  `
};

export default Lines;
