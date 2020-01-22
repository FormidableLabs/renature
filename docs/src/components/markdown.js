import styled from 'styled-components';

export const Markdown = styled.article`
  @media (max-width: 768px) {
    width: 75vw;
  }
  & h1 {
    font-family: 'castledown';
    font-size: 3.4rem;
    margin: 0 0 2rem;

    @media (min-width: 1024px) {
      font-size: 4.8rem;
    }

    @media (max-width: 768px) {
      margin: 6rem 0 2rem;
    }
  }

  & h2 {
    font-family: 'castledown';
    font-size: 2.8rem;
    margin: 6rem 0 2rem;
    @media (min-width: 1024px) {
      font-size: 2.5rem;
    }
  }

  & h3 {
    font-family: 'castledown';
    font-size: 1.8rem;
    margin: 2rem 0;
    @media (min-width: 1024px) {
      font-size: 2rem;
    }
  }

  & table {
    border-collapse: collapse;
  }

  & td {
    height: 50px;
    text-align: left;
  }

  & td,
  th {
    padding: 15px;
  }

  & th {
    text-align: center;
  }

  & table,
  th,
  td {
    font-size: 1.7rem;
    font-family: Helvetica;
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    border: 1px solid lightgrey;
  }

  & pre {
    line-height: 2rem;
    background-color: #efefef;
    padding: 2rem;
    color: #333;
  }

  & pre code {
    color: #333;
  }

  & pre[class*='language-'] {
    margin: 1em 0;
    overflow: auto;
  }

  & p {
    font-family: Helvetica;
    font-size: 1.7rem;
    line-height: 1.6;
  }

  & li {
    font-family: Helvetica;
    font-size: 1.7rem;
    line-height: 1.6;
    padding: 0.5rem;
    @media (max-width: 768px) {
      margin-left: -2rem;
    }
  }

  & p code,
  & li code,
  & table code {
    background: ${({ theme }) => theme.colors.syntaxBg} !important;
    color: ${({ theme }) => theme.colors.syntax};
    padding: 0.25rem !important;
    font-size: 1.5rem;
    margin: 0 0.5rem 0 0.5rem;
  }

  & a {
    color: ${({ theme }) => theme.colors.link};

    &:target {
      display: block;
      position: relative;
      top: -60px;
      visibility: hidden;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.linkHover};
    }
  }

  .equation {
    position: relative;
    left: 1em;
  }
`;
