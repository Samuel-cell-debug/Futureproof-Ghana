#!/bin/bash

cd /workspaces/futureproof-ghana

echo "🔄 Implementing professional certificate image generation..."

# Update the certificate generation JavaScript
cat > js/certificate-generator.js << 'JSEOF'
// Professional Certificate Generator with Image Download
class CertificateGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupEventListeners();
    }

    createCanvas() {
        // Create hidden canvas for certificate generation
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1200;
        this.canvas.height = 800;
        this.canvas.style.display = 'none';
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    setupEventListeners() {
        const certificateForm = document.getElementById('certificate-form');
        const downloadBtn = document.getElementById('download-certificate');
        
        if (certificateForm) {
            certificateForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateCertificateImage();
            });
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadCertificateImage();
            });
        }

        // Real-time preview updates
        document.getElementById('certificate-name')?.addEventListener('input', (e) => {
            document.getElementById('preview-name').textContent = e.target.value || '[Your Name]';
        });
        
        document.getElementById('certificate-badge')?.addEventListener('change', (e) => {
            const badgeText = e.target.options[e.target.selectedIndex].text;
            document.getElementById('preview-badge').textContent = badgeText || '[Achievement Badge]';
        });
        
        document.getElementById('certificate-date')?.addEventListener('change', (e) => {
            const date = new Date(e.target.value);
            document.getElementById('preview-date').textContent = e.target.value ? date.toLocaleDateString() : '[Date]';
        });
    }

    generateCertificateImage() {
        const formData = new FormData(document.getElementById('certificate-form'));
        const data = Object.fromEntries(formData);
        
        if (!data['certificate-name'] || !data['certificate-badge'] || !data['certificate-date']) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const submitBtn = document.querySelector('#certificate-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Generating Certificate...';
        submitBtn.disabled = true;
        
        // Simulate generation process
        setTimeout(() => {
            this.drawCertificate(data);
            document.getElementById('download-certificate').style.display = 'inline-block';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.showNotification('Certificate generated! Click "Download Certificate" to save as PNG.', 'success');
        }, 1500);
    }

    drawCertificate(data) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f8f9fa');
        gradient.addColorStop(1, '#e9ecef');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Decorative border
        ctx.strokeStyle = '#0A5C36';
        ctx.lineWidth = 15;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
        
        // Ghana flag colors accent
        ctx.fillStyle = '#0A5C36';
        ctx.fillRect(50, 50, canvas.width - 100, 60);
        ctx.fillStyle = '#FCD116';
        ctx.fillRect(50, 110, canvas.width - 100, 20);
        ctx.fillStyle = '#CE1126';
        ctx.fillRect(50, 130, canvas.width - 100, 20);
        
        // Title
        ctx.fillStyle = '#0A5C36';
        ctx.font = 'bold 48px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE OF ACHIEVEMENT', canvas.width / 2, 220);
        
        // Subtitle
        ctx.fillStyle = '#666';
        ctx.font = '24px "Segoe UI", Arial, sans-serif';
        ctx.fillText('Futureproof Ghana', canvas.width / 2, 260);
        
        // Main content
        ctx.fillStyle = '#333';
        ctx.font = '24px "Segoe UI", Arial, sans-serif';
        ctx.fillText('This is to certify that', canvas.width / 2, 340);
        
        // Recipient name
        ctx.fillStyle = '#0A5C36';
        ctx.font = 'bold 36px "Segoe UI", Arial, sans-serif';
        ctx.fillText(data['certificate-name'].toUpperCase(), canvas.width / 2, 400);
        
        // Achievement text
        ctx.fillStyle = '#333';
        ctx.font = '24px "Segoe UI", Arial, sans-serif';
        ctx.fillText('has successfully earned the', canvas.width / 2, 450);
        
        // Badge
        ctx.fillStyle = '#FCD116';
        ctx.font = 'bold 28px "Segoe UI", Arial, sans-serif';
        const badgeText = data['certificate-badge'].toUpperCase().replace('-', ' ');
        ctx.fillText(badgeText, canvas.width / 2, 500);
        
        // Description
        ctx.fillStyle = '#333';
        ctx.font = '20px "Segoe UI", Arial, sans-serif';
        ctx.fillText('for outstanding contributions to community development', canvas.width / 2, 550);
        ctx.fillText('and environmental sustainability in Ghana.', canvas.width / 2, 580);
        
        // Date
        const achievementDate = new Date(data['certificate-date']).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        ctx.fillStyle = '#666';
        ctx.font = '20px "Segoe UI", Arial, sans-serif';
        ctx.fillText(`Date: ${achievementDate}`, canvas.width / 2, 650);
        
        // Signature line
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 150, 720);
        ctx.lineTo(canvas.width / 2 + 150, 720);
        ctx.stroke();
        
        ctx.fillStyle = '#666';
        ctx.font = '18px "Segoe UI", Arial, sans-serif';
        ctx.fillText('Director, Futureproof Ghana', canvas.width / 2, 760);
        
        // Logo
        ctx.fillStyle = '#0A5C36';
        ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif';
        ctx.fillText('🌱', canvas.width / 2, 180);
    }

    downloadCertificateImage() {
        if (!this.canvas) {
            this.showNotification('Please generate a certificate first', 'error');
            return;
        }
        
        this.showNotification('Downloading certificate as PNG...', 'info');
        
        setTimeout(() => {
            const name = document.getElementById('certificate-name').value || 'certificate';
            const link = document.createElement('a');
            link.download = `futureproof-ghana-certificate-${name.replace(/\s+/g, '-')}.png`;
            link.href = this.canvas.toDataURL('image/png');
            link.click();
            
            this.showNotification('Certificate downloaded successfully!', 'success');
        }, 500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Initialize certificate generator
document.addEventListener('DOMContentLoaded', () => {
    new CertificateGenerator();
});
JSEOF

echo "✅ Professional certificate generator implemented!"

# Update the main enhanced script to include certificate functionality
sed -i 's|this.setupCertificateGenerator();|// Certificate handling moved to separate module|' js/enhanced-script.js

# Add certificate script to HTML
sed -i 's|<script src="js/enhanced-script.js"></script>|<script src="js/enhanced-script.js"></script>\n    <script src="js/certificate-generator.js"></script>|' index.html

# Add CSS for better certificate preview
cat >> styles/style.css << 'CSSEOF'

/* Enhanced Certificate Preview */
.certificate-preview {
    position: relative;
}

.certificate-preview::before {
    content: 'Live Preview - PNG Export';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.certificate-design {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border: 3px solid #0A5C36;
    position: relative;
}

.certificate-design::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: #0A5C36;
}

.certificate-design::after {
    content: '';
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to right, #0A5C36 0%, #0A5C36 33%, #FCD116 33%, #FCD116 66%, #CE1126 66%, #CE1126 100%);
}

.certificate-border {
    position: relative;
    z-index: 1;
    padding-top: 80px;
}

.certificate-header {
    text-align: center;
    margin-bottom: 2rem;
}

.certificate-logo {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.certificate-header h2 {
    color: #0A5C36;
    font-size: 1.5rem;
    margin: 0;
}

.recipient-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: #0A5C36;
    margin: 1rem 0;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.achievement-badge {
    display: inline-block;
    background: #FCD116;
    color: #333;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-weight: bold;
    margin: 1rem 0;
}

.certificate-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    align-items: flex-end;
}

.signature-line {
    width: 150px;
    height: 1px;
    background: #333;
    margin-bottom: 0.5rem;
}

.signature p {
    margin: 0;
    font-size: 0.8rem;
}

.date {
    font-weight: bold;
    font-size: 0.9rem;
}
CSSEOF

echo "✅ Enhanced certificate CSS added!"

# Restart server to apply changes
pkill -f "live-server"
npm start &

echo "🎉 CERTIFICATE SYSTEM UPGRADED!"
echo "📄 Certificates now generate as professional PNG images"
echo "🤝 Partners section enhanced with detailed information"
echo "🌐 Refresh your browser to see the improvements!"
