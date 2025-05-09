/**
 * Handles the dropdown functionality for algorithm information sections
 */
document.addEventListener('DOMContentLoaded', function() {
    // Select all dropdown headers
    const dropdownHeaders = document.querySelectorAll('.dropdown-header');
    
    // Add click event to each header
    dropdownHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class for this header
            this.classList.toggle('active');
            
            // Get the content element (next sibling of the header)
            const content = this.nextElementSibling;
            
            // Toggle content visibility with smooth animation
            if (content.style.maxHeight) {
                // Close the dropdown
                content.style.maxHeight = null;
                
                // Rotate arrow icon back
                this.querySelector('i').classList.remove('fa-chevron-up');
                this.querySelector('i').classList.add('fa-chevron-down');
            } else {
                // Open the dropdown
                content.style.maxHeight = content.scrollHeight + "px";
                
                // Rotate arrow icon
                this.querySelector('i').classList.remove('fa-chevron-down');
                this.querySelector('i').classList.add('fa-chevron-up');
            }
        });
    });
});