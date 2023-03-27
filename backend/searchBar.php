<?php

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "scs";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get the order by user ID and order ID
if ($_SERVER["REQUEST_METHOD"] === "GET") {
  if (isset($_GET["userId"]) && isset($_GET["id"])) {
    $userId = $_GET["userId"];
    $id = $_GET["id"];

    $sql = "SELECT * FROM orders WHERE userId = '$userId' AND id = '$id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $order = array(
        "id" => $row["id"],
        "userId" => $row["userId"],
        "paymentId" => $row["paymentId"],
        "dateIssued" => $row["dateIssued"],
        "dateReceived" => $row["dateReceived"],
        "totalPrice" => $row["totalPrice"],
        "tripId" => $row["tripId"]
      );

      echo json_encode($order);
    } else {
      echo "Order does not exist";
    }
  } else {
    echo "Missing required parameters";
  }
}

$conn->close();

?>
