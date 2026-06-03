/*
This JavaScript file is part of a Publii plugin.
It is crucial that any modifications made to this file are saved in a minimized format,
as the plugin uses the minimized version for optimal performance.
Minification reduces file size and improves load times, enhancing the user experience.
Please ensure to minify the file before deploying any updates.
*/


(function() {
    document.addEventListener("DOMContentLoaded", function() {
        const contactForm = document.getElementById("formsubmit");
        const responseDiv = document.getElementById("responseMessage");

        if (contactForm) {
            // Gestione pulizia errori durante la digitazione
            contactForm.addEventListener("input", function(e) {
                // 1. Pulizia del singolo campo
                const fieldContainer = e.target.closest('.fs-field');
                if (fieldContainer) {
                    fieldContainer.classList.remove("is-invalid");
                    fieldContainer.removeAttribute('data-error');
                }

                // 2. Pulizia del messaggio globale (solo se non usiamo val-msg)
                if (responseDiv && !contactForm.classList.contains('val-msg')) {
                    responseDiv.className = ""; 
                    responseDiv.innerText = "";
                }
            });

            contactForm.addEventListener("submit", function(event) {
                // Reset iniziale al click sul submit
                if (responseDiv) {
                    responseDiv.className = ""; 
                    responseDiv.innerText = "";
                }

                if (!contactForm.checkValidity()) {
                    event.preventDefault(); // Blocca l'invio se ci sono errori

                    const firstInvalid = Array.from(contactForm.elements).find(input => !input.checkValidity());
                    
                    if (firstInvalid) {
                        const fieldContainer = firstInvalid.closest('.fs-field');
                        if (fieldContainer) {
                            fieldContainer.classList.add("is-invalid");
                            const errorMessage = firstInvalid.validationMessage;
                            fieldContainer.setAttribute('data-error', errorMessage);
                            
                            // Mostra nel responseMessage solo se manca .val-msg
                            if (responseDiv && !contactForm.classList.contains('val-msg')) {
                                responseDiv.className = "msg msg--warning";
                                responseDiv.innerText = errorMessage;
                                responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                            
                            firstInvalid.focus();
                        }
                    }
                }
                // Se valido, l'invio prosegue normalmente verso FormSubmit
            });
        }
    });
})();