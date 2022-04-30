import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  const [recipe, setRecipe] = useState<any>({});
  const [activeTab, setActiveTab] = useState("instructions");
  const params = useParams();
  const fetchRecipe = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=5ffe705935164d199ac8c0807fa212fe`
    );
    const detailData = await data.json();
    setRecipe(detailData);
  };
  useEffect(() => {
    fetchRecipe();
  }, [params.name]);

  return (
    <>
      <h2>{recipe.title}</h2>
      <DetailWrapper>
        <>
          <img src={recipe.image} alt="" />
        </>
        <Info>
          <div>
            <Button
              className={activeTab === "instructions" ? "active" : ""}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </Button>
            <Button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </Button>
          </div>
          {activeTab === "instructions" ? (
            <div>
              <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
              <h6 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h6>
            </div>
          ) : (
            <ul>
              {recipe.extendedIngredients.map((ingredient: any) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
        </Info>
      </DetailWrapper>
    </>
  );
}
const DetailWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  img {
    border-radius: 5px;
    max-height: 20rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 1;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;

  margin-top: 1%;
`;
const Info = styled.div`
  margin-left: 10rem;
  div:first-child {
    display: flex;
  }
  p,
  h6 {
    margin-top: 2rem;
    font-size: 1.2rem;
    line-height: 1.2;
  }
`;
export default Recipe;
