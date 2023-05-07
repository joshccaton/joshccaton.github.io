$(document).ready(function(){
    $("#guitar button").click(function(){
      var note = $(this).text();
      $('button').each(function(){
        if($(this).text() == note){
          if($(this).hasClass("selected")){
            $(this).removeClass("selected");
          }
          else{
            $(this).addClass("selected");
          }
        }
      });
    });
    $("#remove-selected-btn").click(function() {
      $("button").removeClass("selected");
    });
  });