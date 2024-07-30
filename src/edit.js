import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Edit({ attributes, setAttributes }) {
  const { keyword } = attributes;
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [results, setResults] = useState([]);

  const apiUrl = `/wp-json/poster-wall-block/v1/douban?q=${encodeURIComponent(
    searchKeyword
  )}`;

  useEffect(() => {
    if (searchKeyword) {
      axios.get(apiUrl).then((response) => {
        const data = response.data;
        setResults(data.cards || []);
      });
    }
  }, [searchKeyword]);

  const handleSearchClick = () => {
    setSearchKeyword(keyword);
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Settings", "poster-wall-block")}>
          <TextControl
            label={__("Keyword", "poster-wall-block")}
            value={keyword}
            onChange={(value) => setAttributes({ keyword: value })}
          />
          <Button variant="primary" onClick={handleSearchClick}>
            {__("Search", "poster-wall-block")}
          </Button>
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps()}>
        {results.map((card, index) => (
          <div key={index} className="poster-card">
            <a href={card.url} target="_blank" rel="noopener noreferrer">
              <img src={card.cover_url} alt={card.title} />
            </a>
            <div className="poster-card-info">
              <h3>{card.title}</h3>
              <p>{card.card_subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          .poster-card {
            display: inline-block;
            margin: 10px;
            text-align: center;
          }
          .poster-card img {
            max-width: 200px;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          .poster-card-info {
            margin-top: 10px;
          }
        `}
      </style>
    </>
  );
}
