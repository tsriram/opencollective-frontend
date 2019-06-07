import { css } from 'styled-components';

/**
 * A custom scrollbar for Chrome, more prettier than the system one.
 */
export const CustomScrollbarCSS = css`
  @media (pointer: fine) {
    &::-webkit-scrollbar {
      height: 10px;
      margin: 0 16px;
    }

    &::-webkit-scrollbar-thumb {
      background: #999;
      border-radius: 20px;
      &:hover {
        background: #aaa;
      }
    }

    &::-webkit-scrollbar-track {
      background: #ddd;
      border-radius: 20px;
    }

    &::-webkit-scrollbar-button {
      color: white;
    }
  }
`;
