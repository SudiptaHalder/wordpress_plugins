<?php
/**
 * Plugin Name: Analytics Dashboard
 * Plugin URI: https://yourdomain.com
 * Description: Modern analytics and performance dashboard for WordPress
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) exit;

// Constants
define('ANALYTICS_DASHBOARD_VERSION', '1.0.0');
define('ANALYTICS_DASHBOARD_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ANALYTICS_DASHBOARD_PLUGIN_PATH', plugin_dir_path(__FILE__));

class AnalyticsDashboard {

    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('wp_head', array($this, 'inject_tracking_script'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        register_activation_hook(__FILE__, array($this, 'activate'));
    }

    public function init() {
        $this->setup_default_options();
    }

    private function setup_default_options() {
        if (!get_option('analytics_dashboard_site_id')) {
            update_option('analytics_dashboard_site_id', wp_generate_uuid4());
        }

        if (!get_option('analytics_dashboard_backend_url')) {
            update_option('analytics_dashboard_backend_url', 'http://localhost:5000');
        }
    }

    public function add_admin_menu() {
        add_menu_page(
            'Analytics Dashboard',
            'Analytics',
            'manage_options',
            'analytics-dashboard',
            array($this, 'render_dashboard'),
            'dashicons-chart-bar',
            30
        );
    }

    public function render_dashboard() {
        ?>
        <div class="wrap">
            <h1>Analytics Dashboard</h1>
            <div id="analytics-dashboard-root"></div>
        </div>
        <?php
    }

    public function inject_tracking_script() {
        // Only load on frontend (not admin)
        if (is_admin()) return;

        $site_id = get_option('analytics_dashboard_site_id');
        $backend_url = get_option('analytics_dashboard_backend_url');

        if (!$site_id || !$backend_url) return;

        echo "<script>
            window._wpAnalyticsSiteId = '" . esc_js($site_id) . "';
        </script>";

        echo "<script src='" . esc_url($backend_url) . "/tracker.js' async></script>";
    }

    public function enqueue_admin_scripts($hook) {
        if ($hook !== 'toplevel_page_analytics-dashboard') return;

        wp_enqueue_script(
            'analytics-dashboard',
            ANALYTICS_DASHBOARD_PLUGIN_URL . 'build/assets/index.js',
            array(),
            ANALYTICS_DASHBOARD_VERSION,
            true
        );

        wp_enqueue_style(
            'analytics-dashboard',
            ANALYTICS_DASHBOARD_PLUGIN_URL . 'build/assets/index.css',
            array(),
            ANALYTICS_DASHBOARD_VERSION
        );
    }

    public function activate() {
        $this->setup_default_options();
    }
}

new AnalyticsDashboard();


// Helper: UUID generator fallback
if (!function_exists('wp_generate_uuid4')) {
    function wp_generate_uuid4() {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }
}
?>
