<?php
   header('Content-Type: application/json; charset=utf-8');

   try {
      $connString = "mysql:localhost:dbname=scs";
      $user = "root";
      $pass = "";

      $pdo = new PDO($connString, $user, $pass);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $method = $_SERVER['REQUEST_METHOD'];

      if ($method == 'GET') {
            $sql = "SELECT * FROM scs.products";
            $result = $pdo->query($sql);
            $data = $result->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode($data);
      }
   } catch (PDOException $e) {
      die($e->getMessage());
      echo "Error: " . $e->getMessage();
   }
?>