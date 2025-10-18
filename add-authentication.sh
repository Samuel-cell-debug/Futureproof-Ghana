#!/bin/bash

# Add login modal and auth functionality
sed -i '/<\/footer>/a \
<!-- Login Modal -->\
<div id="login-modal" class="modal">\
    <div class="modal-content">\
        <button class="close-modal">&times;</button>\
        <h2>Welcome Back</h2>\
        <form id="login-form">\
            <div class="form-group">\
                <label for="login-email">Email Address</label>\
                <input type="email" id="login-email" name="login-email" required>\
            </div>\
            \
            <div class="form-group">\
                <label for="login-password">Password</label>\
                <input type="password" id="login-password" name="login-password" required>\
            </div>\
            \
            <button type="submit" class="cta-button primary">Sign In</button>\
        </form>\
        \
        <div class="auth-links">\
            <p>Don\'t have an account? <a href="#signup" id="switch-to-signup">Sign up here</a></p>\
            <p><a href="#forgot-password">Forgot your password?</a></p>\
        </div>\
    </div>\
</div>\
\
<!-- User Profile Dropdown (will be shown when logged in) -->\
<div id="user-profile" class="user-profile" style="display: none;">\
    <div class="profile-dropdown">\
        <div class="profile-header">\
            <div class="profile-avatar">U</div>\
            <div class="profile-info">\
                <div class="profile-name">User</div>\
                <div class="profile-email">user@example.com</div>\
            </div>\
        </div>\
        <div class="profile-menu">\
            <a href="#dashboard" class="profile-link"><i class="fas fa-tachometer-alt"></i> Dashboard</a>\
            <a href="#certificates" class="profile-link"><i class="fas fa-certificate"></i> My Certificates</a>\
            <a href="#settings" class="profile-link"><i class="fas fa-cog"></i> Settings</a>\
            <button id="logout-btn" class="profile-link logout"><i class="fas fa-sign-out-alt"></i> Logout</button>\
        </div>\
    </div>\
</div>' index.html

# Update navigation to include login button
sed -i 's|<a href="#signup" class="cta-button nav-cta">Join Now</a>|<a href="#signup" class="cta-button nav-cta">Join Now</a>\
                </li>\
                <li><a href="#login" class="nav-link" id="login-trigger">Login</a>|' index.html

echo "✅ Authentication system added!"
