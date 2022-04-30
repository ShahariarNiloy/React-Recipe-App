import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);
  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=5ffe705935164d199ac8c0807fa212fe&number=20&tags=vegetarian`
      );
      const data = await api.json();

      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      console.log(data);
    }
  };
  useEffect(() => {
    getVeggie();
  }, []);
  return (
    <div>
      <Wrapper>
        <h3>Vegetarian Picks</h3>

        <Splide
          options={{
            perPage: 3,
            gap: "4rem",
            arrows: false,
            pagination: false,
            drag: "free",
            height: "250px",
          }}
        >
          {veggie.map((recipe: any) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card key={recipe.id}>
                  <Link to={`/recipe/` + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 1.5rem 0rem -4.5rem;
`;

const Card = styled.div`
  min-height: 20rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 1rem;
    width: 100%;
    height: 65%;
    position: absolute;
    left: 0;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 30%;
    transform: translate(-50%, 0%);
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 0.8rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 65%;
  border-radius: 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
