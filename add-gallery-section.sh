#!/bin/bash

# Insert gallery section after partners section
sed -i '/<!-- Partners Section -->/a \
<!-- Community Projects Gallery -->\
<section id="community-projects" class="section bg-light">\
    <div class="container">\
        <h2>Community Projects Gallery</h2>\
        <p class="section-subtitle">See the impact being made across Ghana</p>\
        \
        <div class="gallery-filters">\
            <button class="filter-btn active" data-filter="all">All Projects</button>\
            <button class="filter-btn" data-filter="environment">Environment</button>\
            <button class="filter-btn" data-filter="education">Education</button>\
            <button class="filter-btn" data-filter="community">Community</button>\
        </div>\
        \
        <div class="projects-grid">\
            <div class="project-card" data-category="environment">\
                <div class="project-image">\
                    <div class="image-placeholder">Tree Planting</div>\
                </div>\
                <div class="project-info">\
                    <h3>Accra Green Initiative</h3>\
                    <p>500+ trees planted in urban areas of Accra</p>\
                    <div class="project-stats">\
                        <span><i class="fas fa-users"></i> 45 volunteers</span>\
                        <span><i class="fas fa-calendar"></i> Completed</span>\
                    </div>\
                </div>\
            </div>\
            \
            <div class="project-card" data-category="education">\
                <div class="project-image">\
                    <div class="image-placeholder">Digital Skills</div>\
                </div>\
                <div class="project-info">\
                    <h3>Kumasi Digital Hub</h3>\
                    <p>Teaching digital skills to 200+ youth</p>\
                    <div class="project-stats">\
                        <span><i class="fas fa-users"></i> 28 volunteers</span>\
                        <span><i class="fas fa-calendar"></i> Ongoing</span>\
                    </div>\
                </div>\
            </div>\
            \
            <div class="project-card" data-category="community">\
                <div class="project-image">\
                    <div class="image-placeholder">Cleanup</div>\
                </div>\
                <div class="project-info">\
                    <h3>Takoradi Beach Cleanup</h3>\
                    <p>Removed 2 tons of plastic from beaches</p>\
                    <div class="project-stats">\
                        <span><i class="fas fa-users"></i> 89 volunteers</span>\
                        <span><i class="fas fa-calendar"></i> Completed</span>\
                    </div>\
                </div>\
            </div>\
            \
            <div class="project-card" data-category="environment">\
                <div class="project-image">\
                    <div class="image-placeholder">Farm</div>\
                </div>\
                <div class="project-info">\
                    <h3>Northern Region Farming</h3>\
                    <p>Sustainable farming practices for 50 families</p>\
                    <div class="project-stats">\
                        <span><i class="fas fa-users"></i> 32 volunteers</span>\
                        <span><i class="fas fa-calendar"></i> Ongoing</span>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</section>' index.html

echo "✅ Community projects gallery added!"
