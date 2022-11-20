import { SyntheticEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import startCase from 'lodash/startCase';

import pokeballBackground from "pokemon/assets/icons/background-pokeball.svg";
import DividerIcon from "pokemon/assets/icons/divider-pokeball.svg";
import LeftArrowIcon from "pokemon/assets/icons/icon-arrow-left.svg";
import RightArrowIcon from "pokemon/assets/icons/icon-arrow-right.svg";
import { POKEMON_TYPES } from "pokemon/constants";
import { usePokemonDetail, usePokemonSpeciesDetail } from "pokemon/queries";

import { useMedia } from "@core/hooks";

import { SkeletonLoading, Waves } from ".";
import Header from "./Header";
import PokemonType from "./PokemonType";

const PokemonDetailBanner = () => {
  const router = useRouter()

  const pokemonName = router.query?.name as string;

  const request = {
    name: pokemonName
  }
  const { data: pokemon } = usePokemonDetail(request)

  const { data: pokemonSpecies } = usePokemonSpeciesDetail(request)

  if (!pokemon || !pokemonSpecies) {
    return null;
  }

  const imageObject = pokemon?.sprites?.other?.home || {}
  const pokemonTypes = pokemon?.types || []

  const imageList = Object.keys(imageObject).map(key => ({
    key: key,
    url: imageObject[key],
  })).filter(({ url }) => url);

  const formatPokemonId = (id: number) => `# ${String(id).padStart(3, '0')}`

  const primaryType = POKEMON_TYPES.find(
    (type) => pokemonTypes[0].type.name.includes(type.name)
  );
  const secondaryType = POKEMON_TYPES.find(
    (type) => pokemonTypes[1]?.type?.name?.includes?.(type.name)
  )

  const pokemonDescription = pokemonSpecies?.flavorTextEntries?.[0]?.flavorText

  return (
    <Container primaryColor={primaryType?.color} secondaryColor={secondaryType?.color}>
      <Header />
      <div className="main-container">
        <Content>
          <PokemonData>
            <PokemonNumber>{formatPokemonId(pokemon.id)}</PokemonNumber>
            <PokemonTypes>
              {pokemon.types.map(({ type }) => (
                <PokemonType isActive key={type.name} type={type.name} reduceTabIndex={false} />
              ))}
            </PokemonTypes>
            <PokemonName>{pokemon.name}</PokemonName>
            <PokemonDescription>
              {pokemonDescription}
            </PokemonDescription>
          </PokemonData>

          <Divider>
            <DividerIcon />
          </Divider>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PokemonImg>
              <Slide>
                {imageList.map(image => (
                  <ImagePreviewContainer key={image.key}>
                    <SkeletonLoading
                      key={image.key}
                      alt={pokemon.name}
                      width={'25rem'}
                      height={'25rem'}
                      src={image.url}
                    />
                    <ImageCaption>{startCase(image.key)}</ImageCaption>
                  </ImagePreviewContainer>
                ))}
              </Slide>
            </PokemonImg>
          </div>
        </Content>
      </div>

      <Waves />
    </Container>
  );
};

export default PokemonDetailBanner;

const Slide: React.FC<any> = (props) => {
  const [slidePosition, setSlidePosition] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);

  useEffect(() => {
    setSliderWidth(document.getElementById('pokemon-detail-slider').scrollWidth);
    setChildWidth(document.getElementById('pokemon-detail-slider').children?.[0]?.clientWidth + 8)
  }, [])

  const mobile = useMedia("(max-width: 31.25rem)");

  const slideNavigation = ({ currentTarget }: SyntheticEvent) => {
    const direction = (currentTarget as HTMLButtonElement).value;
    if (direction === "next") {
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
          value="prev"
          onClick={slideNavigation}
          disabled={slidePosition >= 0}
        >
          <LeftArrowIcon />
        </SliderButton>
      )}
      <Slider>
        <SliderContent id='pokemon-detail-slider' slidePosition={slidePosition / 16}>
          {props.children}
        </SliderContent>
      </Slider>
      {!mobile && (
        <SliderButton
          value="next"
          onClick={slideNavigation}
          disabled={slidePosition <= -sliderWidth + childWidth}
        >
          <RightArrowIcon />
        </SliderButton>
      )}
    </SliderContainer>
  );
};


const Container = styled.div<{ primaryColor: string, secondaryColor: string }>`
  background:${({ primaryColor = '#ee8328', secondaryColor = '#e14318' }) => `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`};
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 25rem;
    height: 25rem;
    background: url(${pokeballBackground}) no-repeat;
    background-size: cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: -12.5rem;
  }

  &::after {
    right: -12.5rem;
  }

  @media (max-width: 31.25rem) {
    &::before,
    &::after {
      display: none;
    }
  }
`;

const Content = styled.div`
  margin: 4.5rem 0 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 71.88rem) {
    flex-direction: column;
  }

  @media (max-width: 31.25rem) {
    margin: 3.5rem 0 5rem;
  }
`;

const PokemonData = styled.div`
  max-width: 26.13rem;

  @media (max-width: 71.88rem) {
    max-width: 37.5rem;
    text-align: center;
  }

  @media (max-width: 31.25rem) {
    text-align: left;
  }
`;

const PokemonNumber = styled.span`
  font-size: 1.5rem;
  line-height: 135%;
  font-weight: 700;
`;

const PokemonTypes = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;

  button {
    cursor: default;
  }

  @media (max-width: 71.88rem) {
    justify-content: center;
  }

  @media (max-width: 31.25rem) {
    justify-content: flex-start;
  }
`;

const PokemonName = styled.h1`
  font-size: 4rem;
  line-height: 135%;
  font-weight: 700;
  text-transform: uppercase;

  @media (max-width: 31.25rem) {
    font-size: 3rem;
  }
`;

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


const PokemonDescription = styled.p`
  font-size: 1rem;
  line-height: 150%;
  font-weight: 400;
  margin-bottom: 1.5rem;
`;

const Divider = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 13.25rem;
    margin: 0 auto;
  }

  &::before {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 100%
    );
  }

  &::after {
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  svg {
    width: 3.5rem;
    height: 3.5rem;
  }

  @media (max-width: 71.88rem) {
    position: static;
    transform: initial;
    flex-direction: row;
    align-items: center;
    margin: 2rem 0;

    &::before,
    &::after {
      width: 13.25rem;
      height: 1px;
    }

    &::before {
      background: linear-gradient(
        270deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    &::after {
      background: linear-gradient(
        90deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;

const PokemonImg = styled.div`
  img {
    width: 25rem;
    height: auto;
  }
`;


const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Slider = styled.div`
  max-width: 25rem;
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