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
         $dateIssued = $obj->dateIssued;
         $dateReceived = $obj->dateReceived;
         $totalPrice = $obj->totalPrice;
         $paymentCode = $obj->paymentCode;
         $userId = $obj->userId;
         $tripId = $obj->tripId;
         $shippingAddress = $obj->shippingAddress;
         $billingAddress = $obj->billingAddress;


        $sql = "INSERT INTO scs.orders (dateIssued, dateReceived, totalPrice, paymentCode, userId, tripId, shippingAddress, billingAddress) VALUES (:di, :dr, :tp, :pc, :uid, :tid, :sa, :ba);";
        $statement = $pdo->prepare($sql);
        $statement->bindValue(":di", $dateIssued);
        $statement->bindValue(":dr", $dateReceived);
        $statement->bindValue(":tp", $totalPrice);
        $statement->bindValue(":pc", $paymentCode);
        $statement->bindValue(":uid", $uid);
        $statement->bindValue(":tid", $tid);
        $statement->bindValue(":sa", $sa);
        $statement->bindValue(":ba", $ba);
        $statement->execute();
        
        // fetch id of new user -> id's are auto generated on db level
        // $sql = "SELECT id FROM scs.users WHERE firstName='" . $firstName . "' AND lastName='" . $lastName . "' AND email='" . $email . "'";
        // $result = $pdo->query($sql);
        // $id = $result->fetch()["id"];

        $res = array(
            "data" => true;
        );
        echo json_encode($res);
      }
   } catch (PDOException $e) {
      die($e->getMessage());
      echo "Error: " . $e->getMessage();
   }
?>