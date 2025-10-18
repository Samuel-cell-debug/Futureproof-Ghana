#!/bin/bash

# Insert certificate generator section before the signup section
sed -i '/<!-- Signup Section -->/i \
<!-- Certificate Generator Section -->\
<section id="certificate-generator" class="section">\
    <div class="container">\
        <h2>Generate Your Certificate</h2>\
        <p class="section-subtitle">Create and download professional certificates for your achievements</p>\
        \
        <div class="certificate-generator">\
            <div class="certificate-form">\
                <h3>Certificate Details</h3>\
                <form id="certificate-form">\
                    <div class="form-group">\
                        <label for="certificate-name">Full Name</label>\
                        <input type="text" id="certificate-name" name="certificate-name" required>\
                    </div>\
                    \
                    <div class="form-group">\
                        <label for="certificate-badge">Achievement Badge</label>\
                        <select id="certificate-badge" name="certificate-badge" required>\
                            <option value="">Select a badge</option>\
                            <option value="green-starter">GREEN STARTER</option>\
                            <option value="eco-explorer">ECO EXPLORER</option>\
                            <option value="community-builder">COMMUNITY BUILDER</option>\
                            <option value="impact-leader">IMPACT LEADER</option>\
                            <option value="climate-hero">CLIMATE HERO</option>\
                        </select>\
                    </div>\
                    \
                    <div class="form-group">\
                        <label for="certificate-date">Achievement Date</label>\
                        <input type="date" id="certificate-date" name="certificate-date" required>\
                    </div>\
                    \
                    <div class="form-group">\
                        <label for="certificate-description">Description</label>\
                        <textarea id="certificate-description" name="certificate-description" rows="3" placeholder="Describe your achievement..."></textarea>\
                    </div>\
                    \
                    <button type="submit" class="cta-button primary">Generate Certificate</button>\
                </form>\
            </div>\
            \
            <div class="certificate-preview">\
                <h3>Certificate Preview</h3>\
                <div class="certificate-design" id="certificate-preview">\
                    <div class="certificate-border">\
                        <div class="certificate-header">\
                            <div class="certificate-logo">\
                                <i class="fas fa-seedling"></i>\
                            </div>\
                            <h2>CERTIFICATE OF ACHIEVEMENT</h2>\
                        </div>\
                        \
                        <div class="certificate-body">\
                            <p>This is to certify that</p>\
                            <div class="recipient-name" id="preview-name">[Your Name]</div>\
                            <p>has successfully completed the</p>\
                            <div class="achievement-badge" id="preview-badge">[Achievement Badge]</div>\
                            <p>for outstanding contributions to community development and environmental sustainability in Ghana.</p>\
                            \
                            <div class="certificate-footer">\
                                <div class="signature">\
                                    <div class="signature-line"></div>\
                                    <p>Director, Futureproof Ghana</p>\
                                </div>\
                                <div class="date" id="preview-date">[Date]</div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                \
                <button id="download-certificate" class="cta-button secondary" style="display: none;">Download Certificate</button>\
            </div>\
        </div>\
    </div>\
</section>
' index.html

echo "✅ Certificate generator section added!"
