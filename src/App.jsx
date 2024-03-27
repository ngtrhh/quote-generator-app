import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [route, setRoute] = useState("random");

  useEffect(() => {
    if (loading) {
      if (route === "random")
        fetch("https://api.quotable.io/random")
          .then((res) => res.json())
          .then((res) => {
            setQuote({ ...res });
          })
          .finally(setLoading(!loading));
      else if (route === "author")
        fetch("https://api.quotable.io/quotes?author=" + quote.authorSlug)
          .then((res) => res.json())
          .then((res) => {
            setQuotes({ ...res });
          })
          .finally(setLoading(!loading));
    }
  }, [loading]);

  const handleRandom = (route) => {
    setLoading(!loading);
    setRoute(route);
  };

  return (
    <div className="main">
      <button className="button" onClick={() => handleRandom("random")}>
        <span>random</span>
        <span className="material-symbols-outlined">autorenew</span>
      </button>
      {route === "random" ? (
        <div className="random-content">
          <table>
            <tr>
              <th style={{ backgroundColor: "#f7df94", width: "8px" }} />
              <th style={{ width: "100px" }} />
              <th className="quote">{quote.content}</th>
            </tr>
          </table>
          <div className="author-container">
            <div className="wrapper">
              <div className="author">{quote.author}</div>
              <div className="tags">
                {quote.tags?.map((item) => (
                  <div>{item}</div>
                ))}
              </div>
            </div>
            <span
              class="material-symbols-outlined"
              onClick={() => handleRandom("author")}
            >
              east
            </span>
          </div>
        </div>
      ) : (
        <div className="author-content">
          <div className="title">{quote.author}</div>
          {quotes.results?.map((item, index) => (
            <table key={index}>
              <tr>
                <th style={{ backgroundColor: "#f7df94", width: "8px" }} />
                <th style={{ width: "100px" }} />
                <th className="quote">{item.content}</th>
              </tr>
            </table>
          ))}
        </div>
      )}
      <div className="footer">
        created by <span>Nguyen Ngoc Trinh</span> - devChallenges.io
      </div>
    </div>
  );
}

export default App;
