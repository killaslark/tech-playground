import { useRouter } from 'next/router';
import React from 'react';

import styled, { keyframes } from "styled-components";

import RulerIcon from "pokemon/assets/icons/icon-ruler.svg";
import WeightIcon from "pokemon/assets/icons/icon-weight.svg";
import { POKEMON_TYPES } from "pokemon/constants";
import { usePokemonDetail } from "pokemon/queries";

const PokemonDetailStatusCard = () => {
  const { query } = useRouter()
  const pokemonName = query?.name as string;

  const request = {
    name: pokemonName
  }
  const { data: pokemon } = usePokemonDetail(request);

  const formatStatName = (statName: string) => {
    switch (statName) {
      case "hp":
        return "HP";
      case "attack":
        return "Attack";
      case "defense":
        return "Defense";
      case "special-attack":
        return "Sp. Atk";
      case "special-defense":
        return "Sp. Def";
      case "speed":
        return "Speed";
    }
  };

  const pokemonTypes = pokemon.types || []

  const primaryType = POKEMON_TYPES.find(
    (type) => pokemonTypes[0].type.name.includes(type.name)
  );

  const secondaryType = POKEMON_TYPES.find(
    (type) => pokemonTypes[1]?.type?.name?.includes?.(type.name)
  )

  return (
    <Container primaryColor={primaryType?.color} secondaryColor={secondaryType?.color}>
      <CardOverlay color={primaryType.color} />
      <Modal>
        <PokemonStats>
          <StatsTitle>Stats</StatsTitle>
          <StatsList>
            {pokemon.stats.map(({ stat, baseStat }) =>
              React.Children.toArray(
                <Stats>
                  <span style={{ fontWeight: 'bold' }}>{baseStat}</span>
                  <ProgressBar baseStat={baseStat}>
                    <ProgressBarFill baseStat={baseStat} />
                  </ProgressBar>
                  <span style={{ fontWeight: 'bold' }}>{formatStatName(stat.name)}</span>
                </Stats>
              )
            )}
          </StatsList>
        </PokemonStats>
        <PokemonStats>
          <PokemonFeatures>
            <PokemonWeight>
              <div>
                <WeightIcon />
                <span>{`${pokemon.weight / 10}`} kg</span>
              </div>
              <span>Weight</span>
            </PokemonWeight>
            <PokemonHeight>
              <div>
                <RulerIcon />
                <span>{`${pokemon.height / 10}`} m</span>
              </div>
              <span>Height</span>
            </PokemonHeight>
          </PokemonFeatures>
        </PokemonStats>
      </Modal>
    </Container>
  );
};

export default PokemonDetailStatusCard;


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


const PokemonStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem 2.5rem 0rem 2.5rem;

  @media (max-width: 62.5rem) {
    padding: 2rem 1.5rem 2.5rem;
  }
`;


const modal = keyframes`
  to {
    opacity: initial;
    transform: initial; 
  }
`;

const Modal = styled.div`
  width: 100%;
  align-items: end;
  opacity: 0;
  transform: scale(0.8);
  animation: ${modal} 0.4s forwards;

  @media (max-width: 62.5rem) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;


const StatsTitle = styled.span`
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 400;
  display: block;
  margin-bottom: 1rem;
  text-align: center;
`;

const Stats = styled.div`
  text-align: center;
  min-width: max-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`

const StatsList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  span {
    font-size: 1rem;
    line-height: 1;
    font-weight: 400;
    display: inline-block;
  }

  span:nth-child(1) {
    min-width: 4.38rem;
  }

  span:nth-child(2) {
    min-width: 1.88rem;
    margin: 0 1.25rem;
    font-weight: 700;
    text-align: center;
  }

  @media (max-width: 31.25rem) {
    span:nth-child(2) {
      margin: 0 0.75rem;
    }
  }
`;

const ProgressBar = styled.div<{ baseStat: number }>`
  display: flex;
  height: 15rem;
  width: 6rem;
  border-radius: 0.25rem;
  background: ${(props) => (props.baseStat >= 50 ? "#1CD80E" : "#FF364E")};
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
`;

const progressBar = keyframes`
    to {
      transform: initial;
    }
`;

const ProgressBarFill = styled.div<{ baseStat: number }>`
  height: ${(props) =>
    props.baseStat >= 100 ? "0%" : `${100 - props.baseStat}%`};
  background: #555;
  box-shadow: 0 0 0.75rem 0.25rem
    ${(props) =>
    props.baseStat >= 50
      ? "rgba(28, 216, 14, 0.25)"
      : "rgba(255, 54, 78, 0.25)"};
  width: 6rem;
  border-radius: -0.25rem;
  transform: translate3d(0, -100%, 0);
  animation: ${progressBar} 2s forwards;
  align-items: center;
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