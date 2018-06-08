
  var parsed = JSON.parse(forms_data);
  var numOf_Forms = parsed.length;


  $(document).ready ( function(){
      if( numOf_Forms == 0 ){
         $('.body').html("<h2> Nothing to show yet...  </h2>");
      }else{
         var allForms = create_table_body();
         $('.body').html(allForms);
      }
   });

  function create_table_body(){
     var tableBody= '';
     for (var form=0; form< numOf_Forms; form++) {
         var id = parsed[form]['form_id'];
         col_id = '<td>'+  parsed[form]['form_id']  +'</td>';
         col_name = '<td>'+  parsed[form]['form_name']  +'</td>';
         col_subs = '<td>'+  parsed[form]['submissions']  +'</td>';
         submit_link = '<td> <button type="button" onclick= "submit_page(\'' + id + '\')" >View</button></td>';
         submissions_link = '<td> <button type="button" onclick= "submissions_page(\'' + id + '\')" >View</button></td>';

         tableBody += '<tr>'+ col_id + col_name + col_subs  + submit_link + submissions_link +'</tr> ';
     }
  return tableBody;
  }

  function submit_page(id){
     window.location.href='/submit/' + id ;
  }

  function submissions_page(id){
     window.location.href='/submissions/' + id ;
  }

  $('#toBuilder_btn').click( function(){
     window.location.href='/formBuilder';
  });
