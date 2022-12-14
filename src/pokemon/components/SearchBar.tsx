import React from 'react';
import styled from 'styled-components';
import SearchFilter from './SearchFilter';
import SearchInput from './SearchInput';

interface Props {
  searchBarRef?: React.MutableRefObject<HTMLDivElement>;
  hideFilter?: boolean;
  hideSearch?: boolean;
}

const SearchBar: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        background: '#060B28',
        paddingTop: '2rem',
        gap: '1rem',
      }}
      className={'main-container'}
      ref={props.searchBarRef}
    >
      <Container>
        {!props.hideFilter && <SearchFilter />}
        {!props.hideSearch && <SearchInput />}
      </Container>
    </div>
  );
};

export default SearchBar;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  align-items: end;
  row-gap: 1.5rem;
  column-gap: 2rem;
  border-bottom: 1px solid #24293f;
  padding-bottom: 2.19rem;

  @media (max-width: 56.25rem) {
    grid-template-columns: 1fr auto;

    grid-template-areas:
      'SearchFilter HomeButton'
      'SearchField SearchField';
  }

  @media (max-width: 42.5rem) {
    grid-template-columns: 1fr;

    grid-template-areas:
      'HomeButton HomeButton'
      'SearchFilter SearchFilter'
      'SearchField SearchField';
  }

  @media (max-width: 31.25rem) {
    margin: 3.5rem 0 3rem;
    padding-bottom: 1.5rem;
  }
`;
