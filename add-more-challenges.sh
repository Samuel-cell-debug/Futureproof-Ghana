#!/bin/bash

# Add more challenge cards to the challenges grid
sed -i '/91 participants<\/span>/a \
                </div>\
            </div>\
        </div>\
        \
        <div class="challenge-card">\
            <div class="challenge-image" style="background: linear-gradient(135deg, #FF6B35, #FF8E53);"></div>\
            <div class="challenge-content">\
                <h3 class="challenge-title">Digital Literacy Program</h3>\
                <p>Teach digital skills to community members. Help bridge the digital divide in your area.</p>\
                <div class="challenge-meta">\
                    <span><i class="fas fa-clock"></i> 3 hours weekly</span>\
                    <span><i class="fas fa-map-marker-alt"></i> Urban Areas</span>\
                </div>\
                <div class="challenge-participants">\
                    <div class="participant-avatars">\
                        <div class="participant-avatar">D</div>\
                        <div class="participant-avatar">T</div>\
                        <div class="participant-avatar">+67</div>\
                    </div>\
                    <span>69 participants</span>\
                </div>\
                <button class="cta-button" style="width: 100%; margin-top: 15px;">Join Challenge</button>\
            </div>\
        </div>\
        \
        <div class="challenge-card">\
            <div class="challenge-image" style="background: linear-gradient(135deg, #6A11CB, #2575FC);"></div>\
            <div class="challenge-content">\
                <h3 class="challenge-title">Youth Mentorship Initiative</h3>\
                <p>Mentor young people in your community. Share your skills and experience.</p>\
                <div class="challenge-meta">\
                    <span><i class="fas fa-clock"></i> 2 hours weekly</span>\
                    <span><i class="fas fa-map-marker-alt"></i> Nationwide</span>\
                </div>\
                <div class="challenge-participants">\
                    <div class="participant-avatars">\
                        <div class="participant-avatar">Y</div>\
                        <div class="participant-avatar">M</div>\
                        <div class="participant-avatar">+112</div>\
                    </div>\
                    <span>114 participants</span>\
                </div>\
                <button class="cta-button" style="width: 100%; margin-top: 15px;">Join Challenge</button>\
            </div>\
        </div>' index.html

echo "✅ More challenge cards added!"
