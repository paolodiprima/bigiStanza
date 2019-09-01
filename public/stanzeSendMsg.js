// window.addEventListener('submit',function(event){

//     event.preventDefault();
//     this.alert($("body").attr("data-id"));
// });

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
    let appartId = $("body").attr("data-id");
    let url = "/api-insert-info/" + appartId;
    // msg insert into db and email sent to BGStanza email's address        
    $.ajax({
        dataType: 'JSON',
        data: data,
        type: 'POST',
        url: url,
        success: function (dataj, status) {

            $('form#contatti').trigger('reset');
            $('form#contatti').removeClass('was-validated');  // remove validation msg after submit success
            alert("MESSAGGIO INVIATO!");
        },
        error: function (error) {
            alert("Si è verificato un errore durante l'invio \n" + error.responseText);
            $('form#contatti').removeClass('was-validated');

        }
    });
} 

function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}