
  var parsed = JSON.parse(form_data);

  $(document).ready ( function(){
       if(parsed.length == 0){
          $('.body').html("<h3> No Submissions yet... </h3>");

       }else{

       var numOf_Fields = parsed[0]['fields'].length;
       place_table_headers(numOf_Fields)
       place_submissions_input(numOf_Fields)
        }
  });

  function place_table_headers(numOf_Fields){
       $('.heads').append("<th>Id</th>");
       for (var fld=0; fld < numOf_Fields ; fld++) {
         headers = '<th>'+  parsed[0]['fields'][fld]['name']  +'</th>';
         $('.heads').append(headers);
       }
  }

  function place_submissions_input(numOf_Fields){
    var allSubmissions= '';
    for (var input=0; input<parsed.length; input++) {
          var submission ='<td>' + (input+1) + '</td>';
          for( var fld =0 ; fld < numOf_Fields; fld++){
              submission += '<td>'+  parsed[input]['fields'][fld]['input']  +'</td>';
          }
          allSubmissions += '<tr>'+ submission + '</tr> ';
       }
       $('.body').html(allSubmissions);
  }


$('#back_btn').click( function(){
    window.location.href='/formList';
});

