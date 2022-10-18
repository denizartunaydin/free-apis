import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import useSWR from "swr";
import { Col, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {
  const { data, error } = useSWR("https://api.publicapis.org/entries", fetcher);
  const [viewData, setViewData] = useState(18);

  return (
    <>
      <div className="container">
        {data ? (
          <>
            <InfiniteScroll
              className="list-container"
              dataLength={data.entries.slice(0, viewData)} //This is important field to render the next data
              next={() => setViewData(viewData + 20)}
              hasMore={true}
              loader={<></>}
            >
              <Row>
                {data.entries.slice(0, viewData).map((c: any, i: number) => {
                  return (
                    <>
                      <Col md={6} lg={4}>
                        <div className="list-container__item">
                          <p>{c.API}</p>
                        </div>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </InfiniteScroll>
          </>
        ) : (
          <></>
        )}

        <div
          className="col-md-12 text-align"
          onClick={() => setViewData(viewData + 20)}
        >
          Load More
        </div>
      </div>
    </>
  );
}

export default App;
