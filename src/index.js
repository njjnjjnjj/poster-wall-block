/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

/**
 * Define a custom SVG icon for the block. This icon will appear in
 * the Inserter and when the user selects the block in the Editor.
 */
const posterWallIcon = (
  <svg
    t="1722309610698"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="19602"
    width="200"
    height="200"
  >
    <path
      d="M794.624 901.12c2.048-16.384 2.048-32.768 2.048-49.152V194.56v-2.048c2.048 2.048 4.096 2.048 8.192 2.048h141.312c34.816 0 63.488 26.624 63.488 65.536v577.536c0 32.768-20.48 57.344-51.2 63.488h-163.84z"
      fill="#BDBDBD"
      p-id="19603"
    ></path>
    <path
      d="M188.416 194.56c0-12.288 0-22.528 6.144-34.816 12.288-24.576 32.768-36.864 59.392-36.864h481.28c30.72 0 53.248 16.384 63.488 43.008 2.048 8.192 4.096 18.432 4.096 26.624 2.048 4.096 2.048 8.192 2.048 12.288v679.936c0 6.144 0 10.24-4.096 16.384-4.096 14.336-12.288 26.624-24.576 34.816-10.24 8.192-22.528 12.288-34.816 12.288H253.952c-30.72 0-53.248-16.384-63.488-47.104-2.048-4.096-4.096-8.192-4.096-12.288V880.64 204.8c0-2.048 0-6.144 2.048-10.24z"
      fill="#4C4C4C"
      p-id="19604"
    ></path>
    <path
      d="M188.416 194.56V880.64c0 6.144 0 14.336 2.048 20.48H79.872C45.056 901.12 16.384 874.496 16.384 837.632V258.048c0-32.768 20.48-57.344 53.248-63.488h118.784z"
      fill="#BDBDBD"
      p-id="19605"
    ></path>
  </svg>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata.name, {
  icon: posterWallIcon,
  /**
   * @see ./edit.js
   */
  edit: Edit,
  /**
   * @see ./save.js
   */
  save,
});
