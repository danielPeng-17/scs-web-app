<?php
   header('Content-Type: application/json; charset=utf-8');

   try {
      $connString = "mysql:localhost:dbname=scs";
      $user = "root";
      $pass = "";

      $pdo = new PDO($connString, $user, $pass);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $method = $_SERVER['REQUEST_METHOD'];
      $url_components = parse_url($_SERVER['REQUEST_URI']);

      if ($method == 'GET') {
        if ($url_components['path'] == '/scs/products.php/products') {
            $sql = "SELECT * FROM scs.products";
            $result = $pdo->query($sql);
            $data = $result->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode($data);
        } else if ($url_components['path'] == '/scs/products.php/view') {
            if (isset($_GET['id'])) {
                $sql = "SELECT * FROM scs.products WHERE id=" . $_GET['id'];
                $result = $pdo->query($sql);
                $data = $result->fetch();
                echo json_encode($data);
            } else {
                throw new Exception("Missing parameter 'id'");
            }
        } else if ($url_components['path'] == '/scs/products.php/shoppingCart') {
            parse_str($_SERVER['QUERY_STRING'], $query);
            $queryParams = $query['shoppingCart'];

            $productIds = array();
            foreach ($queryParams as $product) {
                array_push($productIds, $product['id']);
            }

            $productId_list = implode(",", $productIds);
            
            $sql = "SELECT * FROM scs.products WHERE id IN ($productId_list)";
            $result = $pdo->query($sql);
            $data = $result->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode($data);
        }
      }
   } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
        die($e->getMessage());
   }
?>