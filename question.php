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
   $sql = 'INSERT INTO questions '.
      '(speaker, name, email, question) '.
      'VALUES ("'.$_POST["speaker"].'","'.$_POST["name"].'","'.$_POST["email"].'","'.$_POST["question"].'")'; 
   $result = $conn->query($sql);
   echo '{"result":"ok"}';
?>



