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
