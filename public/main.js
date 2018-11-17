
$('.modalInfo').on("click",()=> {
  const notes = $('.userNotes').val().trim();
  console.log(notes)
  const id = $('.modalInfo').attr('type');
  console.log(id)
 
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/notes1/" + id,
    data: {
      note: notes
    }
  })
  .then(function(data) {
    // Log the response
    console.log(data);
 //  $('.modalInfo').val('');
   
  });

});


$('.getNotes').on('click',()=> {
window.location.href = '/notes/'
})

