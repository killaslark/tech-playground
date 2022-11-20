import styled from 'styled-components';

import { useAtom } from 'jotai';

import debounce from 'lodash/debounce'

import { pokemonSearchQueryAtom } from 'pokemon/atoms/pokemonFilter';

const SearchInput = () => {
  const [query, setQuery] = useAtom(pokemonSearchQueryAtom)


  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.value)
  }
  const debounceSubmit = debounce(handleSubmit, 300)

  return (
    <Container>
      <InputText
        defaultValue={query}
        onChange={debounceSubmit}
        placeholder={'Search Pokemon'}
        required
      />
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
  border-radius: 0.5rem;
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