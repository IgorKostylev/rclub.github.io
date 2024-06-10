<?php
   header('Content-Type: text/html; charset=utf-8', true);
   $servername = "localhost";
   $username = 'ci82369_rclub';
   $password = 'eOawes42';
   $dbname = 'ci82369_rclub';
   
   
  // print_r($arr); 
   $conn = new mysqli($servername, $username, $password, $dbname);
   $conn->query("SET NAMES utf8");
   // Check connection
   if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
   } 
   $email = $_POST["email"];
   $sql = 'SELECT * FROM list_from_client where email ="'.$email.'"';
   $res = $conn->query($sql);
   $approve = 0;
   if ($res->num_rows>0){
      // echo "user is in DB";
      $approve = 1;
   }

   $sql = 'INSERT INTO guests '.
      '(name, company, mobile, email, interests, is_approved) '.
      'VALUES ("'.$_POST["name"].'","'.$_POST["company"].'","'.$_POST["mobile"].'","'.$_POST["email"].'","'.$_POST["interests"].'","'.$approve.'")'; 
   $result = $conn->query($sql);
   if ($approve === 0){
      echo '{"result":"ok","status":"0"}';
   }else{
      echo '{"result":"ok","status":"1"}';
   }
   

?>



