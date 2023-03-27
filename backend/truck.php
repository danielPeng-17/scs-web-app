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
            $sql = "SELECT * FROM scs.truck;";
            $result = $pdo->query($sql);
            $data = $result->fetchAll(\PDO::FETCH_ASSOC);
            
            $res = array(
                "success" => true,
                "trucks" => $data
            );
            echo json_encode($res);
        } else {
            $res = array(
                "success" => false,
            );
            echo json_encode($res);
        }
   } catch (PDOException $e) {
        die($e->getMessage());
        echo "Error: " . $e->getMessage();
   }
?>