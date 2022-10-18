import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useSWR from "swr";
import { Col, Row } from "react-bootstrap";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {
  const { data, error } = useSWR("https://api.publicapis.org/entries", fetcher);
  const [viewData, setViewData] = useState(20);

  return (
    <div className="container">
      <Row>
        {data ? (
          <>
            {data.entries.slice(0, viewData).map((c: any, i: number) => {
              return (
                <>
                  <Col md={4}>
                    <div>
                      <p>{c.API}</p>
                    </div>
                  </Col>
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </Row>

      <div
        className="col-md-12 text-align"
        onClick={() => setViewData(viewData + 20)}
      >
        Load More
      </div>
    </div>
  );
}

export default App;
