document.addEventListener('DOMContentLoaded', () => {

    // --- Custom File Input Display ---
    const voiceUpload = document.getElementById('voice-upload');
    const voiceFileName = document.getElementById('voice-file-name');
    
    if (voiceUpload) {
        voiceUpload.addEventListener('change', (e) => {
            voiceFileName.textContent = e.target.files[0] ? e.target.files[0].name : '';
        });
    }

    const imageUpload = document.getElementById('image-upload');
    const imageFileName = document.getElementById('image-file-name');

    if (imageUpload) {
        imageUpload.addEventListener('change', (e) => {
            if (e.target.files.length > 1) {
                imageFileName.textContent = `${e.target.files.length} files selected`;
            } else if (e.target.files.length === 1) {
                imageFileName.textContent = e.target.files[0].name;
            } else {
                imageFileName.textContent = '';
            }
        });
    }
    
    const csvUpload = document.getElementById('csv-upload');
    const csvFileName = document.getElementById('csv-file-name');
    
    if (csvUpload) {
        csvUpload.addEventListener('change', (e) => {
            csvFileName.textContent = e.target.files[0] ? e.target.files[0].name : '';
        });
    }
    
    const videoUpload = document.getElementById('video-upload');
    const videoFileName = document.getElementById('video-file-name');
    
    if (videoUpload) {
        videoUpload.addEventListener('change', (e) => {
            videoFileName.textContent = e.target.files[0] ? e.target.files[0].name : '';
        });
    }


    // --- Mock Video Generation Logic ---
    const generationForm = document.getElementById('generation-form');
    const generateButton = document.getElementById('generate-button');
    const generationStatus = document.getElementById('generation-status');
    const loadingSpinner = document.getElementById('loading-spinner');
    const videoOutput = document.getElementById('video-output');
    const csvError = document.getElementById('csv-error');
    const generateAgainButton = document.getElementById('generate-again-button');

    if (generationForm) {
        generationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            // Validation: Check if CSV file is provided
            if (csvUpload.files.length === 0) {
                csvError.classList.remove('hidden');
                return;
            }
            
            csvError.classList.add('hidden');

            // Hide form, show status
            generationForm.classList.add('hidden');
            generationStatus.classList.remove('hidden');
            
            // Show loading spinner
            loadingSpinner.classList.remove('hidden');
            videoOutput.classList.add('hidden');
            
            // Simulate generation delay
            setTimeout(() => {
                // Hide loading, show output
                loadingSpinner.classList.add('hidden');
                videoOutput.classList.remove('hidden');
            }, 3000); // 3-second mock generation
        });
    }

    // Reset button
    if (generateAgainButton) {
        generateAgainButton.addEventListener('click', () => {
            // Show form, hide status
            generationForm.classList.remove('hidden');
            generationStatus.classList.add('hidden');
            csvError.classList.add('hidden');

            // Reset video output and form fields
            videoOutput.classList.add('hidden');
            
            if(voiceUpload) voiceUpload.value = '';
            if(imageUpload) imageUpload.value = '';
            if(csvUpload) csvUpload.value = '';
            if(videoUpload) videoUpload.value = '';
            
            voiceFileName.textContent = '';
            imageFileName.textContent = '';
            csvFileName.textContent = '';
            videoFileName.textContent = '';
        });
    }

});