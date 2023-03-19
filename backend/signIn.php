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
         $email = $obj->email;
         $password = $obj->password;


         $isValuesNullOrEmptyString = false;
         $arr = array($email, $password);

         foreach($arr as $value) {
            if (strlen($value) == 0) {
               $isValuesNullOrEmptyString = true;
               break;
            }
         }

         if (!$isValuesNullOrEmptyString) {
            $sql = "SELECT * FROM scs.users WHERE email='" . $email . "' AND password='" . $password . "'";
            $result = $pdo->query($sql);
            $user = $result->fetch();

            if ($user) {
                $res = array(
                    "id" => $user["id"],
                    "firstName" => $user["firstName"],
                    "lastName" => $user["lastName"],
                    "email" => $user["email"],
                    "telNo" => $user["telNo"],
                    "address" => $user["address"],
                    "city" => $user["city"],
                    "province" => $user["province"],
                    "country" => $user["country"],
                    "postalCode" => $user["postalCode"],
                    "balance" => $user["balance"],
                    "isLoggedIn" => true,
                    "isAdmin" => $user["isAdmin"] != 0 ? true : false
                );
                echo json_encode($res);
            } else {
                // if email and password not found, return isLoggedIn = false
                $res = array(
                    "isLoggedIn" => false,
                    "isAdmin" => false,
                    "logInErrors" => array("InvalidCreds")
                 );
                 echo json_encode($res);
            }                        
         } else {
            // if email or password is null or empty string, return isLoggedIn = false
            $res = array(
               "isLoggedIn" => false,
               "isAdmin" => false,
               "logInErrors" => array("MissingCreds")
            );
            echo json_encode($res);
         }
      }
   } catch (PDOException $e) {
      die($e->getMessage());
      echo "Error: " . $e->getMessage();
   }
?>