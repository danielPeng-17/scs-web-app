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
         $firstName = $obj->firstName;
         $lastName = $obj->lastName;
         $telNo = $obj->telNo;
         $email = $obj->email;
         $address = $obj->address;
         $city = $obj->city;
         $province = $obj->province;
         $country = $obj->country;
         $postalCode = $obj->postalCode;
         $password = $obj->password;
         $balance = $obj->balance;

         $isValuesNullOrEmptyString = false;
         $arr = array($firstName, $lastName, $email, $telNo, $address, $city, $province, $postalCode, $password);

         foreach($arr as $value) {
            if (strlen($value) == 0) {
               $isValuesNullOrEmptyString = true;
               break;
            }
         }

         // TODO: check db if user already exists
         if (!$isValuesNullOrEmptyString) {
            $sql = "INSERT INTO scs.users (firstName, lastName, email, telNo, address, city, province, country, postalCode, password, balance) VALUES (:fn, :ln, :email, :tn, :addr, :city, :prov, :co, :pc, :pass, :bal);";
            $statement = $pdo->prepare($sql);
            $statement->bindValue(":fn", $firstName);
            $statement->bindValue(":ln", $lastName);
            $statement->bindValue(":email", $email);
            $statement->bindValue(":tn", $telNo);
            $statement->bindValue(":addr", $address);
            $statement->bindValue(":city", $city);
            $statement->bindValue(":prov", $province);
            $statement->bindValue(":co", $country);
            $statement->bindValue(":pc", $postalCode);
            $statement->bindValue(":pass", $password);
            $statement->bindValue(":bal", $balance);
            $statement->execute();
            
            // fetch id of new user -> id's are auto generated on db level
            $sql = "SELECT id FROM scs.users WHERE firstName='" . $firstName . "' AND lastName='" . $lastName . "' AND email='" . $email . "'";
            $result = $pdo->query($sql);
            $id = $result->fetch()["id"];

            $res = array(
               "id" => $id,
               "firstName" => $firstName,
               "lastName" => $lastName,
               "email" => $email,
               "telNo" => $telNo,
               "address" => $address,
               "city" => $city,
               "province" => $province,
               "country" => $country,
               "postalCode" => $postalCode,
               "balance" => $balance,
               "isLoggedIn" => true
            );
            echo json_encode($res);
         } else {
            $res = array(
               "isLoggedIn" => false
            );
            echo json_encode($res);
         }
      }
   } catch (PDOException $e) {
      die($e->getMessage());
      echo "Error: " . $e->getMessage();
   }
?>