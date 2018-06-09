
    var FormName = JSON.parse(form_name);
    var parsed = JSON.parse(form_fields);
    var result = init_form_json();

     // Creating the fields elements on HTML
    $(document).ready( function(){
        var strFinal = '';
        for (var fld=0; fld<parsed.length; fld++) {
            var lable_str = '<li><label for='+fld+'>' + parsed[fld]['lable'] + '</label> ';
            var input_str = ' <input type='+parsed[fld]['type']+' id= '+fld+' name = '+ parsed[fld]['name']+' placeholder="Enter your input"></li></br>'
            strFinal += (lable_str + input_str) ;
         }
        $('.container').html(strFinal);
    });

    function init_form_json(){
        var fields = [];
        var formPackage = new Object();
        formPackage.form_name = FormName
        formPackage.fields = fields
        return formPackage;
    }

    //Submit the Form
    $('#submit_btn').click( function(){
      $('.container').ready(function(){
        var validInput = true;
        $(this).find('[name]').each(function(index, value){
            var data = {};
            var that = $(this),
            name = that.attr('name'),
            input = that.val();

            if( input == ''){  //check if input is valid
                validInput = false;
            }else{
                init_field_json(data,name,input);
            }
        });
        if(!validInput){
            alert("All fields are required");
            result['fields']=[]; //delete result
        }else{
            post_and_redirect()
        }
      });
    });


    function init_field_json(data,name,input){
        data.name = name;
        data.input = input;
        result['fields'].push(data);
    }

    function post_and_redirect(){
        var FormStr = JSON.stringify(result);
        postData('/submit/' +form_id , FormStr);
        window.location.href='/finishSubmitting';
    }

    //back to from list page
    $('#backBtn').click( function(){
         window.location.href='/formList';
    });


    function postData(url, data) {
        return fetch(url, {
	        method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            },
            body: data // must match 'Content-Type' header
        })
        .then(response => response.json()) // parses response to JSON
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
