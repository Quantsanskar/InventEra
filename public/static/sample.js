$(document).ready(function(){
  
    $(".new").on("click", function(){
      var url = "https://api.myjson.com/bins/3wzdk";
      var num = randomNumber(20);    
      function randomNumber(num) {
      var random = Math.floor((Math.random() * num)+1);
      return random;
  }   
        
      $.getJSON(url, function(data){  
        var tweet = "https://twitter.com/intent/tweet?text=" + data[num].quote + data[num].author;
        $("#quote").fadeOut("fast", function(){
          $(this).fadeIn().text(data[num].quote);
        $("#author").fadeIn().text(data[num].author);    
        $('#link').attr('href', tweet);
           }); //end fadeOut function  
        
        }); //end JSON
     }); //end button
  }); //end ready