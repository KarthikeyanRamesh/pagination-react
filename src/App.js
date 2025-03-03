import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="product__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => {
              const pageToBeShown = page > 1 ? page - 1 : products.length / 10;
              setPage(pageToBeShown);
            }}
          >
            ◀️
          </span>
          {[...Array(products.length / 10)].map((_, index) => {
            return (
              <span
                className={page === index + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(index + 1)}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            className={
              page < products.length / 10 ? "" : "pagination__disabled"
            }
            onClick={() => {
              const pageToBeShown = page < products.length / 10 ? page + 1 : 1;
              setPage(pageToBeShown);
            }}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
