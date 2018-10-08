<?php 

include('db_config.php');
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);
    
    $result      = json_decode($_POST['myData']);
	$con_obj     = new dbcon();   // create object for database connection class
	$connect_ref = $con_obj->connect(); // call the member function of database connection (dbcon) class
    $response = array();
    $action = $result ->action;
    date_default_timezone_set('Asia/Calcutta');

   if($action == "add_vehicle"){
        $vehicle_no = $result->vehicle_no;
        $vehicle_modal = $result->vehicle_modal;
        $vehicle_type = $result->vehicle_type;
        $description = "";
        $timestamp  = strtotime(date("Y-m-d H:i:s"));
        $vehicle_outtime = "";
        $status = "active";

        $sql="INSERT INTO `vehicle_details`(`vehicle_no`,`vehicle_model`,`vehicle_type`,`description`,`vehicle_intime`,`vehicle_outtime`,`status`) VALUES (?,?,?,?,?,?,?)";
        if($stmt = $connect_ref -> prepare($sql)) {
            $stmt -> bind_param('sssssss',$vehicle_no,$vehicle_modal,$vehicle_type,$description,$timestamp,$vehicle_outtime,$status);
            $stmt -> execute();
            $response['response'] = "true";
            $stmt -> close();
        }
    	echo json_encode($response);
   }
   elseif($action == "edit_vehicle"){

    $vehicle_no = $result->vehicle_no;

    $sql="SELECT `vehicle_model`,`vehicle_type` from `vehicle_details` where `vehicle_no`= ? ";
        if($stmt = $connect_ref -> prepare($sql)){
            $stmt -> bind_param('s',$vehicle_no);
            $stmt -> execute();
            $stmt -> bind_result($vehicle_model,$vehicle_type);
            $stmt -> fetch();		
            $response_value["vehicle_model"]=$vehicle_model;	
            $response_value["vehicle_type"]=$vehicle_type;
            array_push($response,$response_value);
            $stmt -> close();
        }
    	echo json_encode($response);


   }
   elseif($action == "exit_vehicle"){

    $vehicle_no = $result->vehicle_no;
    $timestamp  = strtotime(date("Y-m-d H:i:s"));
    $status = 'inactive';
    $status_active = 'active';



    $sql="SELECT count(*) from `vehicle_details` where `vehicle_no`= ? AND `status` = ? ";
    if($stmt = $connect_ref -> prepare($sql)){
        $stmt -> bind_param('ss',$vehicle_no,$status_active);
        $stmt -> execute();
        $stmt -> bind_result($count);
        $stmt -> fetch();		
        $stmt -> close();
    }

    if($count == 0){

        $response['type'] = "null";
        
    }

    else{

        $sql="UPDATE `vehicle_details` SET `vehicle_outtime` = ?, `status`=? WHERE `vehicle_no`=?";
        if($stmt = $connect_ref -> prepare($sql)){
            $stmt -> bind_param('sss',$timestamp,$status,$vehicle_no);
            $stmt -> execute();
            $stmt -> fetch();		
            $stmt -> close();
        }


    $sql="SELECT `vehicle_intime`,`vehicle_outtime` from `vehicle_details` where `vehicle_no`= ? ";
        if($stmt = $connect_ref -> prepare($sql)){
            $stmt -> bind_param('s',$vehicle_no);
            $stmt -> execute();
            $stmt -> bind_result($vehicle_intime,$vehicle_outtime);
            $stmt -> fetch();		
            $stmt -> close();
        }

        $hours_used = (int)$vehicle_outtime - (int)$vehicle_intime;
        
        $hours = (int)($hours_used / 3600);
        $minutes = (int)($hours_used % 60);
        
        $total_minutes = (int)($hours_used/60);

        $hours_amount = 10;
        
        $minute_amount =  (float)($hours_amount / 60);

        $total_amount = $minute_amount*$total_minutes;


        if($hours > 24){
            $days = (int)($hours/24);
            $hours = (int) ($hours%24);
            $response['days'] = $days;
            $response['hours'] = $hours;
            $response['minutes'] = $minutes;
        }
        else{
            $response['days'] = 0;
            $response['hours'] = $hours;
            $response['minutes'] = $minutes;
        }

       $response['total_amount'] = $total_amount;
       $response['type'] = "not_null";

    }

        
        echo json_encode($response);

        
   }
    
?>