import { useBlockProps } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const blockProps = useBlockProps.save();
    return (
        <div { ...blockProps }>
            <div
                className="poster-cards"
                dangerouslySetInnerHTML={{ __html: attributes.staticHtml }}
            />
        </div>
    );
};

export default save;