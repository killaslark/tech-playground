import React, { SyntheticEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import styled, { keyframes } from 'styled-components';

import startCase from 'lodash/startCase';

import { useMedia } from '@core/hooks';

import LeftArrowIcon from 'pokemon/assets/icons/icon-arrow-left.svg';
import RightArrowIcon from 'pokemon/assets/icons/icon-arrow-right.svg';
import { POKEMON_TYPES } from 'pokemon/constants';
import { usePokemonDetail } from 'pokemon/queries';

import Loading from './Loading';
import PokemonType from './PokemonType';
import SkeletonLoading from './SkeletonLoading';


const PokemonDetailCard = () => {
  const { query } = useRouter()
  const pokemonName = query?.name as string;

  const request = {
    name: pokemonName
  }
  const { data: pokemon, isLoading } = usePokemonDetail(request);
  const imageObject = pokemon?.sprites?.other?.home || {}


  const imageList = Object.keys(imageObject).map(key => ({
    key: key,
    url: imageObject[key],
  })).filter(({ url }) => url);

  if (isLoading) {
    return (
      <Container>
        <CardOverlay color={'#5a566a'} />
        <Loading />
      </Container>
    )
  }

  const pokemonTypes = pokemon.types || []

  const primaryType = POKEMON_TYPES.find(
    (type) => pokemonTypes[0].type.name.includes(type.name)
  );

  const formatPokemonId = (id: number) => `# ${String(id).padStart(3, '0')}`

  return (
    <Container>
      <CardOverlay color={primaryType.color} />
      <PokemonName>{pokemon.name}</PokemonName>
      <PokemonNumber>{formatPokemonId(pokemon.id)}</PokemonNumber>
      <Slide>
        {imageList.map(image => (
          <ImagePreviewContainer key={image.key} >
            <SkeletonLoading src={image.url} alt={pokemon.name} />
            <ImageCaption>{startCase(image.key)}</ImageCaption>
          </ImagePreviewContainer>
        ))}
      </Slide>

      <PokemonTypeList>
        {pokemon.types.map(({ type }) => (
          <PokemonType isActive key={type.name} type={type.name} reduceTabIndex={false} />
        ))}
      </PokemonTypeList>
    </Container>
  );
};

export default PokemonDetailCard;


const Slide: React.FC<any> = (props) => {
  const [slidePosition, setSlidePosition] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);

  useEffect(() => {
    setSliderWidth(document.getElementById('pokemon-detail-slider').scrollWidth);
    setChildWidth(document.getElementById('pokemon-detail-slider').children?.[0]?.clientWidth + 8)
  }, [])

  const mobile = useMedia('(max-width: 31.25rem)');

  const slideNavigation = ({ currentTarget }: SyntheticEvent) => {
    const direction = (currentTarget as HTMLButtonElement).value;
    if (direction === 'next') {
      if (slidePosition <= -sliderWidth + childWidth) {
        setSlidePosition(-sliderWidth)
      } else {
        if (slidePosition - childWidth <= -sliderWidth) {
          setSlidePosition(-sliderWidth)
        } else {
          setSlidePosition(slidePosition - childWidth)
        }
      }
    } else {
      if (slidePosition >= childWidth) {
        setSlidePosition(0)
      } else {
        if (slidePosition + childWidth >= 0) {
          setSlidePosition(0)
        } else {
          setSlidePosition(slidePosition + childWidth);
        }
      }
    }
  };

  return (
    <SliderContainer>
      {!mobile && (
        <SliderButton
          value={'prev'}
          onClick={slideNavigation}
          disabled={slidePosition >= 0}
        >
          <LeftArrowIcon />
        </SliderButton>
      )}
      <Slider>
        <SliderContent id={'pokemon-detail-slider'} slidePosition={slidePosition / 16}>
          {props.children}
        </SliderContent>
      </Slider>
      {!mobile && (
        <SliderButton
          value={'next'}
          onClick={slideNavigation}
          disabled={slidePosition <= -sliderWidth + childWidth}
        >
          <RightArrowIcon />
        </SliderButton>
      )}
    </SliderContainer>
  );
};

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageCaption = styled.span`
  font-size: 1rem;
  line-height: 135%;
  font-weight: 700;
  margin-top: 1rem;
`;

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
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(6, 11, 40, 0.15);
  border: 1px solid #24293f;
  border-bottom: none;
  border-radius: 1.5rem;
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

const PokemonNumber = styled.span`
  font-size: 1.25rem;
  line-height: 135%;
  font-weight: 700;
`;

const PokemonTypeList = styled.div`
  margin-top: 2rem;
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


const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Slider = styled.div`
  max-width: 256px;
  overflow: hidden;

  @media (max-width: 31.25rem) {
    max-width: 256px;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      width: 1rem;
    }

    &::-webkit-scrollbar-track {
      background: #060b28;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2f5aff;
      border-radius: 0.5rem;
      border: 0.25rem solid #060b28;
    }
  }
`;

const SliderContent = styled.div<{ slidePosition: number }>`
  display: flex;
  gap: 0.5rem;
  transform: translateX(${(props) => `${props.slidePosition}rem`});
  transition: 0.4s;
`;

const SliderButton = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 2rem;
    height: 2rem;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
`;