<?php
/**
 * Plugin Name:       Poster Wall Block
 * Description:       Show Poster Wall in your page or post;
 * Version:           0.1.0
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       poster-wall-block
 *
 * @package           create-block
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_poster_wall_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_poster_wall_block_init');

/**
 * Registers a custom REST API endpoint for fetching data from Douban.
 */
function register_douban_proxy_endpoint()
{
	register_rest_route(
		'poster-wall-block/v1',
		'/douban/',
		array(
			'methods' => 'GET',
			'callback' => 'fetch_douban_data',
			'permission_callback' => '__return_true'
		)
	);
}
add_action('rest_api_init', 'register_douban_proxy_endpoint');

/**
 * Callback function for the custom REST API endpoint.
 */
function fetch_douban_data(WP_REST_Request $request)
{
	$keyword = $request->get_param('q');
	// $type = $request->get_param('type');
	$response = wp_remote_get("https://www.douban.com/j/search_suggest?q={$keyword}");

	if (is_wp_error($response)) {
		return new WP_Error('external_api_error', 'Error calling external API', array('status' => 500));
	}

	$body = wp_remote_retrieve_body($response);
	$data = json_decode($body, true);
	// TODO: 处理 data，将 data.cards 进行筛选，筛选条件为 type 属性，现在的版本会出现数据类型被转换的问题
	// 处理 data，将 data.cards 进行筛选，筛选条件为 type 属性
	// Filter cards based on type
	// if (!empty($type) && !empty($data['cards'])) {
	// 	$data['cards'] = array_filter($data['cards'], function ($card) use ($type) {
	// 		return isset($card['type']) && $card['type'] === $type;
	// 	});
	// }

	return rest_ensure_response($data);
	// return $request->get_param('q');
}