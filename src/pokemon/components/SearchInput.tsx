import React, { useState } from "react";

import styled from "styled-components";

import SearchIcon from 'src/pokemon/assets/icons/icon-search.svg'

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {

  }
  return (
    <Container>
      <InputText
        defaultValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search Pokemon"
        required
      />
      <SearchButton onClick={handleSubmit}>
        <SearchIcon />
      </SearchButton>
    </Container>
  );
};

export default SearchInput;

const Container = styled.form`
  grid-area: SearchField;
  justify-self: end;
  width: 30.5rem;
  height: 3.5rem;
  display: flex;
  border-radius: 0.5rem;
  transition: 0.4s;

  &:hover {
    box-shadow: 0px 0px 0px 4px rgba(47, 90, 255, 0.4);
  }

  @media (max-width: 65.63rem) {
    width: 100%;
  }
`;


const InputText = styled.input`
  flex: 1;
  background: none;
  border: 0.13rem solid #2f5aff;
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 1rem;
  font-family: "Montserrat";
  font-size: 1rem;
  line-height: 150%;
  font-weight: 400;
  color: #ffffff;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
`;

const SearchButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  background: #2f5aff;
  border-radius: 0 0.5rem 0.5rem 0;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;