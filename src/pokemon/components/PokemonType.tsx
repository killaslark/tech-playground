import React from 'react'
import styled from 'styled-components';

import { POKEMON_TYPES } from 'pokemon/constants';



interface Props {
  type: string
  onPress?: (type: string) => void
  reduceTabIndex?: boolean
  isActive?: boolean;
};
const PokemonType: React.FC<Props> = (props) => {
  const { type, onPress, reduceTabIndex, isActive } = props;
  const { name, color } = POKEMON_TYPES.find(
    (item) => item.name === props.type
  );

  const handlePress = () => {
    onPress?.(type)
  }

  return (
    <Type
      isActive={isActive}
      color={color}
      onClick={handlePress}
      tabIndex={reduceTabIndex ? 0 : -1}
    >
      <img src={`/pokemon-types/${name}.svg`} width={16} height={16} alt={name} />
      {name}
    </Type>
  )
};

export default PokemonType;


export const Type = styled.button<{ color: string, isActive: boolean }>`
  background: ${(props) => props.color};
  opacity: ${({ isActive }) => isActive ? '1' : '0.7'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  flex-shrink: 0;

  font-family: "Montserrat";
  font-size: 1rem;
  line-height: 150%;
  font-weight: 400;
  text-transform: capitalize;
  color: #fff;

  img {
    width: 1rem;
    height: 1rem;
  }
`;