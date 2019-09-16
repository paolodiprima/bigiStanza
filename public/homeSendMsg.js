(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var form = document.getElementById('contatti');
        // Loop over them and prevent submission
      
        form.addEventListener('submit', function (event) {
             
            if (form.checkValidity() === false) {
                form.classList.add('was-validated');
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                event.stopPropagation();
                callAjax(event);
                form.classList.add('was-validated');
                form.reset();
            }
            
        }, false);
    }, false);
})();


function callAjax(event) {
    let data = $('#contatti').serialize();

    // msg insert into db and email sent to BGStanza email's address        
    $.ajax({
        dataType: 'JSON',
        data: data,
        type: 'POST',
        url: '/api-insert-info',
        success: function (dataj, status) {

            $('form#contatti').trigger('reset');
            $('form#contatti').removeClass('was-validated');  // remove validation msg after submit success
            alert("MESSAGGIO INVIATO!");
        },
        error: function (error) {
            $('form#contatti').removeClass('was-validated');
            alert("Si è verificato un errore durante l'invio \n" + error.responseText);
            

        }
    });
} 
