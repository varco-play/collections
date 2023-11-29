import React from "react";
import { Collection } from "./Collaction";
import "./index.scss";

function App() {
  const [page, setPage] = React.useState(1);

  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [collactions, setCollactions] = React.useState([]);

  const cats = [
    { name: "Все" },
    { name: "Море" },
    { name: "Горы" },
    { name: "Архитектура" },
    { name: "Города" },
  ];

  React.useEffect(() => {
    setIsLoading(true);


    const category = categoryId ? `category=${categoryId}` : ``

    const pageParam = `page=${page}`

    fetch(
      `https://6567561064fcff8d731032bd.mockapi.io/Photos?${pageParam}&limit=3&${
        category
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollactions(json);
      })
      .catch((err) => {
        console.log("error", err);
        alert("error in fetching");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          collactions
            .filter((obj) => {
              return obj.name
                .toLowerCase()
                .includes(searchValue.toLocaleLowerCase());
            })
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li onClick={() => setPage(i + 1)} className={page == i + 1 ? "active" : ""}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
