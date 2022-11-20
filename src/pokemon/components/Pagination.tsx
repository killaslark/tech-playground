import React from 'react';

import { useAtom } from 'jotai';

import styled from "styled-components";

import usePagination from "@mui/material/usePagination/usePagination";

import LeftArrowIcon from "pokemon/assets/icons/icon-arrow-left.svg";
import RightArrowIcon from "pokemon/assets/icons/icon-arrow-right.svg";

import { currentPageAtom } from 'pokemon/atoms/pokemonFilter';

interface Props {
}
const Pagination: React.FC<Props> = () => {
  const [paging, setPaging] = useAtom(currentPageAtom)

  const { items } = usePagination({
    count: 10,
    siblingCount: 0,
    page: paging.currentPage,
    onChange: (_, newPage) => {
      setPaging({
        ...paging,
        currentPage: newPage,
      })
    },
  });

  return (
    <nav>
      <Paging>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          switch (type) {
            case 'start-ellipsis':
            case 'end-ellipsis':
              children = (<Ellipsis>...</Ellipsis>)
              break;
            case 'page':
              children = (
                <PagingButton {...item} selected={selected}>
                  {page}
                </PagingButton>
              );
              break;
            default:
              children = (
                <PagingButton {...item} navigation>
                  {type === "previous" ? <LeftArrowIcon /> : <RightArrowIcon />}
                </PagingButton>
              )
          }
          return <li key={index}>{children}</li>;
        })}
      </Paging>
    </nav>
  );
}

export default Pagination;


const Paging = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  li:first-child {
    margin-right: 1rem;
  }

  li:last-child {
    margin-left: 1rem;
  }
`;

const PagingButton = styled.button<{
  selected?: boolean;
  navigation?: boolean;
}>`
  width: ${(props) => (props.navigation ? "2rem" : "2.5rem")};
  height: ${(props) => (props.navigation ? "2rem" : "2.5rem")};
  background: ${(props) => (props.selected ? "#2F5AFF" : "none")};
  border: ${(props) => (props.navigation ? "none" : "0.13rem solid #fff;")};
  border-radius: 0.5rem;

  font-family: "Montserrat";
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 2rem;
    height: 2rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Ellipsis = styled.span`
  display: block;
  padding: 0.75rem 0;

  font-family: "Montserrat";
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;
  color: #fff;
`;
