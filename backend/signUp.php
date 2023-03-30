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

         if (!$isValuesNullOrEmptyString) {
            $salt = bin2hex(random_bytes(16));
            $hashedPassword = md5($password . $salt);

            $sql = "INSERT INTO scs.users (firstName, lastName, email, telNo, address, city, province, country, postalCode, password, salt, balance, isAdmin) VALUES (:fn, :ln, :email, :tn, :addr, :city, :prov, :co, :pc, :pass, :salt, :bal, :ia);";
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
            $statement->bindValue(":pass", $hashedPassword);
            $statement->bindValue(":salt", $salt);
            $statement->bindValue(":bal", $balance);
            $statement->bindValue(':ia', 0);
            $statement->execute();
            
            $sql = "SELECT id, isAdmin FROM scs.users WHERE firstName='" . $firstName . "' AND lastName='" . $lastName . "' AND email='" . $email . "'";
            $result = $pdo->query($sql);
            $row = $result->fetch();
            $id = $row["id"];
            $isAdmin = $row["isAdmin"];

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
               "isLoggedIn" => true,
               "isAdmin" => $isAdmin != 0 ? true : false
            );
            echo json_encode($res);
         } else {
            $res = array(
               "isLoggedIn" => false,
               "isAdmin" => false
            );
            echo json_encode($res);
         }
      }
   } catch (PDOException $e) {
      die($e->getMessage());
      echo "Error: " . $e->getMessage();
   }
?>