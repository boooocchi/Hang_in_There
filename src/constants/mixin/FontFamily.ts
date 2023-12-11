import { css } from "styled-components";

const FontFamily = {
  default: css`
    font-family: "Old Standard TT", "serif";
  `,

  // 招集通知や議事録などのドキュメントで使用するフォント
  // Noto Serif JP、BIZ UDMinchoはGoogle Fontsのため全デバイスで表示可能な想定
  // ネットワークの不具合などでDLに失敗した場合は、代替の組み込みフォントを表示する
  notoSansJp: css`
    font-family: "Noto Serif JP", "MS 明朝", "Hiragino Mincho ProN", "YuMincho",
      "Yu Mincho", serif;
  `,
  bizUdMincho: css`
    font-family: "BIZ UDMincho", "MS 明朝", "Hiragino Mincho ProN", "YuMincho",
      "Yu Mincho", serif;
  `
};

export default FontFamily;
