import { useEffect, useState } from "react";

function App() {
  const [quote, setQuote] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [route, setRoute] = useState("random");

  useEffect(() => {
    if (route === "random")
      fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((res) => {
          setQuote({ ...res });
        });
    else if (route === "author")
      fetch("https://api.quotable.io/quotes?author=" + quote.authorSlug)
        .then((res) => res.json())
        .then((res) => {
          setQuotes({ ...res });
        });
  }, [route]);

  console.log(quote);

  return (
    <div className="main">
      <button className="button" onClick={() => setRoute("random")}>
        <span>random</span>
        <span className="material-symbols-outlined">autorenew</span>
      </button>
      {route === "random" ? (
        <div className="random-content">
          <table>
            <tbody>
              <tr>
                <th style={{ backgroundColor: "#f7df94", width: "8px" }} />
                <th style={{ width: "100px" }} />
                <th className="quote">{quote.content}</th>
              </tr>
            </tbody>
          </table>
          <div className="author-container">
            <div className="wrapper">
              <div className="author">{quote.author}</div>
              <div className="tags">
                {quote.tags?.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>
            <span
              className="material-symbols-outlined"
              onClick={() => setRoute("author")}
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
              <tbody>
                <tr>
                  <th style={{ backgroundColor: "#f7df94", width: "8px" }} />
                  <th style={{ width: "100px" }} />
                  <th className="quote">{item.content}</th>
                </tr>
              </tbody>
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

export function Body() {
  return <div> </div>;
}

export default App;
