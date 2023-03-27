<?php
   header('Content-Type: application/json; charset=utf-8');

   try {
      $connString = "mysql:localhost:dbname=scs";
      $user = "root";
      $pass = "";

      $pdo = new PDO($connString, $user, $pass);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $method = $_SERVER['REQUEST_METHOD'];

      if ($method == 'POST') {
        $obj = json_decode(file_get_contents('php://input'));
        $query = $obj->query;
        $type = $obj->type; 
        
        if($type == 'select') {
            $result = $pdo->query($query);
            $data = $result->fetchAll(\PDO::FETCH_ASSOC);
            http_response_code(200);
            echo json_encode(["response" => $data,"success" => true,]);            
        } else if ($type == 'insert') {
            $result = $pdo->query($query);
            http_response_code(200);
            echo json_encode(['success' => true, 'response' => 'Your insert request was successful.']);
        } else if ($type == 'update') {
            $result = $pdo->query($query);
            http_response_code(200);
            echo json_encode(['success' => true, 'response' => 'Your update request was successful.']);
        } else if ($type == 'delete') {
            $result = $pdo->query($query);
            http_response_code(200);
            echo json_encode(['success' => true, 'response' => 'Your delete request was successful.']);
        }
    }
   } catch (PDOException $e) {
      die($e->getMessage());
      echo "Error: " . $e->getMessage();
   }
?>