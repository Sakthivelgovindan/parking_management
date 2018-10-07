function parking_vehicle(){

        this.onload_home_page = function(){
           var home = "";

           home ="<h2>Welcome to parking Management</h2>"+
                 "<p>Search and compare all available parking options and prices at thousands of parking lots and garages in 40 cities in real-time.</p>";

                 $('#dynamic_content').html(home);
        }

        this.add_vehicle = function(){
            var home = "";

            home ='<legend>Add new User</legend><div class="form-group"><label for="inputdefault">Vehicle No:</label>'+
                  '<input class="form-control" id="vehicle_no" type="text"></div><div class="form-group">'+
                  '<label for="inputlg">Vehicle Modal:</label><input class="form-control form-control-sm" id="vehicle_modal" type="text">'+
                  '</div><div class="form-group"><label for="inputsm">Vehicle type:</label>'+
                  '<input class="form-control form-control-lg" id="vehicle_type" type="text"><br> <button type="submit" class="btn btn-default" id="vehicle_add">Add vehicle</button><br><br><span id="insert_response" style="color:green;display:none;">Vehicle added successfully....</span></div>';

                  $('#dynamic_content').html(home);
        }

        this.edit_vehicle = function(){
            var home = "";

            home ='<legend>Edit Vehicle Details</legend><div class="form-group"><label for="inputdefault">Vehicle No:</label>'+
                  '<input class="form-control" id="vehicle_no" type="text"><br><button type="submit" class="btn btn-default" id="vehicle_edit">Get Vehicle Details</button><br><br><span style="color:red;display:none;" id="edit_response">Vehicle not found.....</span></div><div class="form-group">'+
                  '<label for="inputlg">Vehicle Modal:</label><input class="form-control form-control-sm" id="vehicle_modal" type="text">'+
                  '</div><div class="form-group"><label for="inputsm">Vehicle type:</label>'+
                  '<input class="form-control form-control-lg" id="vehicle_type" type="text"><br> <button type="submit" class="btn btn-default" id="vehicle_update">Update</button><br><br><span id="update_response" style="color:green;display:none;">Vehicle updated successfully....</span></div>';

                  $('#dynamic_content').html(home);
        }

        this.exit_vehicle = function(){
            var home = "";

            home ='<legend>Exit Vehicle</legend><div class="form-group"><label for="inputdefault">Vehicle No:</label>'+
                  '<input class="form-control" id="vehicle_no" type="text"><br><button type="submit" class="btn btn-default" id="vehicle-exit">Submit</button></div>';

                  $('#dynamic_content').html(home);
        }

}

$(document).ready(function(){
   var vehicle = new parking_vehicle();
   vehicle.onload_home_page();


   $(document).on('click','#add_vehicle',function(){
    vehicle.add_vehicle();
   });

   $(document).on('click','#edit_vehicle',function(){
    vehicle.edit_vehicle();
   });

   $(document).on('click','#exit_vehicle',function(){
    vehicle.exit_vehicle();
   });

   $(document).on('click','#home',function(){
    vehicle.onload_home_page();
   });

   $(document).on('click','#vehicle_add',function(){

        var vehicle_no = $('#vehicle_no').val();
        var vehicle_modal = $('#vehicle_modal').val();
        var vehicle_type = $('#vehicle_type').val();

        var data_val = {};
        data_val['action']     = "add_vehicle";
        data_val['vehicle_no'] = vehicle_no;
        data_val['vehicle_modal'] = vehicle_modal;
        data_val['vehicle_type'] = vehicle_type;

        json_value = JSON.stringify(data_val);
        $.ajax({
            url: "model/vehicle.php",
            type: "POST",
            data: {
                myData :json_value
            },
            async: false
        }).done(function(result) {
            var data =JSON.parse(result);
            $('#insert_response').show();
            if(data.response == "true"){
                setTimeout(function(){
                    $('#insert_response').hide();
                },2000);
            }
        });

   });

   $(document).on('click','#vehicle_edit',function(){

    var vehicle_no = $('#vehicle_no').val();
    var data_val = {};
    data_val['action']     = "edit_vehicle";
    data_val['vehicle_no'] = vehicle_no;
    json_value = JSON.stringify(data_val);
    $.ajax({
        url: "model/vehicle.php",
        type: "POST",
        data: {
            myData :json_value
        },
        async: false
    }).done(function(result) {

        var data =JSON.parse(result);
        console.log(data[0]['vehicle_model']);
        if(data[0]['vehicle_model'] == null || data[0]['vehicle_type'] == null){
            $('#edit_response').show();
            setTimeout(function(){
                $('#edit_response').hide();
            },2000);
        }
        else{
            $('#vehicle_modal').val(data[0]['vehicle_model']);
            $('#vehicle_type').val(data[0]['vehicle_type']);
        }
       

    });

   });

   $(document).on('click','#vehicle_update',function(){

    var vehicle_no = $('#vehicle_no').val();
    var vehicle_modal = $('#vehicle_modal').val();
    var vehicle_type = $('#vehicle_type').val();

    var data_val = {};
    data_val['action']     = "add_vehicle";
    data_val['vehicle_no'] = vehicle_no;
    data_val['vehicle_modal'] = vehicle_modal;
    data_val['vehicle_type'] = vehicle_type;

    json_value = JSON.stringify(data_val);
    $.ajax({
        url: "model/vehicle.php",
        type: "POST",
        data: {
            myData :json_value
        },
        async: false
    }).done(function(result) {
        var data =JSON.parse(result);
        $('#update_response').show();
        if(data.response == "true"){
            setTimeout(function(){
                $('#update_response').hide();
            },2000);
        }
    });

   });

   $(document).on('click','#vehicle_exit',function(){

    });




});