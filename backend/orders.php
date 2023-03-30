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

         $billing = $obj->billing;
         $billingAddress = $billing->address;
         $billingCity = $billing->city;
         $billingPostalCode = $billing->postalCode;
         $billingProvince = $billing->province;
         $billingCountry = $billing->country;

         $shipping = $obj->shipping;
         $shippingAddress = $shipping->address;
         $shippingCity = $shipping->city;
         $shippingPostalCode = $shipping->postalCode;
         $shippingProvince = $shipping->province;
         $shippingCountry = $shipping->country;

         $destination = $shippingAddress.", ".$shippingCity.", ".$shippingPostalCode.", ".$shippingProvince.", ".$shippingCountry;

         $paymentData = $obj->paymentData;
         $cardName = $paymentData->cardName;
         $cardNo = $paymentData->cardNo;
         $cardExp = $paymentData->cardExp;
         $cardCVV = $paymentData->cardCVV;

         $userId = $obj->userId;
         $branchLocation = $obj->branchSource;
         $dateIssued = $obj->dateIssued;
         $dateReceived = $obj->dateReceived;
         $totalPrice = $obj->totalPrice;
         $tripId = $obj->tripId;

         // DO NOT ALLOW USERS TO CHECKOUT WITHOUT AN ACCOUNT...
         // I DON'T WANT TO DEAL WITH THE EDGE CASE...
         if ($userId != "" && $userId != null) {
            $sql = "SELECT salt FROM scs.users WHERE id='". $userId ."';";
            $result = $pdo->query($sql);
            $salt = $result->fetch()["salt"];

            $hashedCardNo = md5($cardNo . $salt);

            $paymentExistsSql = "SELECT IF(EXISTS(SELECT * FROM scs.payment WHERE cardName='".$cardName."' AND cardNumber='".$cardNo."' AND cardExpiration='".$cardExp."' AND cardCVV='".$cardCVV."'),1,0) AS result;";
            $result = $pdo->query($paymentExistsSql);
            $paymentExistsResult = $result->fetch();

            // if payment data does not exists then insert data into payment table
            if ($paymentExistsResult["result"] == 0) {
               $sql = "INSERT INTO scs.payment (cardName, cardNumber, cardExpiration, cardCVV, billingAddress, billingCity, billingPostalCode, billingProvince, billingCountry) ";
               $sql .= "VALUES (:cname, :cno, :cexp, :ccvv, :ba, :bcity, :bpc, :bprov, :bcountry);";
               $statement = $pdo->prepare($sql);
               $statement->bindValue(":cname", $cardName);
               $statement->bindValue(":cno", $hashedCardNo);
               $statement->bindValue(":cexp", $cardExp);
               $statement->bindValue(":ccvv", $cardCVV);
               $statement->bindValue(":ba", $billingAddress);
               $statement->bindValue(":bcity", $billingCity);
               $statement->bindValue(":bpc", $billingPostalCode);
               $statement->bindValue(":bprov", $billingProvince);
               $statement->bindValue(":bcountry", $billingCountry);
               $statement->execute();
            }

            // fetch id of new payment data -> id's are auto generated on db level
            $sql = "SELECT id FROM scs.payment WHERE cardName='".$cardName."' AND cardNumber='".$hashedCardNo."' AND cardExpiration='".$cardExp."' AND cardCVV='".$cardCVV."';";
            $result = $pdo->query($sql);
            $paymentIdResult = $result->fetch();
            $paymentId = $paymentIdResult["id"];

            // fetch available trucks with  truckLocation at trip->source
            $sql = "SELECT id, shippingFee FROM scs.truck WHERE truckLocation='".$branchLocation."';";
            $result = $pdo->query($sql);
            $truckResult = $result->fetch();
            $truckId = $truckResult["id"];
            $truckShippingFee = $truckResult["shippingFee"];

            // insert into trip table
            $sql = "INSERT INTO scs.trip (source, destination, distance, truckId, totalShippingCost) ";
            $sql .= "VALUES (:source, :dest, :dist, :tid, :tsc);";
            $statement = $pdo->prepare($sql);
            $statement->bindValue(":source", $branchLocation);
            $statement->bindValue(":dest", $destination);
            // TODO: update distance from null to an actual value from google matrix api
            $statement->bindValue(":dist", null);
            $statement->bindValue(":tid", $truckId);
            $statement->bindValue(":tsc", $truckShippingFee);
            $statement->execute();

            // fetch trip id
            $sql = "SELECT id, totalShippingCost FROM scs.trip WHERE source='".$branchLocation."' AND destination='".$destination."' AND truckId='".$truckId."';";
            $result = $pdo->query($sql);
            $tripResult = $result->fetch();
            $tripId = $tripResult["id"];
            $totalShippingCost = $tripResult["totalShippingCost"];

            // insert into orders table
            $sql = "INSERT INTO scs.orders (userId, paymentId, dateIssued, dateReceived, totalPrice, tripId) ";
            $sql .= "VALUES (:uid, :pid, :di, :dr, :tp, :tid);";
            $statement = $pdo->prepare($sql);
            $statement->bindValue(":uid", $userId);
            $statement->bindValue(":pid", $paymentId);
            $statement->bindValue(":di", $dateIssued);
            $statement->bindValue(":dr", $dateReceived);
            $statement->bindValue(":tp", $totalPrice);
            $statement->bindValue(":tid", $tripId);
            $statement->execute();

            // fetch order id
            $sql = "SELECT id, totalPrice, dateReceived FROM scs.orders WHERE userId='".$userId."' AND paymentId='".$paymentId."' AND tripId='".$tripId."' AND dateIssued='".$dateIssued."' AND dateReceived='".$dateReceived."';";
            $result = $pdo->query($sql);
            $orderResult = $result->fetch();
            $orderId = $orderResult["id"];
            $orderTotalPrice = $orderResult["totalPrice"];
            $orderDateReceived = $orderResult["dateReceived"];

            $res = array(
               "success" => true,
               "orderId" => $orderId,
               "totalPrice" => $orderTotalPrice,
               "dateReceived" => $orderDateReceived,
               "destination" => $destination
            );
            echo json_encode($res);
         } else {
            $res = array(
               "success" => false,
               "errorMessage" => "Missing User Id",
               "errorCode" => "MUID"
            );
            echo json_encode($res);
         }
      }
   } catch (PDOException $e) {
      die($e->getMessage());
      echo "Error: " . $e->getMessage();
   }
?>