(function ($) {
    'use strict';

    // ⚠️ CONFIGURE THIS: Replace with your GitHub username
    const GITHUB_USERNAME = 'zendev2112'; // Change this!
    const GITHUB_REPO = 'estimado-songs';
    const GITHUB_BRANCH = 'main';

    // Build CDN base URL
    const CDN_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/`;

    console.log('🔄 Cassette CDN Override loading...');
    console.log('📦 CDN Base URL:', CDN_BASE_URL);

    // Store original Song._init
    const OriginalSongInit = $.Song.prototype._init;

    // Override Song._init to use CDN URLs
    $.Song.prototype._init = function () {
        // Override the sources with CDN URLs
        this.sources = {
            mp3: CDN_BASE_URL + encodeURIComponent(this.name) + '.mp3',
            ogg: CDN_BASE_URL + encodeURIComponent(this.name) + '.ogg',
        };
        console.log('🎵 Loading song from CDN:', this.name);
        console.log('   MP3 URL:', this.sources.mp3);
    };

    // Keep sounds local (they're small and don't need CDN)
    console.log('✅ Cassette CDN Override loaded');
    console.log('   → Songs: Loading from GitHub CDN');
    console.log('   → Sounds: Loading locally from /sounds');

})(jQuery);