import { css } from "styled-components";

const Height = {
  heightExcludingHeaderAndTitleBar: css`
    /* Header (64px) と TitleBar (120px) 分を引く */
    height: calc(100vh - 184px);
  `
};

export default Height;
