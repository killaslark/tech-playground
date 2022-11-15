import React from "react";

import styled, { keyframes } from "styled-components";
import { useAtom } from "jotai";

import { useMedia } from "@core/hooks";

import { POKEMON_TYPES } from "pokemon/constants";
import pokemonModal from "pokemon/atoms/pokemonModal";
import { usePokemonDetail } from "pokemon/queries";

import WeightIcon from "src/pokemon/assets/icons/icon-weight.svg";
import RulerIcon from "src/pokemon/assets/icons/icon-ruler.svg";
import DividerIcon from "src/pokemon/assets/icons/divider-pokeball.svg";
import CloseIcon from "src/pokemon/assets/icons/icon-close.svg";

import PokemonType from "./PokemonType";
import SkeletonLoading from "./SkeletonLoading";
import Loading from "./Loading";
import Slide from "./Slide";


const PokemonModal = () => {
  const [modalState, setModalState] = useAtom(pokemonModal);

  const onCloseModal = () => setModalState({
    activePokemon: null
  })

  const pokemonName = modalState.activePokemon

  const request = {
    name: pokemonName,
  }
  const { isLoading, data: pokemon } = usePokemonDetail(request, {
    enabled: !!pokemonName
  })

  if (!pokemonName) {
    return null
  }

  const pokemonTypes = pokemon?.types || []

  const imageList = Object.values(pokemon?.sprites?.other?.home || {}).filter(value => value);

  const primaryType = POKEMON_TYPES.find(
    (type) => pokemonTypes[0].type.name.includes(type.name)
  );

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

  const formatPokemonId = (id: number) => `#${String(id).padStart(3, '0')}`;

  return (
    <Wrapper>
      <Modal>
        <PokemonData>
          <CardOverlay color={primaryType.color} />
          <PokemonImg>
            <SkeletonLoading src={imageList[0]} alt={pokemon.name} />
          </PokemonImg>
          <PokemonNumber>{formatPokemonId(pokemon.id)}</PokemonNumber>
          <PokemonName>{pokemon.name}</PokemonName>
          <PokemonTypeWrapper>
            {pokemon.types.map(({ type }) => (
              <PokemonType key={type.name} type={type.name} reduceTabIndex={false} />
            ))}
          </PokemonTypeWrapper>
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
        </PokemonData>

        <Divider>
          <DividerIcon />
        </Divider>

        <PokemonStats>
          <StatsTitle>Stats</StatsTitle>
          <StatsList>
            {pokemon.stats.map(({ stat, baseStat }) =>
              React.Children.toArray(
                <li>
                  <span>{formatStatName(stat.name)}</span>
                  <span>{baseStat}</span>
                  <ProgressBar>
                    <ProgressBarFill
                      base_stat={baseStat}
                    ></ProgressBarFill>
                  </ProgressBar>
                </li>
              )
            )}
          </StatsList>
        </PokemonStats>
      </Modal>
      <CloseButton onPress={onCloseModal} />
    </Wrapper>
  );
};

export default PokemonModal;


interface CloseButtonProps {
  onPress?: () => void
}
const CloseButton: React.FC<CloseButtonProps> = (props) => {
  const { onPress } = props;
  const mobile = useMedia("(max-width: 980px)");

  return (
    <CloseButtonWrapper onClick={onPress} mobile={mobile}>
      <CloseIcon />
    </CloseButtonWrapper>
  )
};


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: ${() => (window.innerHeight < 650 ? "flex-start" : "center")};

  overflow-y: scroll;

  @media (max-width: 62.5rem) {
    align-items: start;
  }

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
`;

const modal = keyframes`
  to {
    opacity: initial;
    transform: initial; 
  }
`;

const Modal = styled.div`
  background: rgba(6, 11, 40, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  position: relative;
  display: grid;
  grid-template-columns: 21rem 3.5rem 34.75rem;
  align-items: end;
  opacity: 0;
  transform: scale(0.8);
  animation: ${modal} 0.4s forwards;
  margin: ${() => (window.innerHeight < 650 ? "12.87rem 1rem 7rem" : "0")};

  @media (max-width: 62.5rem) {
    width: 100%;
    grid-template-columns: 1fr;
    margin: 14rem 1rem 7rem;
  }
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

  &::after {
    content: "";
    display: block;
    width: 12.5rem;
    height: 12.5rem;
    background: ${(props) => props.color};
    filter: blur(128px);
    position: absolute;
    top: 0;
    left: 4.25rem;
  }

  @media (max-width: 62.5rem) {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const PokemonData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2.5rem;

  @media (max-width: 62.5rem) {
    padding: 7rem 0 2rem;
  }
`;

const PokemonImg = styled.div`
  position: absolute;
  top: -9.38rem;
  left: 2.5rem;

  @media (max-width: 62.5rem) {
    top: -10.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const PokemonNumber = styled.span`
  font-size: 1.25rem;
  line-height: 135%;
  font-weight: 700;
`;

const PokemonTypeWrapper = styled.div`
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
  margin-top: 1.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const PokemonWeight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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

const Divider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  svg {
    width: 3.5rem;
    height: 3.5rem;
  }

  &::before,
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 7.75rem;
    background: rgba(255, 255, 255, 0.25);
    margin: 0 auto;
  }

  @media (max-width: 62.5rem) {
    flex-direction: row;
    align-items: center;

    svg {
      width: 3.5rem;
      height: 3.5rem;
    }

    &::before,
    &::after {
      width: 100%;
      height: 1px;
    }

    svg {
      flex-shrink: 0;
    }
  }
`;

const PokemonStats = styled.div`
  padding: 2.5rem 4.5rem 2.5rem 2.5rem;

  @media (max-width: 62.5rem) {
    padding: 2rem 1.5rem 2.5rem;
  }
`;

const PokemonEvolutionList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
`


const PokemonEvolutionSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
`

const StatsTitle = styled.span`
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 400;
  display: block;
  margin-bottom: 1rem;
`;

const StatsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

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

  li {
    display: flex;
    align-items: center;
  }

  @media (max-width: 31.25rem) {
    span:nth-child(2) {
      margin: 0 0.75rem;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: #555;
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

const ProgressBarFill = styled.div<{ base_stat: number }>`
  width: ${(props) =>
    props.base_stat >= 100 ? "100%" : `${props.base_stat}%`};
  background: ${(props) => (props.base_stat >= 50 ? "#1CD80E" : "#FF364E")};
  box-shadow: 0 0 0.75rem 0.25rem
    ${(props) =>
    props.base_stat >= 50
      ? "rgba(28, 216, 14, 0.25)"
      : "rgba(255, 54, 78, 0.25)"};
  height: 0.5rem;
  border-radius: 0.25rem;
  transform: translate3d(-100%, 0, 0);
  animation: ${progressBar} 2s forwards;
`;

const CloseButtonWrapper = styled.button<{ mobile: boolean }>`
  background: none;
  position: absolute;
  top: 1.5rem;
  right: ${(props) => (props.mobile ? "1rem " : "1.5rem")};

  svg {
    width: 3rem;
    height: 3rem;
  }
`;
