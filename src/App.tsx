import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import useSWR from "swr";
import { Col, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {
  const [randomFetch, setRandomFetch] = React.useState(false);

  const { data, error } = useSWR("https://api.publicapis.org/entries", fetcher);
  const { data: category, error: errorCategory } = useSWR(
    "https://api.publicapis.org/categories",
    fetcher
  );

  const { data: random, error: randomError } = useSWR(
    randomFetch ? "https://api.publicapis.org/random" : null,
    fetcher
  );

  const [viewData, setViewData] = useState(18);

  const [search, setSearch] = useState({
    text: "",
    category: "-1",
    auth: "-1",
    https: "-1",
    cors: "-1",
  });

  const filterData = () => {
    return data.entries.filter(
      (c: any) =>
        (c.API.toLowerCase().includes(search.text.toLowerCase()) ||
          c.Description.toLowerCase().includes(search.text.toLowerCase())) &&
        (search.category !== "-1"
          ? c.Category.toLowerCase() === search.category.toLowerCase()
          : true) &&
        (search.auth !== "-1"
          ? c.Auth.toLowerCase() === search.auth.toLowerCase()
          : true) &&
        (search.https !== "-1"
          ? (c.HTTPS + "").toLowerCase() === search.https.toLowerCase()
          : true) &&
        (search.cors !== "-1"
          ? c.Cors.toLowerCase() === search.cors.toLowerCase()
          : true)
    );
  };

  return (
    <>
      <div className="intro">
        <div className="container">
          <div className="intro__container">
            <div className="intro__container__title">Next Project API</div>
            <div
              className="intro__container__random"
              onClick={() => setRandomFetch(true)}
            >
              Random API
            </div>
          </div>
        </div>
      </div>

      <div className="random">
        <div className="container"></div>
      </div>

      <div className="container">
        <div className="filter-container">
          <Row>
            <Col sm={12} md={12} lg={6}>
              <Col sm={12} md={12}>
                <div className="filter-container__search-container">
                  <label className="filter-container__search-container__label">
                    Search API
                  </label>

                  <input
                    type="text"
                    placeholder="search for something"
                    onChange={(e: any) =>
                      setSearch({ ...search, text: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Col>
            <Col sm={12} md={12} lg={6}>
              <Row>
                <Col sm={12} md={3}>
                  <div className="filter-container__select-container">
                    <label className="filter-container__select-container__label">
                      Categories
                    </label>
                    <select
                      className="filter-container__select-container__select"
                      onChange={(e: any) =>
                        setSearch({ ...search, category: e.target.value })
                      }
                    >
                      <option
                        value="-1"
                        selected={search.category === "-1" ? true : false}
                      >
                        Select All
                      </option>
                      {category && category.categories ? (
                        <>
                          {category.categories.map((c: string) => {
                            return (
                              <option
                                value={c}
                                selected={search.category === c ? true : false}
                              >
                                {c}
                              </option>
                            );
                          })}
                        </>
                      ) : (
                        <></>
                      )}
                    </select>
                  </div>
                </Col>

                <Col sm={12} md={3}>
                  <div className="filter-container__select-container">
                    <label className="filter-container__select-container__label">
                      Auth
                    </label>
                    <select
                      className="filter-container__select-container__select"
                      onChange={(e: any) =>
                        setSearch({ ...search, auth: e.target.value })
                      }
                    >
                      <option value="-1">Select All</option>
                      <option value="apiKey">ApiKey</option>
                      <option value="OAuth">OAuth</option>
                      <option value="">No</option>
                    </select>
                  </div>
                </Col>

                <Col sm={12} md={3}>
                  <div className="filter-container__select-container">
                    <label className="filter-container__select-container__label">
                      Https
                    </label>
                    <select
                      className="filter-container__select-container__select"
                      onChange={(e: any) =>
                        setSearch({ ...search, https: e.target.value })
                      }
                    >
                      <option
                        value="-1"
                        selected={search.https === "-1" ? true : false}
                      >
                        Select All
                      </option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </Col>

                <Col sm={12} md={3}>
                  <div className="filter-container__select-container">
                    <label className="filter-container__select-container__label">
                      Cors
                    </label>
                    <select
                      className="filter-container__select-container__select"
                      onChange={(e: any) =>
                        setSearch({ ...search, cors: e.target.value })
                      }
                    >
                      <option value="-1">Select All</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
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
                {filterData()
                  .slice(0, viewData)
                  .map((c: any, i: number) => {
                    return (
                      <>
                        <Col md={6} lg={4}>
                          <div className="list-container__item">
                            <div className="list-container__item__header">
                              <div className="list-container__item__title">
                                {c.API}
                              </div>
                              <BsBoxArrowUpRight
                                onClick={() => window.open(c.Link, "_blank")}
                              />
                            </div>

                            <div className="list-container__item__subtitle">
                              {c.Category}
                            </div>

                            <div className="list-container__item__description">
                              {c.Description}
                            </div>

                            <div className="list-container__item__line"></div>

                            <div className="list-container__item__bottom">
                              <div className="list-container__item__bottom__container">
                                <div className="list-container__item__bottom__container__item">
                                  <div className="list-container__item__bottom__container__item--type">
                                    Auth:
                                  </div>
                                  <div>
                                    {c.Auth.length > 0
                                      ? c.Auth.charAt(0).toUpperCase() +
                                        c.Auth.slice(1)
                                      : "No"}
                                  </div>
                                </div>
                                <div className="list-container__item__bottom__container__item">
                                  <div className="list-container__item__bottom__container__item--type">
                                    Https:
                                  </div>
                                  <div>{c.HTTPS ? "Yes" : "No"}</div>
                                </div>

                                <div className="list-container__item__bottom__container__item">
                                  <div className="list-container__item__bottom__container__item--type">
                                    Cors:
                                  </div>
                                  <div>
                                    {c.Cors.charAt(0).toUpperCase() +
                                      c.Cors.slice(1)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </>
                    );
                  })}
              </Row>
            </InfiniteScroll>
          </>
        ) : (
          <>
            <Row>
              {[1, 2, 3, 4, 5, 6].map(() => {
                return (
                  <>
                    <Col md={6} lg={4}>
                      <div className="skeleton-card">
                        <div className="skeleton-card__header">
                          <div className="skeleton-card__header--title"></div>
                          <div className="skeleton-card__header--button"></div>
                        </div>

                        <div className="skeleton-card__subtitle"></div>
                        <div className="skeleton-card__description"></div>
                        <div className="skeleton-card__description"></div>

                        <div className="skeleton-card__line"></div>

                        <div className="skeleton-card__bottom">
                          <div className="skeleton-card__bottom__container">
                            <div className="skeleton-card__bottom__container__item"></div>
                            <div className="skeleton-card__bottom__container__item"></div>
                            <div className="skeleton-card__bottom__container__item"></div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </>
                );
              })}
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default App;
