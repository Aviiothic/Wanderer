// Bootstrap form validation
// (function() {
//     'use strict';
    
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll('.needs-validation');
    
//     // Loop over them and prevent submission
//     Array.from(forms).forEach(form => {
//         form.addEventListener('submit', event => {
//             if (!form.checkValidity()) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
            
//             form.classList.add('was-validated');
//         }, false);
//     });
// })();



document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".needs-validation");

    form.addEventListener("submit", function (event) {
        let isValid = true;

        form.querySelectorAll("input[required], textarea[required]").forEach(input => {
            if (!input.value.trim()) {
                input.classList.add("is-invalid");
                input.nextElementSibling.style.display = "block"; // Show feedback
                isValid = false;
            } else {
                input.classList.remove("is-invalid");
                input.nextElementSibling.style.display = "none"; // Hide feedback
            }
        });

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    // Remove error on typing
    form.querySelectorAll("input[required], textarea[required]").forEach(input => {
        input.addEventListener("input", () => {
            if (input.value.trim()) {
                input.classList.remove("is-invalid");
                input.nextElementSibling.style.display = "none"; // Hide error
            }
        });
    });
});