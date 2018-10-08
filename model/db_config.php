<?php
  class dbcon{
   function connect(){
     $hostname="localhost";
     $username="root";
     $password="root";
     $database="node";
     $mysqli = new mysqli($hostname, $username, $password, $database);
     
     if(mysqli_connect_errno()) {
           echo "Connection Failed: " . mysqli_connect_errno();
           exit();
        }

     return $mysqli;
   }
   }



?>