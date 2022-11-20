import { useState } from 'react';

import { useAtom } from 'jotai';

import styled, { keyframes } from 'styled-components';

import BoltIcon from 'pokemon/assets/icons/icon-bolt.svg';
import RulerIcon from 'pokemon/assets/icons/icon-ruler.svg';
import WeightIcon from 'pokemon/assets/icons/icon-weight.svg';
import pokemonModal from 'pokemon/atoms/pokemonModal';
import { POKEMON_TYPES } from 'pokemon/constants';
import { usePokemonDetail } from 'pokemon/queries';
import { PokemonUrl } from 'pokemon/services/getPokemons';

import Loading from './Loading';
import PokemonType from './PokemonType';
import SkeletonLoading from './SkeletonLoading';


interface Props {
  pokemon: PokemonUrl;
};

const PokemonCard = (props: Props) => {
  const { pokemon: pokemonUrl } = props;
  const [, setModalState] = useAtom(pokemonModal);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const request = {
    name: pokemonUrl.name
  }
  const { data: pokemon, isLoading } = usePokemonDetail(request);
  const imageList = Object.values(pokemon?.sprites?.other?.home || {}).filter(value => value);

  const handlePressImage = () => {
    setActiveImageIndex(prevActiveIndex => {
      const newActiveIndex = prevActiveIndex === imageList.length - 1 ? 0 : prevActiveIndex + 1
      return newActiveIndex
    })
  }

  if (isLoading) {
    return <Loading />
  }

  const pokemonTypes = pokemon.types || []

  const primaryType = POKEMON_TYPES.find(
    (type) => pokemonTypes[0].type.name.includes(type.name)
  );

  const onSeeDetail = () => {
    setModalState({
      activePokemon: pokemon.name,
    })
  };

  const formatPokemonId = (id: number) => `#${String(id).padStart(3, '0')}`

  return (
    <Container>
      <CardOverlay color={primaryType.color} />
      <PokemonImg>
        <SkeletonLoading
          onPress={handlePressImage}
          src={imageList[activeImageIndex]}
          alt={pokemon.name}
        />
      </PokemonImg>
      <PokemonNumber>{formatPokemonId(pokemon.id)}</PokemonNumber>
      <PokemonName>{pokemon.name}</PokemonName>
      <PokemonTypeList>
        {pokemon.types.map(({ type }) => (
          <PokemonType isActive key={type.name} type={type.name} reduceTabIndex={false} />
        ))}
      </PokemonTypeList>
      <PokemonFeatures>
        <PokemonWeight>
          <div>
            <WeightIcon />
            <span>{`${pokemon.weight / 10}`}{' kg'}</span>
          </div>
          <span>{'Weight'}</span>
        </PokemonWeight>
        <PokemonHeight>
          <div>
            <RulerIcon />
            <span>{`${pokemon.height / 10}`}{' m'}</span>
          </div>
          <span>{'Height'}</span>
        </PokemonHeight>
      </PokemonFeatures>
      <MoreDetailsButton color={primaryType.color} onClick={onSeeDetail}>
        <BoltIcon />
        {'See Stats'}
      </MoreDetailsButton>
    </Container>
  );
};

export default PokemonCard;


const fadeDown = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -32px, 0);
  }
  to {
    opacity: initial;
    transform: initial;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(6, 11, 40, 0.15);
  border: 1px solid #24293f;
  border-bottom: none;
  border-radius: 1.5rem;
  padding-top: 7rem;
  position: relative;
  animation: ${fadeDown} 0.8s;
`;

const CardOverlay = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);

  &::after {
    content: "";
    display: block;
    width: 12.5rem;
    height: 12.5rem;
    background: ${(props) => props.color};
    filter: blur(128px);
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: 0.8s;
  }
`;

const PokemonImg = styled.div`
  position: absolute;
  top: -10.5rem;
`;

const PokemonNumber = styled.span`
  font-size: 1.25rem;
  line-height: 135%;
  font-weight: 700;
`;

const PokemonTypeList = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    cursor: default;
  }
`;

const PokemonName = styled.span`
  font-size: 2rem;
  line-height: 135%;
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
  display: block;
  margin: 0.25rem 0.5rem 0.75rem;
`;

const PokemonFeatures = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0 2rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const PokemonWeight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font-weight: 700;
    }
  }

  span {
    font-size: 1rem;
    line-height: 150%;
    font-weight: 400;
  }
`;

const PokemonHeight = styled(PokemonWeight)``;

const MoreDetailsButton = styled.button<{ color: string }>`
  width: calc(100% + 2px);
  height: 3rem;
  background: ${(props) => props.color};
  border-radius: 0 0 1.5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  line-height: 150%;
  font-weight: 700;
  color: #ffffff;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;