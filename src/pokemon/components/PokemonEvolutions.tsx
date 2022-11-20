import Link from 'next/link';
import { useRouter } from 'next/router';

import styled, { keyframes } from "styled-components";

import startCase from 'lodash/startCase';

import RightArrowIcon from "pokemon/assets/icons/icon-arrow-right.svg";
import { POKEMON_TYPES } from "pokemon/constants";
import { usePokemonDetail, usePokemonEvolutions, usePokemonSpeciesDetail } from "pokemon/queries";
import { PokemonEvolution } from 'pokemon/services/getPokemonEvolutions';

import SkeletonLoading from './SkeletonLoading';

const getIdFromUrl = (url: string) => Number(url.split('/')?.[6])
const getImageUrl = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`

const PokemonEvolutions = () => {
  const { query } = useRouter()
  const pokemonName = query?.name as string;

  const request = {
    name: pokemonName
  }
  const { data: pokemon } = usePokemonDetail(request);
  const { data: species } = usePokemonSpeciesDetail(request);

  const url = species?.evolutionChain?.url || ''
  const id = getIdFromUrl(url)

  const { data: evolutions } = usePokemonEvolutions({ id })

  const pokemonTypes = pokemon.types || []

  const primaryType = POKEMON_TYPES.find(
    (type) => pokemonTypes[0].type.name.includes(type.name)
  );

  const secondaryType = POKEMON_TYPES.find(
    (type) => pokemonTypes[1]?.type?.name?.includes?.(type.name)
  )

  if (!evolutions) {
    return null;
  }

  const recursiveRender = (evolutions: PokemonEvolution) => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <ImagePreviewContainer primaryColor={primaryType?.color} secondaryColor={secondaryType?.color}>
          <SkeletonLoading
            src={getImageUrl(getIdFromUrl(evolutions.species.url))}
            alt={evolutions.species?.name}
          />
          <Link href={`/pokemon/detail/${evolutions.species?.name}`}>
            <ImageCaption>{startCase(evolutions.species?.name)}</ImageCaption>
          </Link>
        </ImagePreviewContainer>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexWrap: 'wrap' }}>
          {evolutions.evolvesTo.map(evl => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <RightArrowIcon />
              {recursiveRender(evl)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Container primaryColor={primaryType?.color} secondaryColor={secondaryType?.color}>
      <CardOverlay color={primaryType.color} />
      <EvolutionsTitle>Evolution Chain</EvolutionsTitle>
      {recursiveRender(evolutions.chain)}
    </Container>
  );
};

export default PokemonEvolutions;


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

const Container = styled.div<{ primaryColor: string, secondaryColor?: string }>`
  width: 100%;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:${({ primaryColor = '#ee8328', secondaryColor = '#e14318' }) => `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`};
  border:${({ primaryColor = '#ee8328', secondaryColor = '#e14318' }) => `1px solid linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`};
  border-radius: 1.5rem;
  position: relative;
  animation: ${fadeDown} 0.8s;
  padding: 1rem;
  margin-bottom: 3rem;
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


const EvolutionsTitle = styled.span`
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 400;
  display: block;
  margin-bottom: 1rem;
  text-align: center;
`;

const ImagePreviewContainer = styled.div<{ primaryColor: string, secondaryColor?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(6, 11, 40, 0.15);
  border:${({ primaryColor = '#ee8328', secondaryColor = '#e14318' }) => `1px solid linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`};
  border-radius: 1.5rem;
  padding-bottom: 1rem;
  height: fit-content;
`

const ImageCaption = styled.span`
  cursor: pointer;
  font-size: 1rem;
  line-height: 135%;
  font-weight: 700;
  margin-top: 1rem;
`;