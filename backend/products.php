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
        } else if ($url_components['path'] == '/scs/products.php/reviews') {
            if (isset($_GET['id'])) {
                // fetch reviews for this particular product
                $sql_rows = "SELECT * FROM scs.reviews WHERE productId=" . $_GET['id'];
                $result_rows = $pdo->query($sql_rows);
                $rows = $result_rows->fetchAll(\PDO::FETCH_ASSOC);
                
                // get avg rating for product
                $sql_avg = "SELECT AVG(rating) as avg_rating FROM scs.reviews WHERE productId=" . $_GET['id'];
                $result_avg = $pdo->query($sql_avg);
                $avg_rating = $result_avg->fetch(\PDO::FETCH_ASSOC)['avg_rating'];

                $data = array('rows' => $rows, 'avg_rating' => $avg_rating);
                echo json_encode($data);
            } else {
                throw new Exception("Missing parameter 'id'");
            }
        }
      } 
      else if ($method == 'POST') {
        if ($url_components['path'] == '/scs/products.php/addReview') {
            $obj = json_decode(file_get_contents('php://input'));
            $productId = $obj->productId;
            $name = $obj->name;
            $headline = $obj->headline;
            $content = $obj->content;
            $rating = $obj->rating;

            $arr = array($productId, $name, $headline, $content, $rating);

            foreach($arr as $value) {
                if (strlen($value) == 0) {
                    throw new Exception("Containing empty fields");
                }
            }

            $sql = "INSERT INTO scs.reviews (productId, name, headline, content, rating, date) VALUES (:p, :n, :h, :c, :r, :d);";
            $statement = $pdo->prepare($sql);
            $statement->bindValue(":p", $productId);
            $statement->bindValue(":n", $name);
            $statement->bindValue(":h", $headline);
            $statement->bindValue(":c", $content);
            $statement->bindValue(":r", $rating);
            $statement->bindValue(":d", date('Y-m-d'));
            $statement->execute();  

            // get avg rating for product
            $sql_avg = "SELECT AVG(rating) as avg_rating FROM scs.reviews WHERE productId=" . $productId;
            $result_avg = $pdo->query($sql_avg);
            $avg_rating = $result_avg->fetch(\PDO::FETCH_ASSOC)['avg_rating'];

            // update product table with new calculated value
            $update_product = "UPDATE scs.products SET rating=:avg_rating WHERE id=:id";
            $stmt = $pdo->prepare($update_product);
            $stmt->execute(array(':avg_rating' => $avg_rating, ':id' => $productId));

            http_response_code(200);
            echo json_encode(['success' => true, 'message' => 'Your request was successful.']);
        }
      }
   } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
        die($e->getMessage());
   }
?>