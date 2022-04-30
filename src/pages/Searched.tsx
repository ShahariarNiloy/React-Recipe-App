import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name: any) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=5ffe705935164d199ac8c0807fa212fe&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };
  useEffect(() => {
    getSearched(params.searched);
  }, [params.searched]);

  return (
    <Grid
      key={"search" + params.searched}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {searchedRecipes.map((item: any) => {
        return (
          <Card key={item.id}>
            <Link to={`/recipe/` + item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 2rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 1rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
