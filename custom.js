const videos = [
    { id: 1, title: "My First Video", category: "nature", videoId: "vedios1", channel: "My Channel", views: "100K", timestamp: "1 week ago" },
    { id: 2, title: "My Second Video", category: "technology", videoId: "vedios2", channel: "My Channel", views: "50K", timestamp: "3 days ago" },
    { id: 3, title: "My Third Video", category: "food", videoId: "vedios3", channel: "My Channel", views: "30K", timestamp: "1 days ago" },
    { id: 4, title: "My Fourth Video", category: "fitness", videoId: "vedios4", channel: "My Channel", views: "45K", timestamp: "2 days ago" },
    { id: 5, title: "My Fifth Video", category: "travel", videoId: "vedios5", channel: "My Channel", views: "96K", timestamp: "5 days ago" },
    { id: 1, title: "My Sixth Video", category: "nature", videoId: "vedios6", channel: "My Channel", views: "100K", timestamp: "1 week ago" },
    { id: 2, title: "My Seventh Video", category: "technology", videoId: "vedios7", channel: "My Channel", views: "50K", timestamp: "3 days ago" },
    { id: 3, title: "My Eight Video", category: "food", videoId: "vedios8", channel: "My Channel", views: "30K", timestamp: "1 days ago" },
    { id: 4, title: "My Ninith Video", category: "fitness", videoId: "vedios9", channel: "My Channel", views: "45K", timestamp: "2 days ago" },
    { id: 5, title: "My Tenth Video", category: "travel", videoId: "vedios10", channel: "My Channel", views: "96K", timestamp: "5 days ago" },
];
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const videoContainer = document.getElementById('video-container');
    const categoryPills = document.querySelectorAll('.category-pill');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });

    function createVideoCard(video) {
        return `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                <div class="video-card" data-video-id="${video.videoId}" data-video-title="${video.title}">
                    <div class="video-thumbnail">
                        <video class="vedios" controls width="100%" poster="thumbnails/${video.videoId}.jpg">
                            <source src="vedios/${123}.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        
                    </div>
                    <div class="card-body p-0 pt-2">
                        <div class="d-flex">
                            <img src="https://i.pravatar.cc/150?img=${video.id}" class="channel-icon me-3" alt="Channel Icon">
                            <div>
                                <h5 class="video-title">${video.title}</h5>
                                <p class="video-channel m-0">${video.channel}</p>
                                <p class="video-stats">${video.views} views • ${video.timestamp}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function displayVideos(videosToDisplay) {
        videoContainer.innerHTML = videosToDisplay.map(createVideoCard).join('');
    }

    function filterVideos(category) {
        if (category === 'all') {
            displayVideos(videos);
        } else {
            const filteredVideos = videos.filter(video => video.category === category);
            displayVideos(filteredVideos);
        }
    }

    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            filterVideos(this.dataset.category);
        });
    });

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        const searchResults = videos.filter(video => 
            video.title.toLowerCase().includes(searchTerm) || 
            video.channel.toLowerCase().includes(searchTerm)
        );
        displayVideos(searchResults);
    });

    videoContainer.addEventListener('click', function(e) {
        const videoCard = e.target.closest('.video-card');
        if (videoCard) {
            const videoId = videoCard.dataset.videoId;
            const videoTitle = videoCard.dataset.videoTitle;
            const modalTitle = document.getElementById('videoModalLabel');
            const modalIframe = document.querySelector('#videoModal iframe');
            
            modalTitle.textContent = videoTitle;
            modalIframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
            videoModal.show();
        }
    });

    document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
        const modalIframe = document.querySelector('#videoModal iframe');
        modalIframe.src = '';
    });

    // Initial display of all videos
    displayVideos(videos);
});