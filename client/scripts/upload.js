const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080'
    : 'https://api.your-domain.com';

const form = document.getElementById('uploadForm');
const status = document.getElementById('status');
const submitButton = form.querySelector('button');

form.onsubmit = async (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    status.textContent = 'Uploading...';
    
    const formData = new FormData();
    const fileField = document.getElementById('imageInput');
    
    if (!fileField.files[0]) {
        status.textContent = 'Please select a file';
        submitButton.disabled = false;
        return;
    }
    
    formData.append('file', fileField.files[0]);

    console.log(formData);
    
    try {
        const response = await fetch(`${API_URL}/image`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        status.textContent = result.message;
    } catch (error) {
        status.textContent = `Upload failed: ${error.message}`;
    } finally {
        submitButton.disabled = false;
    }
};
