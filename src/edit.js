import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps, useBlockEditProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button, Spinner, SelectControl } from "@wordpress/components";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Edit({ attributes, setAttributes }) {
    const { keyword = "", type = "movie" } = attributes;
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const [searchType, setSearchType] = useState(type);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [htmlContent, setHtmlContent] = useState("");
    
    const apiUrl = `/wp-json/poster-wall-block/v1/douban?q=${encodeURIComponent(searchKeyword)}&type=${encodeURIComponent(searchType)}`;

    useEffect(() => {
        if (searchKeyword) {
            setLoading(true);
            axios.get(apiUrl)
                .then((response) => {
                    const data = response.data;
                    if (data.cards) {
                        data.cards = data.cards.filter((card) => card.type === searchType);
                    }
                    const contentHtml = data.cards.map(card => `
                        <div class="poster-card">
                            <a href="${card.url}" target="_blank" rel="noopener noreferrer">
                                <img src="${card.cover_url}" alt="${card.title}" referrerpolicy="never"/>
                            </a>
                            <div class="poster-card-info">
                                <h3>${card.title}</h3>
                                <p>${card.card_subtitle}</p>
                            </div>
                        </div>
                    `).join('');
                    setHtmlContent(contentHtml);
                    setResults(data.cards || []);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [searchKeyword, searchType]);

    const handleSearchClick = () => {
        setSearchKeyword(keyword);
        setSearchType(type);
        setAttributes({ keyword: searchKeyword, type: searchType });
    };

    // Store static HTML content in the block's attributes
    useEffect(() => {
        if (!loading) {
            setAttributes({ staticHtml: htmlContent });
        }
    }, [htmlContent, loading]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Settings", "poster-wall-block")}>
                    <TextControl
                        label={__("Keyword", "poster-wall-block")}
                        value={keyword}
                        onChange={(value) => setAttributes({ keyword: value })}
                    />
                    <SelectControl
                        label={__("Type", "poster-wall-block")}
                        value={type}
                        options={[
                            { label: __("Movie", "poster-wall-block"), value: "movie" },
                            { label: __("Book", "poster-wall-block"), value: "book" },
                        ]}
                        onChange={(value) => setAttributes({ type: value })}
                    />
                    <Button variant="primary" onClick={handleSearchClick}>
                        {__("Search", "poster-wall-block")}
                    </Button>
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps()}>
                {loading && (
                    <div className="loading">
                        <Spinner />
                        <p>{__("Loading...", "poster-wall-block")}</p>
                    </div>
                )}
                {!loading && (
                    <div
                        className="poster-cards"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                )}
            </div>
            <style>
                {`
                  .loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 20px;
                  }
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