<?php
// Replace these values with your database credentials
$host = "localhost";
$username = "root";
$password = "";
$database = "musicplayer";

// Create a connection to the database
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch music from the database (Replace with your query)
$query = "SELECT * FROM music_table";
$result = $conn->query($query);

// Create an array to store the music data
$musicArray = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $musicArray[] = $row;
    }
}

// Close the database connection
$conn->close();

// Encode the music array as JSON and send it to the client
header('Content-Type: application/json');
echo json_encode($musicArray);
?>
